import axios from "axios";
import boom from "@hapi/boom";
import joi from "joi";
import graphql from "graphql";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";
const { print } = graphql;

import { sendConfirmation } from "../helpers/verify.js";
import { GET_USER_VERIFICATION_CODE, GET_USER_IS_VERIFIED } from "../graphql/queries.js";
import {
  VERIFY_USER,
  REPLACE_VERIFICATION_CODE,
} from "../graphql/mutations.js";

const {
  GRAPHQL_URL,
  HASURA_ADMIN_SECRET,
  SENDGRID_API_KEY,
  VERIFICATION_CODE_EXPIRES,
} = process.env;

const HASURA_ADMIN_HEADERS = {
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
};

sgMail.setApiKey(SENDGRID_API_KEY);

export const validationController = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
    verificationCode: joi.string().guid().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  const { email, verificationCode } = value;

  try {
    const { data } = await axios.post(
      GRAPHQL_URL,
      {
        query: print(GET_USER_VERIFICATION_CODE),
        variables: { email },
      },
      HASURA_ADMIN_HEADERS
    );

    const user = data.data.user[0];

    if (!user) return next(boom.unauthorized("Invalid email"));

    if (user.is_verified)
      return next(boom.resourceGone("User already verified"));

    const { code, expires_at } = user.verification_code;

    if (verificationCode !== code) {
      return next(boom.badRequest("Verification code invalid"))
    }

    if (new Date(expires_at) > new Date()) {
      await axios.post(
        GRAPHQL_URL,
        {
          query: print(VERIFY_USER),
          variables: { user_id: user.id },
        },
        HASURA_ADMIN_HEADERS
      );

      res.send("OK");
    } else {
      return next(boom.resourceGone("Verification code expired or invalid"));
    }
  } catch (e) {
    return next(boom.badRequest("Error validating email"));
  }
};

export const resendController = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  const { email } = value;

  try {
    const { data } = await axios.post(
      GRAPHQL_URL,
      {
        query: print(GET_USER_IS_VERIFIED),
        variables: { email },
      },
      HASURA_ADMIN_HEADERS
    );

    const user = data.data.user[0];

    if (!user) return next(boom.unauthorized("Invalid email"));

    if (user.is_verified)
      return next(boom.resourceGone("User already verified"));

    const verificationCodeExpiry = new Date(
      new Date().getTime() + VERIFICATION_CODE_EXPIRES * 60 * 1000
    ).toISOString();

    const { data: verifyData } = await axios.post(
      GRAPHQL_URL,
      {
        query: print(REPLACE_VERIFICATION_CODE),
        variables: {
          user_id: user.id,
          expires_at: verificationCodeExpiry,
        },
      },
      HASURA_ADMIN_HEADERS
    );

    await sendConfirmation(
      email,
      verifyData.data.insert_verification_code_one.code
    );
    res.send("OK");
  } catch (e) {
    return next(boom.badRequest("Error validating email"));
  }
};

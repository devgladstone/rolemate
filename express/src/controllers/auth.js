import bcrypt from "bcrypt";
import axios from "axios";
import joi from "joi";
import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import graphql from "graphql";
import { v4 as uuidv4 } from "uuid";
import {
  validateCredentials,
  generateJWT,
  getDuplicateError,
} from "../helpers/auth.js";
import { GET_REFRESH_TOKEN } from "../graphql/queries.js";
import { sendConfirmation } from "../helpers/verify.js";
import {
  DELETE_ALL_REFRESH_TOKENS,
  DELETE_REFRESH_TOKEN,
  INSERT_USER,
  INSERT_REFRESH_TOKEN,
  UPDATE_PASSWORD,
} from "../graphql/mutations.js";
const { print } = graphql;

const {
  GRAPHQL_URL,
  HASURA_ADMIN_SECRET,
  JWT_SECRET,
  JWT_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  VERIFICATION_CODE_EXPIRES,
} = process.env;

const HASURA_ADMIN_HEADERS = {
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
};

const secureCookie = process.env.NODE_ENV === "production" ? true : false;

export const signupController = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  const { email, password } = value;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const refreshToken = uuidv4();
    const refreshTokenExpiry = new Date(
      new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000
    ).toISOString();
    const verificationCodeExpiry = new Date(
      new Date().getTime() + VERIFICATION_CODE_EXPIRES * 60 * 1000
    ).toISOString();

    const tags = [
      "frontend",
      "backend",
      "enterprise",
      "startup",
      "reach",
      "safe",
      "tech",
      "favorite",
    ];

    const body = {
      query: print(INSERT_USER),
      variables: {
        object: {
          expires_at: verificationCodeExpiry,
          user: {
            data: {
              email,
              password: passwordHash,
              tags: "{" + tags.join(",") + "}",
              refresh_tokens: {
                data: [
                  {
                    token: refreshToken,
                    expires_at: refreshTokenExpiry,
                  },
                ],
              },
            },
          },
        },
      },
    };

    const { data } = await axios.post(GRAPHQL_URL, body, HASURA_ADMIN_HEADERS);

    if (data.errors) {
      const duplicateErrors = data.errors.filter(
        ({ extensions: { code } }) => code === "constraint-violation"
      );
      const isDuplicateError = duplicateErrors.length > 0;
      if (isDuplicateError) {
        return next(getDuplicateError(duplicateErrors));
      }
    }

    const user = data.data.insert_verification_code_one.user;
    const verificationCode = data.data.insert_verification_code_one.code;
    const token = generateJWT(user); // create token + user data
    const tokenExpiry = new Date(
      new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000
    );

    await sendConfirmation(user.email, verificationCode);
    res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert from minute to milliseconds
      httpOnly: true,
      secure: secureCookie,
      sameSite: true,
    });
    res.json({ token, tokenExpiry });
  } catch (e) {
    return next(boom.badImplementation("Unable to create user."));
  }
};

export const loginController = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  const { email, password } = value;

  try {
    const { error: credentialError, valid, user } = await validateCredentials(
      email,
      password
    );

    if (!valid) {
      return next(credentialError);
    }

    const token = generateJWT(user);
    const tokenExpiry = new Date(
      new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000
    );
    const refreshToken = uuidv4();
    const refreshTokenExpiry = new Date(
      new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000
    ).toISOString();

    const body = {
      query: print(INSERT_REFRESH_TOKEN),
      variables: {
        object: {
          user_id: user.id,
          token: refreshToken,
          expires_at: refreshTokenExpiry, // convert from minute to milliseconds
        },
      },
    };

    await axios.post(GRAPHQL_URL, body, HASURA_ADMIN_HEADERS);

    res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert from minute to milliseconds
      httpOnly: true,
      secure: secureCookie,
      sameSite: true,
    });

    res.json({ token, tokenExpiry });
  } catch (e) {
    return next(
      boom.badImplementation("Could not update 'refresh token' for user")
    );
  }
};

export const refreshTokenController = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return next(boom.unauthorized("Invalid refresh token request"));
  }

  try {
    const { data } = await axios.post(
      GRAPHQL_URL,
      {
        query: print(GET_REFRESH_TOKEN),
        variables: { refreshToken },
      },
      HASURA_ADMIN_HEADERS
    );

    if (!data.data.refresh_token_by_pk) {
      return next(boom.unauthorized("invalid refresh token"));
    }

    const { user, expires_at } = data.data.refresh_token_by_pk;

    if (new Date() > new Date(expires_at)) {
      return next(boom.unauthorized("expired refresh token"));
    }

    const token = generateJWT(user);
    const tokenExpiry = new Date(
      new Date().getTime() + JWT_TOKEN_EXPIRES * 60 * 1000
    );

    res.json({ token, tokenExpiry });
  } catch (e) {
    return next(boom.unauthorized("Invalid 'refreshToken' or 'userId'"));
  }
};

export const logoutController = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];

  if (refreshToken) {
    try {
      await axios.post(
        GRAPHQL_URL,
        {
          query: print(DELETE_REFRESH_TOKEN),
          variables: { refreshToken },
        },
        HASURA_ADMIN_HEADERS
      );
    } catch (e) {
      return next(boom.badRequest("Error logging out"));
    }
  }

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: secureCookie,
    sameSite: true,
    expires: new Date(0),
  });
  res.send("OK");
};

export const logoutAllController = async (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) return next(boom.unauthorized("No token provided"));

  const token = authHeader.split(" ")[1];

  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.email !== value.email) {
      return next(boom.unauthorized("You do not have permissions"));
    }
  } catch (e) {
    return next(boom.unauthorized("Bad token"));
  }

  const body = {
    query: print(DELETE_ALL_REFRESH_TOKENS),
    variables: {
      email: value.email,
    },
  };

  try {
    await axios.post(GRAPHQL_URL, body, HASURA_ADMIN_HEADERS);
  } catch (e) {
    return next(boom.badRequest("Error calling request"));
  }

  res.send("OK");
};

export const updatePasswordController = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
    newPassword: joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(boom.badRequest(error.details[0].message));
  }

  const { email, password, newPassword } = value;

  try {
    const { error: credentialError, valid, user } = await validateCredentials(
      email,
      password
    );

    if (!valid) {
      return next(credentialError);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const body = {
      query: print(UPDATE_PASSWORD),
      variables: {
        user_id: user.id,
        password: passwordHash,
      },
    };

    await axios.post(GRAPHQL_URL, body, HASURA_ADMIN_HEADERS);
    res.send("OK");
  } catch (e) {
    return next(boom.badImplementation("Unable to update password."));
  }
};

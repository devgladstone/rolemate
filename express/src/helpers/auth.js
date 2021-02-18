import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import boom from '@hapi/boom'
import graphql from 'graphql';
const { print } = graphql;

import { GET_USER_CRED_BY_EMAIL } from '../graphql/queries.js';

const { GRAPHQL_URL, JWT_SECRET, JWT_TOKEN_EXPIRES, HASURA_ADMIN_SECRET } = process.env;

const HASURA_ADMIN_HEADERS = {
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET
  }
};

export const validateCredentials = async (email, password) => {
  let user;
  let valid;

  const body = {
    query: print(GET_USER_CRED_BY_EMAIL),
    variables: { email }
  }

  const { data } = await axios.post(GRAPHQL_URL, body, HASURA_ADMIN_HEADERS);
  user = data.data.user[0];

  // graphql query will not error if no valid user -> empty array
  if (!user) {
    return { valid: false, error: boom.unauthorized("Invalid 'username' or 'password'") };
  }

  valid = await bcrypt.compare(password, user.password);
  return valid
    ? { valid, user }
    : { valid, error: boom.unauthorized("Invalid 'username' or 'password'") }

}

export const generateJWT = ({ id, email }) => {
  const tokenContent = {
    sub: '' + id,
    email,
    iat: Date.now() / 1000,
    iss: "https://hireme-graphql.herokuapp.com",
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": '' + id
    }
  };

  return jwt.sign(tokenContent, JWT_SECRET, { expiresIn: `${JWT_TOKEN_EXPIRES}m` });
}

export const getDuplicateError = errors => {
  const { message } = errors[0]; // should only have one constraint error at a time
  if (message.includes('user_email_key')) {
    return boom.conflict('Email already exists');
  }
}
import gql from "graphql-tag";

export const INSERT_USER = gql`
  mutation($object: verification_code_insert_input!) {
    insert_verification_code_one(object: $object) {
      code
      expires_at
      user {
        id
        email
        refresh_tokens {
          token
          expires_at
          user_id
        }
      }
    }
  }
`;

// user data sent with login comes from here
export const INSERT_REFRESH_TOKEN = gql`
  mutation($object: refresh_token_insert_input!) {
    insert_refresh_token_one(object: $object) {
      token
      expires_at
      created_at
    }
  }
`;

export const DELETE_ALL_REFRESH_TOKENS = gql`
  mutation($email: String!) {
    delete_refresh_token(where: { user: { email: { _eq: $email } } }) {
      affected_rows
    }
  }
`;

export const DELETE_REFRESH_TOKEN = gql`
  mutation($refreshToken: uuid!) {
    delete_refresh_token_by_pk(token: $refreshToken) {
      token
      created_at
      user_id
    }
  }
`;

export const VERIFY_USER = gql`
  mutation($user_id: Int!) {
    update_user_by_pk(
      pk_columns: { id: $user_id }
      _set: { is_verified: true }
    ) {
      id
    }
    delete_verification_code(where: { user_id: { _eq: $user_id } }) {
      affected_rows
    }
  }
`;

export const REPLACE_VERIFICATION_CODE = gql`
  mutation($user_id: Int!, $expires_at: timestamptz!) {
    delete_verification_code(where: { user_id: { _eq: $user_id } }) {
      affected_rows
    }
    insert_verification_code_one(
      object: { expires_at: $expires_at, user_id: $user_id }
    ) {
      user_id
      code
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation($user_id: Int!, $password: String!) {
    update_user_by_pk(
      pk_columns: { id: $user_id }
      _set: { password: $password }
    ) {
      id
      email
    }
  }
`;

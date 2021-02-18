import gql from "graphql-tag";

export const fragments = {
  user: gql`
    fragment UserDetails on user {
      id
      email
    }
  `,
};

export const GET_REFRESH_TOKEN = gql`
  query($refreshToken: uuid!) {
    refresh_token_by_pk(token: $refreshToken) {
      expires_at
      user {
        ...UserDetails
      }
    }
  }
  ${fragments.user}
`;

// used just for verifying password
export const GET_USER_CRED_BY_EMAIL = gql`
  query($email: String) {
    user(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`;

// used for email verification
export const GET_USER_VERIFICATION_CODE = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      is_verified
      verification_code {
        code
        expires_at
      }
    }
  }
`;

// used for resending email
export const GET_USER_IS_VERIFIED = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      is_verified
    }
  }
`;
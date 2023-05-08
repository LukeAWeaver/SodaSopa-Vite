import { gql } from "@apollo/client";

export const UPDATE_USER_BY_TOKEN = gql`
  mutation UpdateUserByToken($input: GoogleIdTokenInput!) {
    updateUserByToken(input: $input) {
      coins
      masterKeys
    }
  }
`;

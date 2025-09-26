import { gql } from "@apollo/client";

export const SignInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      message
      success
      data {
        verified
        token
      }
    }
  }
`;

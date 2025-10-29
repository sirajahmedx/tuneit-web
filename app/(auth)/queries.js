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


export const CreateCustomerMutation = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      success
      message
    }
  }
`;

export const CreateMechanicMutation = gql`
  mutation CreateMechanic($input: CreateMechanicInput!) {
    createMechanic(input: $input) {
      success
      message
    }
  }
`;

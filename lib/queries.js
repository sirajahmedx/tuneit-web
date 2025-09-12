import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_MECHANIC_MUTATION = gql`
  mutation CreateMechanic($input: CreateMechanicInput!) {
    createMechanic(input: $input) {
      success
      message
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      success
      message
      data {
        verified
        token
      }
    }
  }
`;

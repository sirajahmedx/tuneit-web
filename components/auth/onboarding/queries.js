import { gql } from "@apollo/client";

export const updateMechanicMutation = gql`
  mutation Mutation($input: UpdateMechanicInput!) {
    updateMechanic(input: $input) {
      message
      success
    }
  }
`;

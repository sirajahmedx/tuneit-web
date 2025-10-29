import { gql } from "@apollo/client";

const createServiceMutatoin = gql`
  mutation Mutation($input: ServiceInput!) {
    createService(input: $input) {
      message
      success
    }
  }
`;

export { createServiceMutatoin };

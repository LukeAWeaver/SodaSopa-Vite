import { gql } from "@apollo/client";

export const GET_SODAS = gql`
  query MyQuery {
    getSodas {
      _id
      description
      name
      quantity
    }
  }
`;

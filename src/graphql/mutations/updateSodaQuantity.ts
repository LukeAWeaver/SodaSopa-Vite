import { gql } from "@apollo/client";

export const UPDATE_SODA_QUANTITY = gql`
  mutation UpdateSodaQuantity($_id: ID!, $increment: Int) {
    updateSodaQuantity(_id: $_id, increment: $increment) {
      name
      quantity
      description
    }
  }
`;

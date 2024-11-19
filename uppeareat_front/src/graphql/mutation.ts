import { gql } from '@apollo/client';

export const CREATE_RESERVATION = gql`
  mutation CreateReservation(
    $name: String!
    $status: String!
    $date: String!
    $numberOfPeople: Int!
  ) {
    createReservation(
      name: $name
      status: $status
      date: $date
      numberOfPeople: $numberOfPeople
    ) {
      id
      name
      status
      date
      numberOfPeople
      createdAt
    }
  }
`;

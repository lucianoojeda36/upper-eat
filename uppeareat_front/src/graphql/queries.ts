import { gql } from '@apollo/client';

export const GET_RESERVATIONS = gql`
  query GetReservations($status: String, $search: String, $startDate: String) {
    reservations(status: $status, search: $search, startDate: $startDate) {
      id
      name
      status
      date
      numberOfPeople
      createdAt
    }
  }
`;

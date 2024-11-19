import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Reservation {
    id: ID!
    name: String!
    status: String!
    date: String!
    numberOfPeople: Int!
  }

  type Query {
    reservations(
      status: String
      search: String
      startDate: String
    ): [Reservation!]

    reservationForId(id: ID!): Reservation
  }

  type Mutation {
    createReservation(
      name: String!
      status: String!
      date: String!
      numberOfPeople: Int!
    ): Reservation!

    updateReservation(
      id: ID!
      name: String!
      status: String!
      date: String!
      numberOfPeople: Int!
    ): Reservation!

    deleteReservation(id: ID!): Reservation!
  }
`;

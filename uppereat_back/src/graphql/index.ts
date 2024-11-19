import { ReservationResolver } from './resolvers/reservationResolver';
import { typeDefs } from './typeDefs';

export const resolvers = {
  Query: ReservationResolver.Query,
  Mutation: ReservationResolver.Mutation,
};

export { typeDefs };

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs, resolvers } from './src/graphql';
import { context } from './src/utils/context';
import logger from './src/utils/logger';

export const createServer = async () => {
  const app = express();

  logger.info('Starting Apollo Server...');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => context,
  });

  try {
    await server.start();
    logger.info('Apollo Server started successfully');

    server.applyMiddleware({ app, path: '/graphql' });
    logger.info('GraphQL middleware applied to /graphql path');
  } catch (error) {
    logger.error('Error starting Apollo Server:', error);
    throw new Error('Failed to start Apollo Server');
  }

  return app;
};

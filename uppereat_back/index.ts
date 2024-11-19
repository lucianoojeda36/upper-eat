import { createServer } from './server';
import logger from './src/utils/logger';

const PORT = process.env.PORT || 4000;

createServer()
  .then((app) => {
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}/graphql`);
    });
  })
  .catch((error) => {
    logger.error('Failed to start the server:', error);
  });

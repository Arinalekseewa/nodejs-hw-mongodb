import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(pino(),);
  app.use(express.json());
  app.use(cookieParser());
  app.use(router);

  app.use(errorHandler);

  app.use(/(.*)/, notFoundHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
'use strict';
import express from 'express';
import cors from 'cors';
// Routes
import Api from './Routes/api';

export function server(dep) {
  const app = express();
  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use('/api', Api);

  return app;
}

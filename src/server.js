'use strict';
import express from 'express';
import cors from 'cors';
// Routes
import Api from './Routes/api';

const corsOptions = {
  origin: 'https://lambertrevyen2020.no',
};

if (process.env.NODE_ENV === 'development') {
  corsOptions.origin = '*';
}

export function server(dep) {
  const app = express();
  // Middlewares
  app.use(cors(corsOptions));
  app.use(express.json());

  // Routes
  app.use('/v1', Api);

  app.get('/', (req, res) => {
    return res.send('online');
  });

  return app;
}

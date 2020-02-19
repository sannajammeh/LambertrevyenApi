'use strict';
import express from 'express';
import cors from 'cors';
// Routes
import Api from './Routes/api';

const whitelist = ['https://lambertrevyen2020.no', 'https://admin.lambertrevyen2020.no'];

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

if (process.env.NODE_ENV === 'development') {
  whitelist.push('http://localhost:3000');
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

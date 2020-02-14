'use strict';

import express from 'express';
import ensureCType from 'express-ensure-ctype';

//Dependencies
import firebaseAdmin from 'firebase-admin';
import firebaseKey from '../../firebaseKey.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseKey),
  databaseURL: 'https://lambertrevyen2020.firebaseio.com'
});

const firestore = firebaseAdmin.firestore();
const serverTime = firebaseAdmin.firestore.FieldValue.serverTimestamp();
//Controllers
import { GetTickets, CreateTicket } from '../controllers/Tickets';
//Services
import TicketService from '../services/ticketService';
import { TicketsErrorHandler } from '../controllers/Errors';
import validate, { createTicketSchema } from '../validators/ticketsValidator';

const ticketService = new TicketService(firestore, serverTime);

const Api = express.Router();
// Route middleware
const ensureJson = ensureCType('json');

/**
 * @route api/tickets/
 * @method "GET"
 */
Api.get('/tickets', GetTickets(ticketService));

/**
 * @route api/tickets/
 * @method "POST"
 * @contentType "JSON"
 */
Api.post(
  '/tickets',
  ensureJson,
  validate(createTicketSchema),
  CreateTicket(ticketService)
);

Api.use(TicketsErrorHandler);

export default Api;

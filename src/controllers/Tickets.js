'use strict';

import { BAD_REQUEST } from '../error.types';

export const GetTickets = TicketService => async (req, res, next) => {
  try {
    const tickets = await TicketService.fetchTickets();

    return res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

export const CreateTicket = (TicketService, EmailService) => async (req, res, next) => {
  const { name, email, phone, playId, date, seats } = req.body;

  try {
    const ticketRef = await TicketService.createTicket({
      name,
      email,
      phone,
      playId,
      date,
      seats,
    });

    const ticket = await ticketRef.get();
    res.json({ id: ticket.id, ...ticket.data() }).end();
    const ticketData = ticket.data();

    const ticketObj = {
      id: ticket.id,
      name: ticketData.name,
      seats: ticketData.totalSeats,
      date: ticketData.date,
      email: ticketData.email,
      total: ticketData.total,
    };

    const sendEmail = await EmailService.sendTicketReserved(ticketObj);
  } catch (error) {
    next(error);
  }
};

export const UpdateTicket = (TicketService, EmailService) => async (req, res, next) => {
  const { id, status } = req.body;
  const { ticketId } = req.params;

  try {
    if (id !== ticketId) throw new Error(BAD_REQUEST);

    const updatedTicket = await TicketService.updateTicket({ id, status });

    res.json(updatedTicket).end();

    const sendEmail = await EmailService.sendTicketStatus(updatedTicket);
  } catch (error) {
    return next(error);
  }
};

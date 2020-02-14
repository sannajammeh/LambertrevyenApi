'use strict';

export const GetTickets = TicketService => async (req, res, next) => {
  try {
    const tickets = await TicketService.fetchTickets();

    return res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

export const CreateTicket = TicketService => async (req, res, next) => {
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
    return res.json({ id: ticket.id, ...ticket.data() });
  } catch (error) {
    next(error);
  }
};

'use strict';
import shortid from 'shortid';
import {
  PLAY_IS_BOOKED,
  PLAY_NOT_ENOUGH_SEATS,
  BAD_REQUEST,
  TICKET_NOT_EXIST,
  TICKET_UPDATE_ERROR,
} from '../error.types';

class TicketService {
  constructor(firestore, serverTime) {
    this.firestore = firestore;
    this.serverTime = serverTime;
    this.statusTypes = {
      unpaid: 'ubetalt',
      paid: 'betalt',
    };
  }

  async fetchTickets() {
    const ref = await this.firestore.collection('tickets').get();

    const tickets = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tickets;
  }

  async fetchTicket(id) {
    const ref = await this.firestore
      .collection('tickets')
      .doc(id)
      .get();
    return ref.data();
  }

  async createTicket({ name, email, phone, playId, date, seats }) {
    const max = 164; // Max seat count

    const play = await this.firestore
      .collection('performances')
      .doc(playId)
      .get();

    if (!play.exists) throw new Error(BAD_REQUEST);

    const playData = play.data();
    const seatCount = playData.count;

    // Calc request seat count
    const requestedSeats = this.getTotalSeats(seats);

    // Calc new seat count
    const newSeatCount = seatCount + requestedSeats;
    // Calc total amount
    const total = this.calculateTotal(playData.prices, seats);

    //Check for errors
    if (isNaN(requestedSeats) || !requestedSeats) throw new Error(BAD_REQUEST);
    if (seatCount >= max) throw new Error(PLAY_IS_BOOKED);
    if (newSeatCount > max) throw new Error(PLAY_NOT_ENOUGH_SEATS);

    const uid = shortid.generate();
    const ref = await this.firestore.collection('tickets').doc(uid);

    const writeRef = await ref.set({
      name,
      email,
      phone,
      playId,
      date,
      status: 'unpaid',
      seats,
      totalSeats: requestedSeats,
      total,
      createdAt: this.serverTime,
    });

    const updatedPlay = await play.ref.set({ count: newSeatCount }, { merge: true });

    return ref;
  }

  async updateTicket({ id, status }) {
    const ticketRef = await this.firestore.collection('tickets').doc(id);
    const ticket = await ticketRef.get();

    const prevStatus = ticket.data().status;
    if (!ticket.exists) throw new Error(TICKET_NOT_EXIST);
    if (prevStatus == 'paid') throw new Error(TICKET_UPDATE_ERROR);

    const writeRef = await ticketRef.set(
      {
        status,
      },
      { merge: true }
    );

    const newTicket = await ticketRef.get();
    const ticketData = newTicket.data();
    const seats = this.getTotalSeats(ticketData.seats);

    return {
      id: newTicket.id,
      ...ticketData,
      seats,
      status: this.statusTypes[ticketData.status],
    };
  }

  // Utils
  getTotalSeats(seats = {}) {
    return Object.values(seats).reduce(
      (acc, seat) => acc + (parseInt(seat) ? parseInt(seat) : 0),
      0
    );
  }

  calculateTotal(prices, seats) {
    return prices.reduce((acc, value) => {
      const amount = seats[value.id] || 0;
      return acc + value.price * amount;
    }, 0);
  }
}

export default TicketService;

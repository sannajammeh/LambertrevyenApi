'use strict';
import shortid from 'shortid';
import { PLAY_IS_BOOKED, PLAY_NOT_ENOUGH_SEATS, BAD_REQUEST } from '../error.types';

class TicketService {
  constructor(firestore, serverTime) {
    this.firestore = firestore;
    this.serverTime = serverTime;
  }

  async fetchTickets() {
    const ref = await this.firestore.collection('tickets').get();

    const tickets = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tickets;
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
      createdAt: this.serverTime,
    });

    const updatedPlay = await play.ref.set({ count: newSeatCount }, { merge: true });

    return ref;
  }
  getTotalSeats(seats = {}) {
    let count = 0;
    for (const value of Object.values(seats)) {
      count += value ? Number(value) : 0;
    }
    return count;
  }
}

export default TicketService;

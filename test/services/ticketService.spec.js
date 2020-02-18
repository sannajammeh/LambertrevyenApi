import { expect, assert } from 'chai';
import TicketService from '../../src/services/ticketService';

const mockFirebase = {
  collection: function() {
    return Promise.resolve(resolve => resolve);
  },
};
const ticketService = new TicketService(mockFirebase, 'mock servertime');

describe('TicketService->getTotalSeats', () => {
  const seats = {
    ordinary: 2,
    generous: 4,
    fakegenerous: 'dsdsd',
  };
  it('Should return number', () => {
    assert.isNumber(ticketService.getTotalSeats(seats));
  });

  it('Should return 6', () => {
    assert.equal(ticketService.getTotalSeats(seats), 6);
  });
});

describe('TicketService->calculateTotal', () => {
  const prices = [
    { id: 'g', price: 200 },
    { id: 'ordinary', price: 120 },
  ];
  const seats = {
    ordinary: '2',
    generous: 1,
  };

  it('Should return 440 from ordinary (count 2, price 120), generous (count 1 price 200)', () => {
    assert.equal(ticketService.calculateTotal(prices, seats), 440);
  });
});

const { expect } = require('chai');

const TicketService = require('../../src/services/ticketService');

const mockFirebase = {
  collection: function() {
    return Promise.resolve(resolve => resolve);
  },
};
const ticketService = new TicketService(mockFirebase);

describe('TicketService->getTotalTickets', () => {
  it('Should return number', () => {
    expect(ticketService.getTotalTickets({})).to.be.a('number');
  });
});

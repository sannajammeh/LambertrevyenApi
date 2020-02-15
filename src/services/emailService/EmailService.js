import { ticketReserved } from './emailTemplates';

class EmailService {
  constructor(sendGrid) {
    this.sendGrid = sendGrid;
  }

  async send(email) {
    try {
      await this.sendGrid.send(email);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async sendTicketReserved({ id, name, seats, date, email, total }) {
    const request = {
      to: email,
      from: 'no-reply@lambertrevyen2020.no',
      subject: 'Billett er reservert! Lambertrevyen 2020',
      html: ticketReserved({ ticketId: id, name, seats, total, date })
    };
    return await this.send(request);
  }
}

export default EmailService;

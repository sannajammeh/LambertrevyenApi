import { ticketReserved } from './templates/ticketReserved';
import { ticketStatus } from './templates/ticketStatus';
import { logger } from '../../logger';

class EmailService {
  constructor(sendGrid) {
    this.sendGrid = sendGrid;
  }

  async send(email) {
    try {
      const request = {
        ...email,
        from: 'no-reply@lambertrevyen2020.no',
      };

      await this.sendGrid.send(request);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      throw new Error(error);
    }
  }

  async sendTicketReserved({ id, name, seats, date, email, total }) {
    const request = {
      to: email,
      from: 'no-reply@lambertrevyen2020.no',
      subject: 'Billett er reservert! Lambertrevyen 2020',
      html: ticketReserved({ ticketId: id, name, seats, total, date }),
    };
    return await this.send(request);
  }

  async sendTicketStatus({ id, name, seats, date, email, total, status }) {
    const request = {
      to: email,
      subject: 'Ny billett status! Lambertrevyen 2020',
      html: ticketStatus({ id, name, seats, total, date, status }),
    };

    return await this.send(request);
  }
}

export default EmailService;

'use strict';
import {
  BAD_REQUEST,
  PLAY_IS_BOOKED,
  PLAY_NOT_ENOUGH_SEATS,
  PLAY_NOT_EXIST,
  VALIDATION_ERROR,
} from '../error.types';
import { logger } from '../logger';

export const TicketsErrorHandler = (err, req, res, next) => {
  logger.log({ level: 'info', message: err.message });
  switch (err.message) {
    case BAD_REQUEST:
      return res.status(400).json({ msg: err.message });

    case PLAY_IS_BOOKED:
      return res.status(400).json({ type: PLAY_IS_BOOKED });

    case PLAY_NOT_ENOUGH_SEATS:
      return res.status(400).json({ type: PLAY_NOT_ENOUGH_SEATS });

    case PLAY_NOT_EXIST:
      return res.status(400).json({ type: PLAY_NOT_EXIST });

    case VALIDATION_ERROR:
      return res.status(400).json({ type: VALIDATION_ERROR, fields: err.fields });

    default:
      return res.status(400).json({ msg: err.message });
  }
};

Intl = require('intl');

export const formatToNok = number =>
  Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(number);

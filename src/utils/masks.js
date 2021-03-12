import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';

export const MASKS = {
  phone: [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ],
  zip: [/\d/, /\d/, /\d/, /\d/, /\d/],
  currency: createNumberMask({
    allowDecimal: true
  }),
  percent: createNumberMask({
    prefix: '',
    suffix: '%'
  }),
  email: emailMask,
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
};

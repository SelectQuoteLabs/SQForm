import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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
  })
};

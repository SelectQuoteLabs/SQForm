import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';
import type {Mask as MaskArray} from 'react-text-mask';

const zipMask = (userInput: string): MaskArray => {
  const numbers = userInput.match(/\d/g);
  const numberLength = numbers ? numbers.join('').length : 0;

  if (numberLength > 5) {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  } else {
    return [/\d/, /\d/, /\d/, /\d/, /\d/];
  }
};

const creditCardExpiryMask = (userInput: string): MaskArray => {
  const expiryMask = [/[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/];
  const month = Number(userInput.substring(0, 2));

  if (month > 12) {
    expiryMask[1] = /[0-2]/;
  }

  return expiryMask;
};

export const MASKS = {
  phone: [
    '(',
    /\d/,
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
    /\d/,
  ],
  zip: zipMask,
  currency: createNumberMask({
    allowDecimal: true,
  }),
  percent: createNumberMask({
    prefix: '',
    suffix: '%',
  }),
  email: emailMask,
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  ssn: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  creditCardNumber: [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  creditCardExpiry: creditCardExpiryMask,
  creditCardCVV: [/\d/, /\d/, /\d/],
};

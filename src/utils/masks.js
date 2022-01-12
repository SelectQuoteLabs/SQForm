import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';

const zipMask = (userInput) => {
  const numbers = userInput.match(/\d/g);
  const numberLength = numbers ? numbers.join('').length : 0;

  if (numberLength > 5) {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  } else {
    return [/\d/, /\d/, /\d/, /\d/, /\d/];
  }
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
};

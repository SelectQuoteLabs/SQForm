import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import SQFormTextField from './SQFormTextField';

const MASKS = {
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

function TextFieldMask({inputRef, mask, ...rest}) {
  return (
    <MaskedInput
      {...rest}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

function SQFormMaskedTextField({
  mask,
  name,
  label,
  isDisabled,
  isRequired,
  placeholder,
  size,
  onBlur,
  onChange,
  startAdornment,
  endAdornment,
  type,
  InputProps,
  inputProps,
  muiFieldProps
}) {
  return (
    <SQFormTextField
      name={name}
      label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      placeholder={placeholder}
      size={size}
      onBlur={onBlur}
      onChange={onChange}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      type={type}
      InputProps={{
        ...InputProps,
        inputComponent: TextFieldMask
      }}
      inputProps={{
        ...inputProps,
        mask: MASKS[mask]
      }}
      muiFieldProps={muiFieldProps}
    />
  );
}

SQFormMaskedTextField.propTypes = {
  mask: PropTypes.oneOf(['phone', 'zip', 'currency']).isRequired
};

export default SQFormMaskedTextField;

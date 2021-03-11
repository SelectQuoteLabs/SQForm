import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import SQFormTextField from './SQFormTextField';

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
        mask
      }}
      muiFieldProps={muiFieldProps}
    />
  );
}

SQFormMaskedTextField.propTypes = {
  /** Valid mask array; custom or from utils/masks.js */
  mask: PropTypes.array.isRequired
};

export default SQFormMaskedTextField;

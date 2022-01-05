import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import SQFormReadOnlyField from './SQFormReadOnlyField';

function TextFieldMask({inputRef, mask, ...rest}) {
  return (
    <MaskedInput
      {...rest}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

function SQFormMaskedReadOnlyField({
  mask,
  name,
  label,
  placeholder = '- -',
  size = 'auto',
  InputProps,
  inputProps = {},
  muiFieldProps = {},
}) {
  return (
    <SQFormReadOnlyField
      name={name}
      label={label}
      size={size}
      InputProps={{
        ...InputProps,
        placeholder,
        inputComponent: TextFieldMask,
      }}
      inputProps={{
        ...inputProps,
        mask,
      }}
      muiFieldProps={muiFieldProps}
    />
  );
}

SQFormMaskedReadOnlyField.propTypes = {
  /** Valid mask array; custom or from utils/masks.js */
  mask: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]),
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.string.isRequired,
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder: PropTypes.string,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Props applied to the Input element */
  InputProps: PropTypes.object,
  /** Attributes applied to the `input` element */
  inputProps: PropTypes.object,
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps: PropTypes.object,
};

export default SQFormMaskedReadOnlyField;

import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import {useFormikContext} from 'formik';
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
  isDisabled = false,
  isRequired = false,
  placeholder,
  size = 'auto',
  onBlur,
  onChange,
  startAdornment,
  endAdornment,
  type = 'text',
  InputProps,
  inputProps = {},
  muiFieldProps = {},
  stripNonNumeric = false
}) {
  const {setFieldValue} = useFormikContext();

  const handleChangeStripNonNumeric = event => {
    onChange && onChange(event);
    setFieldValue(name, event.target.value.replace(/[^\d]/g, ''));
  };

  return (
    <SQFormTextField
      name={name}
      label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      placeholder={placeholder}
      size={size}
      onBlur={onBlur}
      onChange={stripNonNumeric ? handleChangeStripNonNumeric : onChange}
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
  mask: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func
  ]),
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.string.isRequired,
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder: PropTypes.string,
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Adornment that appears at the start of the input */
  startAdornment: PropTypes.node,
  /** Adornment that appears at the end of the input */
  endAdornment: PropTypes.node,
  /** Defines the input type for the text field. Must be a valid HTML5 input type */
  type: PropTypes.string,
  /** Props applied to the Input element */
  InputProps: PropTypes.object,
  /** Attributes applied to the `input` element */
  inputProps: PropTypes.object,
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps: PropTypes.object,
  /** The submitted value from the input will have all non-numeric charactes removed */
  stripNonNumeric: PropTypes.bool
};

export default SQFormMaskedTextField;

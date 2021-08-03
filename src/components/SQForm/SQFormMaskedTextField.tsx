import React from 'react';
import MaskedInput from 'react-text-mask';
import {maskProp} from '../../types/MaskTypes';
import SQFormTextField, {SQFormTextFieldProps} from './SQFormTextField';

interface SQFormMaskedTextFieldProps extends SQFormTextFieldProps {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
}

interface TextFieldMaskProps extends React.HTMLAttributes<HTMLInputElement> {
  inputRef?: (ref: HTMLElement | null) => void;
  mask?: maskProp;
}

function TextFieldMask({
  inputRef,
  mask,
  ...rest
}: TextFieldMaskProps): React.ReactElement {
  return (
    <MaskedInput
      {...rest}
      ref={ref => {
        inputRef && inputRef(ref ? ref.inputElement : null);
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
  muiFieldProps = {}
}: SQFormMaskedTextFieldProps): React.ReactElement {
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

export default SQFormMaskedTextField;

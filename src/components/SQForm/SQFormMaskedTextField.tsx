import React from 'react';
import {TextFieldProps, InputProps} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import BaseFieldProps from 'types/BaseFieldProps';
import {maskProp} from '../../types/MaskTypes';
import SQFormTextField from './SQFormTextField';

interface SQFormMaskedTextFieldProps extends BaseFieldProps {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Required property used to highlight input and label if not fulfilled */
  isRequired?: boolean;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom onChange event callback */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Adornment that appears at the start of the input */
  startAdornment?: React.ReactElement;
  /** Adornment that appears at the end of the input */
  endAdornment?: React.ReactElement;
  /** Defines the input type for the text field. Must be a valid HTML5 input type */
  type?: string;
  /** Props applied to the Input element */
  InputProps?: InputProps;
  /** Attributes applied to the `input` element */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps?: TextFieldProps;
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

import {useFormikContext} from 'formik';
import React from 'react';
import MaskedInput from 'react-text-mask';
import type {maskProp} from 'types';
import SQFormTextField from './SQFormTextField';
import type {SQFormTextFieldProps} from './SQFormTextField';

export interface SQFormMaskedTextFieldProps extends SQFormTextFieldProps {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
  /** Whether the submitted value from the input should have all non-numeric characters removed */
  stripNonNumeric?: boolean;
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
      ref={(ref) => {
        inputRef && inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask || false}
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
  stripNonNumeric = false,
}: SQFormMaskedTextFieldProps): React.ReactElement {
  const {setFieldValue} = useFormikContext();

  const handleChangeStripNonNumeric = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

export default SQFormMaskedTextField;

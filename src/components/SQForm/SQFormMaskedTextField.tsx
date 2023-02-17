import {useFormikContext} from 'formik';
import React from 'react';
import MaskedInput from 'react-text-mask';
import SQFormTextField from './SQFormTextField';
import type {Mask} from '../../types';
import type {SQFormTextFieldProps} from './SQFormTextField';

export type SQFormMaskedTextFieldProps = SQFormTextFieldProps & {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: Mask;
  /** Whether the submitted value from the input should have all non-numeric characters removed */
  stripNonNumeric?: boolean;
};

type TextFieldMaskProps = React.HTMLAttributes<HTMLInputElement> & {
  inputRef?: (ref: HTMLElement | null) => void;
  mask?: Mask;
};

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
  displayHelperText = true,
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
      displayHelperText={displayHelperText}
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

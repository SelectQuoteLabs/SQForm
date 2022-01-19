import React from 'react';
import MaskedInput from 'react-text-mask';
import type {maskProp} from 'types';
import SQFormReadOnlyField from './SQFormReadOnlyField';
import type {SQFormReadOnlyFieldProps} from './SQFormReadOnlyField';

interface TextFieldMaskProps extends React.HTMLAttributes<HTMLInputElement> {
  inputRef?: (ref: HTMLElement | null) => void;
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
}

export interface SQFormMaskedReadOnlyFieldProps extends SQFormReadOnlyFieldProps {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
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

function SQFormMaskedReadOnlyField({
  mask,
  name,
  label,
  placeholder = '- -',
  size = 'auto',
  InputProps,
  inputProps = {},
  muiFieldProps = {},
}: SQFormMaskedReadOnlyFieldProps): React.ReactElement {
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

export default SQFormMaskedReadOnlyField;

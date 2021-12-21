import React from 'react';
import MaskedInput from 'react-text-mask';
import {maskProp} from 'types';
import SQFormReadOnlyField, {
  SQFormReadOnlyFieldProps,
} from './SQFormReadOnlyField';

interface TextFieldMaskProps extends React.HTMLAttributes<HTMLInputElement> {
  inputRef?: (ref: HTMLElement | null) => void;
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
}

interface SQFormMaskedReadOnlyFieldProps extends SQFormReadOnlyFieldProps {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: maskProp;
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: string;
  /** Descriptive label of the input */
  label: string;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Size of the input given full-width is 12. */
  size?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
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

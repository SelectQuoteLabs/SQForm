import React from 'react';
import MaskedInput from 'react-text-mask';
import SQFormReadOnlyField from '../SQFormReadOnlyField/SQFormReadOnlyField';
import type {Mask} from '../../../types';
import type {SQFormReadOnlyFieldProps} from '../SQFormReadOnlyField/SQFormReadOnlyField';

type TextFieldMaskProps = React.HTMLAttributes<HTMLInputElement> & {
  inputRef?: (ref: HTMLElement | null) => void;
  /** Valid mask array; custom or from utils/masks.js */
  mask?: Mask;
};

export type SQFormMaskedReadOnlyFieldProps = SQFormReadOnlyFieldProps & {
  /** Valid mask array; custom or from utils/masks.js */
  mask?: Mask;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
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
        sx: {
          fontWeight: 600,
        },
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

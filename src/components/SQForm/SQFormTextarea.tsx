import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {useFormikContext} from 'formik';
import type {FormikProps} from 'formik';
import {useForm} from './useForm';
import type {TextFieldProps} from '@material-ui/core';
import type {BaseFieldProps} from 'types';
import {toKebabCase} from '../../utils';

interface SQFormTextareaProps extends BaseFieldProps {
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Required property used to highlight input and label if not fulfilled */
  isRequired?: boolean;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Custom onChange event callback */
  onChange?: TextFieldProps['onChange'];
  /** Number of rows to display when multiline option is set to true. */
  rows?: number;
  /** Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: number;
  /** Attributes applied to the `textarea` element */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Defines the maximum number of characters the user can enter into the field; mapped to `textarea` element `maxlength` attribute */
  maxCharacters?: number;
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps?: TextFieldProps;
}

interface FormValues {
  [field: string]: string;
}

function SQFormTextarea({
  name,
  label,
  isDisabled = false,
  placeholder = '',
  size = 'auto',
  onBlur,
  onChange,
  rows = 3,
  rowsMax = 3,
  maxCharacters,
  inputProps = {},
  muiFieldProps = {},
}: SQFormTextareaProps): JSX.Element {
  const {values}: FormikProps<FormValues> = useFormikContext();
  const {
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {
      handleBlur,
      handleChange: handleChangeHelper,
      HelperTextComponent,
    },
  } = useForm<string, React.ChangeEvent<HTMLInputElement>>({
    name,
    onBlur,
    onChange,
  });

  const [valueLength, setValueLength] = React.useState<number>(
    values[name]?.length || 0
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValueLength(event.target.value.length);
    handleChangeHelper(event);
  };

  const maxCharactersValue = inputProps.maxLength || maxCharacters;
  const characterCounter =
    maxCharactersValue && `: ${valueLength}/${maxCharactersValue}`;

  const labelText = (
    <span>
      {label} {characterCounter}
    </span>
  );

  return (
    <Grid item sm={size}>
      <TextField
        id={toKebabCase(name)}
        color="primary"
        disabled={isDisabled}
        error={isFieldError}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        FormHelperTextProps={{error: isFieldError}}
        name={name}
        label={labelText}
        multiline={true}
        helperText={!isDisabled && HelperTextComponent}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={isFieldRequired}
        minRows={rows}
        maxRows={rowsMax}
        variant="outlined"
        value={values[name]}
        inputProps={{
          maxLength: maxCharacters,
          ...inputProps,
        }}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default SQFormTextarea;

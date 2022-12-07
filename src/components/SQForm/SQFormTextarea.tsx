import React from 'react';
import {Grid, TextField} from '@mui/material';
import {useFormikContext} from 'formik';
import {useForm} from './useForm';
import {toKebabCase} from '../../utils';
import type {FormikProps} from 'formik';
import type {TextFieldProps} from '@mui/material';
import type {BaseFieldProps} from '../../types';

export type SQFormTextareaProps = BaseFieldProps & {
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Custom onBlur event callback */
  onBlur?: TextFieldProps['onBlur'];
  /** Custom onChange event callback */
  onChange?: TextFieldProps['onChange'];
  /** Number of rows to display when multiline option is set to true. */
  minRows?: number;
  /** Maximum number of rows to display when multiline option is set to true. */
  maxRows?: number;
  /** Attributes applied to the `textarea` element */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Defines the maximum number of characters the user can enter into the field; mapped to `textarea` element `maxlength` attribute */
  maxCharacters?: number;
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps?: TextFieldProps;
};

type FormValues = {
  [field: string]: string;
};

const classes = {
  requiredLabelNotchedOutline: {
    // Asterisk is still in dom taking up space for required fields, this fixing spacing
    '& > div fieldset legend span': {padding: '0px'},
  },
};

function SQFormTextarea({
  name,
  label,
  isDisabled = false,
  placeholder = '',
  size = 'auto',
  onBlur,
  onChange,
  minRows = 3,
  maxRows = 3,
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
        sx={isFieldRequired ? classes.requiredLabelNotchedOutline : undefined}
        id={toKebabCase(name)}
        color="primary"
        disabled={isDisabled}
        error={isFieldError}
        fullWidth={true}
        InputLabelProps={{
          shrink: true,
        }}
        FormHelperTextProps={{error: isFieldError}}
        name={name}
        label={labelText}
        multiline={true}
        helperText={!isDisabled && HelperTextComponent}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={isFieldRequired}
        minRows={minRows}
        maxRows={maxRows}
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

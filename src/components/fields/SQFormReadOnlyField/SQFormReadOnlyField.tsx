import React from 'react';
import {Grid, TextField} from '@mui/material';
import {useForm} from '../../../hooks/useForm';
import {toKebabCase} from '../../../utils';
import type {TextFieldProps} from '@mui/material';
import type {BaseFieldProps} from '../../../types';

export type SQFormReadOnlyFieldProps = BaseFieldProps & {
  muiFieldProps?: TextFieldProps;
  InputProps?: TextFieldProps['InputProps'];
  inputProps?: TextFieldProps['inputProps'];
};

const readOnlyInputProps = {
  disableUnderline: true,
  readOnly: true,
};

const styles = {
  '& .MuiInput-input': {
    fontWeight: 'var(--font-weight-semibold)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--color-jetBlack)',
  },
};

function SQFormReadOnlyField({
  label,
  name,
  size = 'auto',
  InputProps = {},
  inputProps = {},
  muiFieldProps = {},
}: SQFormReadOnlyFieldProps): React.ReactElement {
  const {
    formikField: {field},
  } = useForm({name});

  return (
    <Grid item sm={size}>
      <TextField
        id={toKebabCase(name)}
        variant="standard"
        label={label}
        name={name}
        value={
          field.value !== null &&
          field.value !== undefined &&
          String(field.value)
            ? field.value
            : '- -'
        }
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          ...InputProps,
          ...readOnlyInputProps,
        }}
        inputProps={inputProps}
        style={{marginBottom: 21}}
        sx={styles}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default SQFormReadOnlyField;

import React from 'react';
import {Grid, TextField} from '@mui/material';
import {useForm} from './useForm';
import {toKebabCase} from '../../utils';
import type {TextFieldProps} from '@mui/material';
import type {BaseFieldProps} from '../../types';

export type SQFormReadOnlyFieldProps = BaseFieldProps & {
  muiFieldProps?: TextFieldProps;
  InputProps?: TextFieldProps['InputProps'];
  inputProps?: TextFieldProps['inputProps'];
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
          readOnly: true,
        }}
        inputProps={inputProps}
        style={{marginBottom: 21}}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default SQFormReadOnlyField;

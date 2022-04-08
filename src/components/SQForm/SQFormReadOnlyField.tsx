import type {BaseFieldProps} from '../../types';
import {toKebabCase} from '../../utils';
import {useForm} from './useForm';
import {Grid} from '@material-ui/core';
import type {TextFieldProps} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export interface SQFormReadOnlyFieldProps extends BaseFieldProps {
  muiFieldProps?: TextFieldProps;
  InputProps?: TextFieldProps['InputProps'];
  inputProps?: TextFieldProps['inputProps'];
}

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
        label={label}
        name={name}
        value={field.value || '- -'}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          ...InputProps,
          readOnly: true,
          disableUnderline: true,
        }}
        inputProps={inputProps}
        style={{marginBottom: 21}}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default SQFormReadOnlyField;

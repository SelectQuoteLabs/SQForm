import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import {useForm} from './useForm';
import {toKebabCase} from '../../utils';
import type {TextFieldProps} from '@material-ui/core';
import type {BaseFieldProps} from '../../types';


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

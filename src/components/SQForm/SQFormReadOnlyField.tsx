import React from 'react';
import {Grid, TextFieldProps} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useForm} from './useForm';
import {BaseFieldProps} from '../../types/';
import {toKebabCase} from '../../utils';

type SQFormReadOnlyFieldProps = {
  muiFieldProps?: TextFieldProps;
} & BaseFieldProps;

function SQFormReadOnlyField({
  label,
  name,
  size = 'auto',
  muiFieldProps = {},
}: SQFormReadOnlyFieldProps): React.ReactElement {
  const {
    formikField: {field},
  } = useForm({name, isRequired: false});

  return (
    <Grid item sm={size}>
      <TextField
        id={toKebabCase(label)}
        label={label}
        name={name}
        value={field.value || '- -'}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
        }}
        style={{marginBottom: 21}}
        {...muiFieldProps}
      />
    </Grid>
  );
}

export default SQFormReadOnlyField;

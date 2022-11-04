import React from 'react';
import {Grid, TextField} from '@material-ui/core';
import {useForm} from './useForm';
import {toKebabCase} from '../../utils';
import type {TextFieldProps} from '@material-ui/core';
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

  const getFieldValue = field.value || field.value === 0 ? field.value : '- -';

  return (
    <Grid item sm={size}>
      <TextField
        id={toKebabCase(name)}
        label={label}
        name={name}
        value={getFieldValue}
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

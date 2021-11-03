import React from 'react';
import {Grid, TextFieldProps} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useForm} from './useForm';
import {BaseFieldProps} from 'types';
import {toKebabCase} from '../../utils';

interface SQFormReadOnlyFieldProps extends BaseFieldProps {
  muiFieldProps?: TextFieldProps;
  InputProps: TextFieldProps['InputProps'];
  inputProps: TextFieldProps['inputProps'];
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
  } = useForm({name, isRequired: false});

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

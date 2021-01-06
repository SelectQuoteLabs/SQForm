import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {useForm} from './useForm';

function SQFormReadOnlyField({label, name, size = 'auto', muiFieldProps = {}}) {
  const {
    formikField: {field}
  } = useForm({name, isRequired: false});

  return (
    <Grid item sm={size}>
      <TextField
        label={label}
        name={name}
        value={field.value || '- -'}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          readOnly: true,
          disableUnderline: true
        }}
        style={{marginBottom: 21}}
        {...muiFieldProps}
      />
    </Grid>
  );
}

SQFormReadOnlyField.propTypes = {
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Any valid prop for material ui child component - https://material-ui.com/  */
  muiFieldProps: PropTypes.object
};

export default SQFormReadOnlyField;

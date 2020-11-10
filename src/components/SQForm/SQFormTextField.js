import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import {useForm} from './useForm';

function SQFormTextField({
  name,
  label,
  isDisabled = false,
  isRequired = false,
  placeholder = '',
  size = 'auto',
  onBlur,
  onChange,
  startAdornment,
  endAdornment
}) {
  const {
    formikField: {field},
    fieldState: {isFieldError},
    fieldHelpers: {handleBlur, handleChange, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onBlur,
    onChange
  });

  return (
    <Grid item sm={size}>
      <TextField
        color="primary"
        disabled={isDisabled}
        error={isFieldError}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null
        }}
        FormHelperTextProps={{error: isFieldError}}
        name={name}
        type="text"
        label={label}
        helperText={HelperTextComponent}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={isRequired}
        value={field.value}
      />
    </Grid>
  );
}

SQFormTextField.propTypes = {
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.string.isRequired,
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder: PropTypes.string,
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Adornment that appears at the start of the input */
  startAdornment: PropTypes.node,
  /** Adornment that appears at the end of the input */
  endAdornment: PropTypes.node
};

export default SQFormTextField;

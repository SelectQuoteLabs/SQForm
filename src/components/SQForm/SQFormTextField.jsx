import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import {useForm} from './useForm';
import {toKebabCase} from '../../utils';

function SQFormTextField({
  name,
  label,
  isDisabled = false,
  placeholder = '- -',
  size = 'auto',
  onBlur,
  onChange,
  startAdornment,
  endAdornment,
  type = 'text',
  InputProps,
  inputProps = {},
  maxCharacters,
  muiFieldProps = {},
}) {
  const {
    formikField: {field},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {
      handleBlur,
      handleChange: handleChangeHelper,
      HelperTextComponent,
    },
  } = useForm({
    name,
    onBlur,
    onChange,
  });

  const [valueLength, setValueLength] = React.useState(
    field.value?.length || 0
  );

  const handleChange = (e) => {
    setValueLength(e.target.value.length);
    handleChangeHelper(e);
  };

  const maxCharactersValue = inputProps.maxLength || maxCharacters;
  const characterCounter = maxCharactersValue && (
    <small>
      : {valueLength}/{maxCharactersValue}
    </small>
  );

  const labelText = (
    <span>
      {label} {characterCounter}
    </span>
  );

  return (
    <Grid item sm={size}>
      <TextField
        id={toKebabCase(name)}
        color="primary"
        disabled={isDisabled}
        error={isFieldError}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
        InputProps={{
          ...InputProps,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
        }}
        inputProps={{
          maxLength: maxCharacters,
          ...inputProps,
        }}
        FormHelperTextProps={{error: isFieldError}}
        name={name}
        type={type}
        label={labelText}
        helperText={!isDisabled && HelperTextComponent}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={isFieldRequired}
        value={field.value}
        {...muiFieldProps}
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
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Adornment that appears at the start of the input */
  startAdornment: PropTypes.node,
  /** Adornment that appears at the end of the input */
  endAdornment: PropTypes.node,
  /** Defines the input type for the text field. Must be a valid HTML5 input type */
  type: PropTypes.string,
  /** Props applied to the Input element */
  InputProps: PropTypes.object,
  /** Attributes applied to the `input` element */
  inputProps: PropTypes.object,
  /** Defines the maximum number of characters the user can enter into the field; mapped to `input` element `maxlength` attribute */
  maxCharacters: PropTypes.number,
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps: PropTypes.object,
};

export default SQFormTextField;

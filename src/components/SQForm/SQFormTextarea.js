import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {useFormikContext} from 'formik';

import {useForm} from './useForm';
import {toKebabCase} from '../../utils';

function SQFormTextarea({
  name,
  label,
  isDisabled = false,
  placeholder = '',
  size = 'auto',
  onBlur,
  onChange,
  rows = 3,
  rowsMax = 3,
  maxCharacters,
  inputProps = {},
  muiFieldProps = {},
}) {
  const {values} = useFormikContext();
  const {
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
    values[name]?.length || 0
  );

  const handleChange = (event) => {
    setValueLength(event.target.value.length);
    handleChangeHelper(event);
  };

  const maxCharactersValue = inputProps.maxLength || maxCharacters;
  const characterCounter =
    maxCharactersValue && `: ${valueLength}/${maxCharactersValue}`;

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
        FormHelperTextProps={{error: isFieldError}}
        name={name}
        label={labelText}
        multiline={true}
        helperText={!isDisabled && HelperTextComponent}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={isFieldRequired}
        rows={rows}
        rowsMax={rowsMax}
        variant="outlined"
        value={values[name]}
        inputProps={{
          maxLength: maxCharacters,
          ...inputProps,
        }}
        {...muiFieldProps}
      />
    </Grid>
  );
}

SQFormTextarea.propTypes = {
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
  /** Number of rows to display when multiline option is set to true. */
  rows: PropTypes.number,
  /** Maximum number of rows to display when multiline option is set to true. */
  rowsMax: PropTypes.number,
  /** Attributes applied to the `textarea` element */
  inputProps: PropTypes.object,
  /** Defines the maximum number of characters the user can enter into the field; mapped to `textarea` element `maxlength` attribute */
  maxCharacters: PropTypes.number,
  /** Any valid prop for material ui text input child component - https://material-ui.com/api/text-field/#props */
  muiFieldProps: PropTypes.object,
};

export default SQFormTextarea;

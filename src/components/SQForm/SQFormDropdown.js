import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';

import {useForm} from './useForm';
import {EMPTY_LABEL} from '../../utils/constants';

const EMPTY_VALUE = '';
const EMPTY_OPTION = {label: EMPTY_LABEL, value: EMPTY_VALUE};

function SQFormDropdown({
  children,
  displayEmpty = false,
  isDisabled = false,
  isRequired = false,
  label,
  name,
  onBlur,
  onChange,
  size = 'auto',
  muiFieldProps = {}
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
  const labelID = label.toLowerCase();

  const options = React.useMemo(() => {
    if (!displayEmpty) return children;

    const [firstOption] = children;

    if (
      firstOption.label === EMPTY_LABEL ||
      firstOption.label === EMPTY_VALUE
    ) {
      return children;
    }

    return [EMPTY_OPTION, ...children];
  }, [children, displayEmpty]);

  const renderValue = value => {
    if (value === EMPTY_VALUE) {
      return EMPTY_LABEL;
    }

    return options.find(option => option.value === value).label;
  };

  return (
    <Grid item sm={size}>
      <InputLabel error={isFieldError} id={labelID}>
        {label}
      </InputLabel>
      <Select
        displayEmpty={true}
        input={<Input disabled={isDisabled} name={name} />}
        value={field.value}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth={true}
        labelId={labelID}
        renderValue={renderValue}
        error={isFieldError}
        {...muiFieldProps}
      >
        {options.map(option => {
          return (
            <MenuItem
              key={option.value}
              disabled={option.isDisabled}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error={isFieldError} required={isRequired}>
        {HelperTextComponent}
      </FormHelperText>
    </Grid>
  );
}

SQFormDropdown.propTypes = {
  /** Dropdown options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  /** Whether to display empty option - - in options */
  displayEmpty: PropTypes.bool,
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** Name identifier of the input field */
  name: PropTypes.string.isRequired,
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Any valid prop for material ui select child component - https://material-ui.com/api/select/#props  */
  muiFieldProps: PropTypes.object
};

export default SQFormDropdown;

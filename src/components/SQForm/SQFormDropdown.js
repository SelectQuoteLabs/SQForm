import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

import {useForm} from './useForm';
import {
  getOutOfRangeValueWarning,
  getUndefinedChildrenWarning,
  getUndefinedValueWarning,
} from '../../utils/consoleWarnings';
import {EMPTY_LABEL} from '../../utils/constants';

const EMPTY_VALUE = '';
const EMPTY_OPTION = {label: EMPTY_LABEL, value: EMPTY_VALUE};

const useStyles = makeStyles({
  selectHeight: {
    '& .MuiSelect-selectMenu': {
      height: '1.1876em',
    },
  },
});

function SQFormDropdown({
  children,
  displayEmpty = false,
  isDisabled = false,
  label,
  name,
  onBlur,
  onChange,
  size = 'auto',
  muiFieldProps = {},
}) {
  const classes = useStyles();

  const {
    formikField: {field},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, handleChange, HelperTextComponent},
  } = useForm({
    name,
    onBlur,
    onChange,
  });
  const labelID = label.toLowerCase();

  const options = React.useMemo(() => {
    if (!children) {
      console.warn(getUndefinedChildrenWarning('SQFormDropdown', name));
      return [];
    }

    if (!displayEmpty) return children;

    const [firstOption] = children;

    if (
      firstOption?.label === EMPTY_LABEL ||
      firstOption?.label === EMPTY_VALUE
    ) {
      return children;
    }

    return [EMPTY_OPTION, ...children];
  }, [children, displayEmpty, name]);

  const renderValue = (value) => {
    if (value === undefined || value === null) {
      console.warn(getUndefinedValueWarning('SQFormDropdown', name));
      return EMPTY_LABEL;
    }

    if (value === EMPTY_VALUE) {
      return EMPTY_LABEL;
    }

    const valueToRender = options.find(
      (option) => option.value === value
    )?.label;
    if (!valueToRender) {
      console.warn(getOutOfRangeValueWarning('SQFormDropdown', name, value));
      return undefined;
    }

    return valueToRender;
  };

  return (
    <Grid item sm={size}>
      <FormControl
        error={isFieldError}
        required={isFieldRequired}
        disabled={isDisabled}
        fullWidth={true}
      >
        <InputLabel shrink={true} id={labelID}>
          {label}
        </InputLabel>
        <Select
          className={classes.selectHeight}
          displayEmpty={true}
          input={<Input name={name} />}
          value={field.value}
          onBlur={handleBlur}
          onChange={handleChange}
          labelId={labelID}
          renderValue={renderValue}
          {...muiFieldProps}
        >
          {options.map((option) => {
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
        {!isDisabled && <FormHelperText>{HelperTextComponent}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}

SQFormDropdown.propTypes = {
  /** Dropdown options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      isDisabled: PropTypes.bool,
    })
  ),
  /** Whether to display empty option - - in options */
  displayEmpty: PropTypes.bool,
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
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
  muiFieldProps: PropTypes.object,
};

export default SQFormDropdown;

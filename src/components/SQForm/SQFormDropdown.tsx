import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select, {SelectProps} from '@material-ui/core/Select';
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
import {BaseFieldProps, Option} from 'types';

interface SQFormDropdownProps extends BaseFieldProps {
  /** Dropdown options to select from */
  children: Option[];
  /** Whether to display empty option - - in options */
  displayEmpty?: boolean;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom onChange event callback */
  onChange?: SelectProps['onChange'];
  /** Any valid prop for material ui select child component - https://material-ui.com/api/select/#props  */
  muiFieldProps?: SelectProps;
}

const EMPTY_VALUE = '';
const EMPTY_OPTION = {
  label: EMPTY_LABEL,
  value: EMPTY_VALUE,
  isDisabled: false,
};

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
}: SQFormDropdownProps): React.ReactElement {
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

  const renderValue = (value: unknown) => {
    const getValue = (selectedValue: Option['value']) => {
      if (selectedValue === undefined || selectedValue === null) {
        console.warn(getUndefinedValueWarning('SQFormDropdown', name));
        return EMPTY_LABEL;
      }

      if (selectedValue === EMPTY_VALUE) {
        return EMPTY_LABEL;
      }

      const valueToRender = options.find(
        (option) => option.value === selectedValue
      )?.label;
      if (!valueToRender) {
        console.warn(
          getOutOfRangeValueWarning(
            'SQFormDropdown',
            name,
            selectedValue.toString()
          )
        );
        return undefined;
      }

      return valueToRender;
    };

    return getValue(value as Option['value']);
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
                key={`${name}_${option.value}`}
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

export default SQFormDropdown;

import React from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {useForm} from '../../../hooks/useForm';
import {
  getOutOfRangeValueWarning,
  getUndefinedChildrenWarning,
  getUndefinedValueWarning,
} from '../../../utils/consoleWarnings';
import {EMPTY_LABEL} from '../../../utils/constants';
import type {SelectProps} from '@mui/material';
import type {BaseFieldProps, SQFormOption} from '../../../types';

export type SQFormDropdownProps = BaseFieldProps & {
  /** Dropdown options to select from */
  children: SQFormOption[];
  /** Whether to display empty option - - in options */
  displayEmpty?: boolean;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Whether or not to show the helper text */
  displayHelperText?: boolean;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom onChange event callback */
  onChange?: SelectProps['onChange'];
  /** Any valid prop for material ui select child component - https://material-ui.com/api/select/#props  */
  muiFieldProps?: SelectProps;
};

const EMPTY_VALUE = '';
const EMPTY_OPTION = {
  label: EMPTY_LABEL,
  value: EMPTY_VALUE,
  isDisabled: false,
};

const classes = {
  selectHeight: {
    '& .MuiSelect-selectMenu': {
      height: '1.1876em',
    },
  },
};

function SQFormDropdown({
  children,
  displayEmpty = false,
  isDisabled = false,
  displayHelperText = true,
  label,
  name,
  onBlur,
  onChange,
  size = 'auto',
  muiFieldProps = {},
}: SQFormDropdownProps): React.ReactElement {
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
    const getValue = (selectedValue: SQFormOption['value']) => {
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

    return getValue(value as SQFormOption['value']);
  };

  return (
    <Grid item sm={size} sx={isDisabled ? {paddingBottom: '21px'} : null}>
      <FormControl
        error={isFieldError}
        required={isFieldRequired}
        disabled={isDisabled}
        variant="standard"
        fullWidth={true}
      >
        <InputLabel shrink={true} id={labelID}>
          {label}
        </InputLabel>
        <Select
          sx={classes.selectHeight}
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
        {!isDisabled && displayHelperText && (
          <FormHelperText>{HelperTextComponent}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

export default SQFormDropdown;

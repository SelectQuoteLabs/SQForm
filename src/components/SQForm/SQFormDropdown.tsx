import React, {ReactElement} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import BaseFieldProps from '../../types/BaseFieldProps';
import {InputBaseProps} from '@material-ui/core';

import {useForm} from './useForm';
import {
  getOutOfRangeValueWarning,
  getUndefinedChildrenWarning,
  getUndefinedValueWarning
} from '../../utils/consoleWarnings';
import {EMPTY_LABEL} from '../../utils/constants';

const EMPTY_VALUE = '';
const EMPTY_OPTION = {
  label: EMPTY_LABEL,
  value: EMPTY_VALUE,
  isDisabled: false
};

type Children = Array<{
  label: string;
  value: string | number;
  isDisabled?: boolean;
}>;
type Options = Children | [];

interface Props extends BaseFieldProps {
  children: Children;
  displayEmpty?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onBlur?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler;
  muiFieldProps?: InputBaseProps;
}

const useStyles = makeStyles({
  selectHeight: {
    '& .MuiSelect-selectMenu': {
      height: '1.1876em'
    }
  }
});

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
}: Props): ReactElement {
  const classes = useStyles();

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

  const options = React.useMemo<Options>(() => {
    if (!children) {
      console.warn(getUndefinedChildrenWarning('SQFormDropdown', name));
      return [];
    }

    if (!displayEmpty) return children;

    const [firstOption] = children;

    if (
      firstOption.label === EMPTY_LABEL ||
      firstOption.label === EMPTY_VALUE
    ) {
      return children;
    }

    return [EMPTY_OPTION, ...children];
  }, [children, displayEmpty, name]);

  const renderValue = (value: unknown) => {
    if (value === undefined || value === null) {
      console.warn(getUndefinedValueWarning('SQFormDropdown', name));
      return EMPTY_LABEL;
    }

    if (value === EMPTY_VALUE) {
      return EMPTY_LABEL;
    }

    const valueToRender = options.find(option => option.value === value)?.label;
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
        required={isRequired}
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
          {options.map(option => {
            return (
              <MenuItem
                key={option.value}
                disabled={option?.isDisabled}
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

import React from 'react';
import {
  Grid,
  RadioGroup,
  RadioProps,
  FormHelperText,
  FormControl,
  FormLabel
} from '@material-ui/core';
import SQFormRadioButtonGroupItem from './SQFormRadioButtonGroupItem';
import BaseFieldProps from 'types/BaseFieldProps';
import {useForm} from './useForm';

interface RadioButtonInputItemProps {
  value: string | boolean | number;
  label: string;
  isDisabled?: boolean;
  isRowDisplay?: boolean;
  inputProps?: RadioProps;
}

interface SQFormRadioButtonGroupProps extends BaseFieldProps {
  /** Function to call on value change */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether this radio selection is required */
  isRequired?: boolean;
  /** Whether to display group in row */
  shouldDisplayInRow?: boolean;
  /** Label to display above the group */
  groupLabel: string;
  /** Children must be an array of objects with radio button label and value information */
  children: RadioButtonInputItemProps[];
}

function SQFormRadioButtonGroup({
  name,
  onChange,
  isRequired = false,
  shouldDisplayInRow = false,
  size = 'auto',
  groupLabel,
  children
}: SQFormRadioButtonGroupProps): JSX.Element {
  const {
    fieldState: {isFieldError},
    formikField: {field},
    fieldHelpers: {handleChange, handleBlur, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onChange
  });

  const childrenToRadioGroupItems = () => {
    return children.map(radioOption => {
      const {label, value, isDisabled, inputProps} = radioOption;
      return (
        <SQFormRadioButtonGroupItem
          label={label}
          value={value}
          isDisabled={isDisabled}
          isRowDisplay={shouldDisplayInRow}
          inputProps={inputProps}
          key={`SQFormRadioButtonGroupItem_${value}`}
        />
      );
    });
  };

  return (
    <Grid item sm={size}>
      <FormControl
        component="fieldset"
        required={isRequired}
        error={isFieldError}
        onBlur={handleBlur}
      >
        <FormLabel
          component="legend"
          classes={{
            root: 'MuiInputLabel-root',
            asterisk: 'MuiInputLabel-asterisk'
          }}
        >
          {groupLabel}
        </FormLabel>
        <RadioGroup
          value={field.value}
          row={shouldDisplayInRow}
          aria-label={`SQFormRadioButtonGroup_${name}`}
          name={name}
          onChange={handleChange}
        >
          {childrenToRadioGroupItems()}
        </RadioGroup>
        <FormHelperText>{HelperTextComponent}</FormHelperText>
      </FormControl>
    </Grid>
  );
}

export default SQFormRadioButtonGroup;

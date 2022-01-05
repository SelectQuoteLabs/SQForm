import React from 'react';
import {
  Grid,
  RadioGroup,
  RadioProps,
  RadioGroupProps,
  FormHelperText,
  FormControl,
  FormLabel,
  GridSize,
} from '@material-ui/core';
import SQFormRadioButtonGroupItem from './SQFormRadioButtonGroupItem';
import {useForm} from './useForm';

interface RadioButtonInputItemProps {
  value: string | boolean | number;
  label: string;
  isDisabled?: boolean;
  InputProps?: RadioProps;
}

interface SQFormRadioButtonGroupProps {
  /** Name of the Radio Group */
  name: string;
  /** Size of the input given full-width is 12. */
  size?: GridSize;
  /** Function to call on value change */
  onChange?: RadioGroupProps['onChange'];
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
  shouldDisplayInRow = false,
  size = 'auto',
  groupLabel,
  children,
}: SQFormRadioButtonGroupProps): React.ReactElement {
  const {
    fieldState: {isFieldError, isFieldRequired},
    formikField: {field},
    fieldHelpers: {handleChange, handleBlur, HelperTextComponent},
  } = useForm<
    RadioButtonInputItemProps['value'],
    React.ChangeEvent<HTMLInputElement>
  >({
    name,
    onChange,
  });

  console.log('field', field);

  const childrenToRadioGroupItems = () => {
    return children.map((radioOption) => {
      const {label, value, isDisabled, InputProps} = radioOption;
      return (
        <SQFormRadioButtonGroupItem
          label={label}
          value={value}
          isDisabled={isDisabled}
          isRowDisplay={shouldDisplayInRow}
          InputProps={InputProps}
          key={`SQFormRadioButtonGroupItem_${value}`}
        />
      );
    });
  };

  return (
    <Grid item sm={size}>
      <FormControl
        component="fieldset"
        required={isFieldRequired}
        error={isFieldError}
        onBlur={handleBlur}
      >
        <FormLabel
          component="legend"
          classes={{
            root: 'MuiInputLabel-root',
            asterisk: 'MuiInputLabel-asterisk',
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

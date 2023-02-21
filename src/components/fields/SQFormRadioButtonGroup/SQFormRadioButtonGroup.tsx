import React from 'react';
import {
  Grid,
  RadioGroup,
  FormHelperText,
  FormControl,
  FormLabel,
} from '@mui/material';
import SQFormRadioButtonGroupItem from './SQFormRadioButtonGroupItem';
import {useForm} from '../../../hooks/useForm';
import type {GridSize, RadioProps, RadioGroupProps} from '@mui/material';

type RadioButtonConfigListItem = {
  value: string | boolean | number;
  label: string;
  isDisabled?: boolean;
  InputProps?: RadioProps;
};
type RadioButtonGroupChild = React.ReactElement | RadioButtonConfigListItem;

export type SQFormRadioButtonGroupProps = {
  /** Name of the Radio Group */
  name: string;
  /** Size of the input given full-width is 12. */
  size?: GridSize;
  /** Function to call on value change */
  onChange?: RadioGroupProps['onChange'];
  /** Whether to display group in row */
  shouldDisplayInRow?: boolean;
  /** Label to display above the group */
  groupLabel: string;
  /** Children must be 1) an array of objects with radio button label and value information OR 2) an array of SQFormRadioButtonGroupItem components, each with `label` and `value` props  */
  children: Array<RadioButtonGroupChild>;
};

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
  } = useForm<string | boolean | number, React.ChangeEvent<HTMLInputElement>>({
    name,
    onChange,
  });

  const childrenToRadioGroupItems = () => {
    if (children.every((item) => React.isValidElement(item))) {
      return children;
    }

    return children.map((radioOption) => {
      const {label, value, isDisabled, InputProps} =
        radioOption as RadioButtonConfigListItem;
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
    <Grid item={true} sm={size}>
      <FormControl
        component="fieldset"
        variant="standard"
        required={isFieldRequired}
        error={isFieldError}
        onBlur={handleBlur}
      >
        <FormLabel component="legend">{groupLabel}</FormLabel>
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

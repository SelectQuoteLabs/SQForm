import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import {useFormikContext} from 'formik';
import SQFormCheckboxGroupItem from './SQFormCheckboxGroupItem';
import SQFormCheckbox from './SQFormCheckbox';
import {useForm} from './useForm';
import type {CheckboxProps, GridSize} from '@material-ui/core';

interface CheckboxOption {
  label: string;
  value: string | boolean | number;
  isDisabled?: boolean;
  inputProps?: CheckboxProps;
}

export interface SQFormCheckboxGroupProps {
  /** Name of the checkbox group */
  name: string;
  /** Label to display above the group */
  groupLabel: string;
  /** Function to call on value change */
  onChange?: CheckboxProps['onChange'];
  /** Whether to display the group in a row */
  shouldDisplayInRow?: boolean;
  /** Whether to display the select all checkbox */
  shouldUseSelectAll?: boolean;
  /** Size of the input given full-width is 12. */
  size?: GridSize;
  /** Children must be an array of object with checkbox label and value information */
  children: CheckboxOption[];
}

function SQFormCheckboxGroup({
  name,
  groupLabel,
  onChange,
  shouldDisplayInRow = false,
  shouldUseSelectAll = false,
  size = 'auto',
  children,
}: SQFormCheckboxGroupProps): JSX.Element {
  const {
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleChange, handleBlur, HelperTextComponent},
  } = useForm<CheckboxOption['value'][], React.ChangeEvent<HTMLInputElement>>({
    name,
    onChange,
  });

  const {setFieldValue} = useFormikContext();

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.checked) {
      setFieldValue(name, []);
      return;
    }

    const enabledGroupValues = children.reduce(
      (acc: string[], checkboxOption: CheckboxOption) => {
        const {value, isDisabled} = checkboxOption;
        if (!isDisabled) {
          return [...acc, String(value)];
        }

        return acc;
      },
      []
    );
    setFieldValue(name, enabledGroupValues);
  };

  const childrenToCheckboxGroupItems = () => {
    const providedCheckboxItems = children.map((checkboxOption) => {
      const {label, value, isDisabled, inputProps} = checkboxOption;

      return (
        <SQFormCheckboxGroupItem
          groupName={name}
          label={label}
          value={value}
          isRowDisplay={shouldDisplayInRow}
          onChange={handleChange}
          isDisabled={isDisabled}
          inputProps={inputProps}
          key={`SQFormCheckboxGroupItem_${value}`}
        />
      );
    });
    if (shouldUseSelectAll) {
      return [
        <SQFormCheckbox
          name={`${name}SelectAll`}
          label="All"
          onChange={handleSelectAllChange}
          key={`${name}_selectAll`}
        />,
        ...providedCheckboxItems,
      ];
    }

    return providedCheckboxItems;
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
        <FormGroup row={shouldDisplayInRow}>
          {childrenToCheckboxGroupItems()}
        </FormGroup>
        <FormHelperText>{HelperTextComponent}</FormHelperText>
      </FormControl>
    </Grid>
  );
}

export default SQFormCheckboxGroup;

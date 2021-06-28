import React from 'react';
import {useFormikContext} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import {CheckboxProps} from '@material-ui/core';
import SQFormCheckboxGroupItem from './SQFormCheckboxGroupItem';
import SQFormCheckbox from './SQFormCheckbox';
import {useForm} from './useForm';

interface CheckboxOption {
  label: string;
  value: unknown;
  isDisabled?: boolean;
  inputProps?: CheckboxProps;
}

interface SQFormCheckboxGroupProps {
  /** Name of the checkbox group */
  name: string;
  /** Label to display above the group */
  groupLabel: string;
  /** Whether this a selection in this group is required */
  isRequired?: boolean;
  /** Function to call on value change */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether to display the group in a row */
  shouldDisplayInRow?: boolean;
  /** Whether to display the select all checkbox */
  shouldUseSelectAll?: boolean;
  /** Size of the input given full-width is 12. */
  size?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Children must be an array of object with checkbox label and value information */
  children: CheckboxOption[];
}

function SQFormCheckboxGroup({
  name,
  groupLabel,
  isRequired = false,
  onChange,
  shouldDisplayInRow = false,
  shouldUseSelectAll = false,
  size = 'auto',
  children
}: SQFormCheckboxGroupProps): JSX.Element {
  const {
    fieldState: {isFieldError},
    fieldHelpers: {handleChange, handleBlur, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onChange
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
    const providedCheckboxItems = children.map(checkboxOption => {
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
        ...providedCheckboxItems
      ];
    }

    return providedCheckboxItems;
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
        <FormGroup row={shouldDisplayInRow}>
          {childrenToCheckboxGroupItems()}
        </FormGroup>
        <FormHelperText>{HelperTextComponent}</FormHelperText>
      </FormControl>
    </Grid>
  );
}

export default SQFormCheckboxGroup;
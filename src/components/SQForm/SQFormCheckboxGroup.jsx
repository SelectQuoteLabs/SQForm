import React from 'react';
import PropTypes from 'prop-types';
import {useFormikContext} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import SQFormCheckboxGroupItem from './SQFormCheckboxGroupItem';
import SQFormCheckbox from './SQFormCheckbox';
import {useForm} from './useForm';

function SQFormCheckboxGroup({
  name,
  groupLabel,
  onChange,
  shouldDisplayInRow = false,
  shouldUseSelectAll = false,
  size = 'auto',
  children,
}) {
  const {
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleChange, handleBlur, HelperTextComponent},
  } = useForm({name, onChange});

  const {setFieldValue} = useFormikContext();

  const handleSelectAllChange = (event) => {
    if (!event.target.checked) {
      setFieldValue(name, []);
      return;
    }

    const enabledGroupValues = children.reduce((acc, checkboxOption) => {
      const {value, isDisabled} = checkboxOption;
      if (!isDisabled) {
        return [...acc, value.toString()];
      }

      return acc;
    }, []);
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

SQFormCheckboxGroup.propTypes = {
  /** Name of the checkbox group */
  name: PropTypes.string.isRequired,
  /** Label to display above the group */
  groupLabel: PropTypes.string.isRequired,
  /** Function to call on value change */
  onChange: PropTypes.func,
  /** Whether to display the group in a row */
  shouldDisplayInRow: PropTypes.bool,
  /** Whether to display the select all checkbox */
  shouldUseSelectAll: PropTypes.bool,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Children must be an array of object with checkbox label and value information */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      isDisabled: PropTypes.bool,
      inputProps: PropTypes.object,
    }).isRequired
  ).isRequired,
};

export default SQFormCheckboxGroup;

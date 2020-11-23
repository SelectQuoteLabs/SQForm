import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import {useSQFormContext} from '../../../src';

import {useForm} from './useForm';

function SQFormMultiSelect({
  children,
  isDisabled = false,
  isRequired = false,
  label,
  name,
  size = 'auto',
  useSelectAll = true
}) {
  const {setFieldValue} = useSQFormContext();
  const {
    formikField: {field},
    fieldState: {isFieldError},
    fieldHelpers: {handleBlur, HelperTextComponent}
  } = useForm({
    name,
    isRequired
  });
  const labelID = label.toLowerCase();

  const handleMultiSelectChange = event => {
    const selectAllWasChecked = event.target.value.includes('ALL');
    const selectNoneWasChecked = event.target.value.includes('NONE');

    const values = selectAllWasChecked
      ? children.map(option => option.value)
      : selectNoneWasChecked
      ? []
      : event.target.value;

    setFieldValue(name, values);
  };

  return (
    <Grid item sm={size}>
      <InputLabel id={labelID}>{label}</InputLabel>
      <Select
        multiple
        input={<Input disabled={isDisabled} name={name} />}
        value={field.value}
        onBlur={handleBlur}
        onChange={handleMultiSelectChange}
        fullWidth={true}
        labelId={labelID}
        renderValue={selected => selected.join(', ')}
      >
        {useSelectAll && (
          <MenuItem
            value={children.length === field.value.length ? 'NONE' : 'ALL'}
          >
            <Checkbox checked={children.length === field.value.length} />
            <ListItemText primary="Select All" />
          </MenuItem>
        )}
        {children.map(option => {
          return (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={field.value.includes(option.value)} />
              <ListItemText primary={option.value} />
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error={isFieldError} required={isRequired}>
        {HelperTextComponent}
      </FormHelperText>
    </Grid>
  );
}

SQFormMultiSelect.propTypes = {
  /** Multiselect options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** Name identifier of the input field */
  name: PropTypes.string.isRequired,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** This property will allow the end user to check a "Select All" box */
  useSelectAll: PropTypes.bool
};

export default SQFormMultiSelect;

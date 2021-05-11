import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from './useForm';

const useStyles = makeStyles(theme => ({
  checkboxGroupItem: {
    marginBottom: theme.spacing(1.5)
  },
  rowDisplay: {
    marginRight: theme.spacing(3.75)
  }
}));

function SQFormCheckboxGroupItem({
  groupName,
  label,
  value,
  onChange,
  isRowDisplay = false,
  isDisabled = false,
  inputProps = {}
}) {
  const {
    formikField: {field},
    fieldHelpers: {handleChange}
  } = useForm({
    name: groupName,
    isRequired: false,
    onChange
  });

  const classes = useStyles();

  const isChecked = React.useMemo(() => {
    if (Array.isArray(field.value)) {
      return field.value.includes(value.toString());
    }

    return field.value;
  }, [value, field]);

  return (
    <FormControlLabel
      className={`
        ${classes.checkboxGroupItem}
        ${isRowDisplay ? classes.rowDisplay : ''}
      `}
      label={label}
      control={
        <Checkbox
          name={groupName}
          checked={isChecked}
          value={value}
          color="primary"
          disabled={isDisabled}
          onChange={handleChange}
          {...inputProps}
        />
      }
    />
  );
}

SQFormCheckboxGroupItem.propTypes = {
  /** The name of the group this checkbox is a part of */
  groupName: PropTypes.string.isRequired,
  /** Label for the checkbox */
  label: PropTypes.string.isRequired,
  /** Value for the checkbox */
  value: PropTypes.any.isRequired,
  /** Function to call when input value is changed */
  onChange: PropTypes.func.isRequired,
  /** Whether this group item is part of a group displayed in a row */
  isRowDisplay: PropTypes.bool,
  /** Whether the checkbox is disabled */
  isDisabled: PropTypes.bool,
  /** Props for the checkbox input */
  inputProps: PropTypes.object
};

export default SQFormCheckboxGroupItem;

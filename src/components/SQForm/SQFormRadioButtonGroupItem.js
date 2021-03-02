import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  radioButton: {
    marginRight: 30
  }
});

function SQFormRadioButtonGroupItem({
  value,
  label,
  isDisabled = false,
  isRowDisplay = false,
  inputProps = {}
}) {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={isRowDisplay ? classes.radioButton : ''}
      value={value}
      label={label}
      control={<Radio disabled={isDisabled} {...inputProps} />}
    />
  );
}

SQFormRadioButtonGroupItem.propTypes = {
  /** Value of the radio button */
  value: PropTypes.any.isRequired,
  /** Label for the radio button */
  label: PropTypes.string.isRequired,
  /** Whether this radio button is disabled */
  isDisabled: PropTypes.bool,
  /** Whether the group this button is in is displayed in a row */
  isRowDisplay: PropTypes.bool,
  /** Props for the radio input */
  inputProps: PropTypes.object
};

export default SQFormRadioButtonGroupItem;

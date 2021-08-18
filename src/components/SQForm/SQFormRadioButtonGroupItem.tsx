import React from 'react';
import Radio from '@material-ui/core/Radio';
import {makeStyles} from '@material-ui/core/styles';
import {FormControlLabel, RadioProps} from '@material-ui/core';

interface SQFormRadioButtonGroupItemProps {
  /** Value of the radio button */
  value: string | boolean | number;
  /** Label for the radio button */
  label: string;
  /** Whether this radio button is disabled */
  isDisabled?: boolean;
  /** Whether the group this button is in is displayed in a row */
  isRowDisplay?: boolean;
  /** Props for the radio input */
  InputProps?: RadioProps;
}

const useStyles = makeStyles(theme => ({
  radioButton: {
    marginBottom: theme.spacing(1.5)
  },
  rowDisplay: {
    marginRight: theme.spacing(3.75)
  }
}));

function SQFormRadioButtonGroupItem({
  value,
  label,
  isDisabled = false,
  isRowDisplay = false,
  InputProps = {}
}: SQFormRadioButtonGroupItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={`
        ${classes.radioButton}
        ${isRowDisplay ? classes.rowDisplay : ''}
      `}
      value={value}
      label={label}
      control={<Radio disabled={isDisabled} {...InputProps} />}
    />
  );
}

export default SQFormRadioButtonGroupItem;

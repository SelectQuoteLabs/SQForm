import React from 'react';
import {FormControlLabel, Radio} from '@mui/material';
import type {RadioProps} from '@mui/material';

export type SQFormRadioButtonGroupItemProps = {
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
};

function SQFormRadioButtonGroupItem({
  value,
  label,
  isDisabled = false,
  isRowDisplay = false,
  InputProps = {},
}: SQFormRadioButtonGroupItemProps): JSX.Element {
  return (
    <FormControlLabel
      sx={(theme) => ({
        mb: theme.spacing(1.5),
        mr: isRowDisplay ? theme.spacing(3.75) : undefined,
      })}
      value={value}
      label={label}
      control={
        <Radio color="secondary" disabled={isDisabled} {...InputProps} />
      }
    />
  );
}

export default SQFormRadioButtonGroupItem;

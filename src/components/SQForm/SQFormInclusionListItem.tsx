import React from 'react';
import {Checkbox, FormControlLabel, Grid} from '@mui/material';
import {useForm} from './useForm';
import type {BaseFieldProps} from '../../types';

export type SQFormInclusionListItemProps = BaseFieldProps & {
  /** evaluation of whether the box should be checked */
  isChecked: boolean;
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Custom onChange event callback */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SQFormInclusionListItem({
  isChecked = false,
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto',
}: SQFormInclusionListItemProps): JSX.Element {
  const {
    fieldHelpers: {handleChange},
  } = useForm({
    name,
    onChange,
  });

  return (
    <Grid item={true} sm={size}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            disabled={isDisabled}
            name={name}
            onChange={handleChange}
          />
        }
        label={label}
      />
    </Grid>
  );
}

export default SQFormInclusionListItem;

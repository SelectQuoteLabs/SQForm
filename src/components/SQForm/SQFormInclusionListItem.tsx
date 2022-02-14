import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import type {BaseFieldProps} from '../../types';

import {useForm} from './useForm';

export interface SQFormInclusionListItemProps extends BaseFieldProps {
  /** evaluation of whether the box should be checked */
  isChecked: boolean;
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Custom onChange event callback */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
    <Grid item sm={size}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            color="primary"
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

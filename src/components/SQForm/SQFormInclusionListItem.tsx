import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import {useForm} from './useForm';

interface SQFormInclusionListItemProps {
  /** evaluation of whether the box should be checked */
  isChecked: boolean;
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Descriptive label text for the checkbox */
  label: string;
  /** name of the checkbox array in `initialValues` */
  name: string;
  /** Custom onChange event callback */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Size of the input given full-width is 12. */
  size?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

function SQFormInclusionListItem({
  isChecked = false,
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto'
}: SQFormInclusionListItemProps): JSX.Element {
  const {
    fieldHelpers: {handleChange}
  } = useForm({
    name,
    isRequired: false,
    onChange
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

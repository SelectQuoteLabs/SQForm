import React from 'react';
import {Checkbox, CheckboxProps} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import {useForm} from './useForm';

interface SQFormCheckboxProps {
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Descriptive label text for the checkbox */
  label: string;
  /** Unique name of the checkbox element */
  name: string;
  /** Custom onChange event callback */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Size of the input given full-width is 12. */
  size?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Any valid prop for material ui checkbox child component - https://material-ui.com/api/checkbox/#props */
  muiFieldProps?: CheckboxProps;
}

function SQFormCheckbox({
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto',
  muiFieldProps = {}
}: SQFormCheckboxProps): JSX.Element {
  const {
    formikField: {field},
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
            checked={field.value as boolean}
            color="primary"
            disabled={isDisabled}
            name={name}
            onChange={handleChange}
            {...muiFieldProps}
          />
        }
        label={label}
      />
    </Grid>
  );
}

export default SQFormCheckbox;

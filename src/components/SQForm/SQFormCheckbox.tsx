import React from 'react';
import {Checkbox, CheckboxProps} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import BaseFieldProps from '../../types/BaseFieldProps';

import {useForm} from './useForm';

interface SQFormCheckboxProps extends BaseFieldProps {
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Custom onChange event callback */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            checked={!!field.value}
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

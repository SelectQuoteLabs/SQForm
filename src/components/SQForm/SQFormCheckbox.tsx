import React from 'react';
import {Checkbox, FormControlLabel, Grid} from '@material-ui/core';
import {useForm} from './useForm';
import type {CheckboxProps} from '@material-ui/core';
import type {BaseFieldProps} from '../../types';

export type SQFormCheckboxProps = BaseFieldProps & {
  /** Disabled state of the checkbox */
  isDisabled?: boolean;
  /** Custom onChange event callback */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Any valid prop for material ui checkbox child component - https://material-ui.com/api/checkbox/#props */
  muiFieldProps?: CheckboxProps;
};

function SQFormCheckbox({
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto',
  muiFieldProps = {},
}: SQFormCheckboxProps): JSX.Element {
  const {
    formikField: {field},
    fieldHelpers: {handleChange},
  } = useForm({name, onChange});

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

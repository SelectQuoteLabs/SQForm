import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import {useForm} from './useForm';

function SQFormInclusionListItem({
  isChecked = false,
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto'
}) {
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

SQFormInclusionListItem.propTypes = {
  /** evaluation of whether the box should be checked */
  isChecked: PropTypes.bool.isRequired,
  /** Disabled state of the checkbox */
  isDisabled: PropTypes.bool,
  /** Descriptive label text for the checkbox */
  label: PropTypes.string.isRequired,
  /** name of the checkbox array in `initialValues` */
  name: PropTypes.string.isRequired,
  /** Custom onChange event callback */
  onChange: PropTypes.func.isRequired,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

export default SQFormInclusionListItem;

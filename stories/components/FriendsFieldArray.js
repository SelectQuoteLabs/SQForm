import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {IconButton} from 'scplus-shared-components';

import {SQFieldArray} from '../../src';

/**
 * Example Component using the FieldArray from Formik
 * https://formik.org/docs/api/fieldarray
 * */
function FriendsFieldArray({name}) {
  return (
    <SQFieldArray name={name}>
      {arrayHelpers => {
        const {friends} = arrayHelpers.form.values;
        return (
          <Grid container spacing={4}>
            {friends?.length
              ? friends.map((friend, index) => {
                  return (
                    <>
                      <Grid item sm={1}>
                        <Typography variant="body2">{friend}</Typography>
                      </Grid>
                      <Grid item sm={11}>
                        <IconButton
                          title="Remove Friend"
                          isIconTeal={true}
                          IconComponent={RemoveCircleOutlineIcon}
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        />
                      </Grid>
                    </>
                  );
                })
              : undefined}
            <button type="button" onClick={() => arrayHelpers.push('Laura')}>
              + Add friend
            </button>
          </Grid>
        );
      }}
    </SQFieldArray>
  );
}

FriendsFieldArray.propTypes = {
  /** The name or path to the relevant key in Formik values */
  name: PropTypes.string.isRequired
};

export default FriendsFieldArray;

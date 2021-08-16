import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {IconButton} from 'scplus-shared-components';

import {SQFieldArray} from '../../src';

interface FriendsFieldArrayProps {
  /** The name or path to the relevant key in Formik values */
  name: string;
}
/**
 * Example Component using the FieldArray from Formik
 * https://formik.org/docs/api/fieldarray
 * */
function FriendsFieldArray({name}: FriendsFieldArrayProps): React.ReactElement {
  return (
    <SQFieldArray name={name}>
      {(arrayHelpers) => {
        const {friends}: {friends: string[]} = arrayHelpers.form.values;
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

export default FriendsFieldArray;

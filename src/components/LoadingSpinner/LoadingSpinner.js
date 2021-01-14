import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import LoadingIcon from '../LoadingIcon';
import {Grid, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    animation: '0.45s fade-in',
    alignItems: 'center'
  }
});

function LoadingSpinner({message}) {
  const classes = useStyles();

  return (
    <Grid classes={classes}>
      <LoadingIcon height="10rem" />
      {message && <Typography variant="caption">{message}</Typography>}
    </Grid>
  );
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string
};

export default LoadingSpinner;

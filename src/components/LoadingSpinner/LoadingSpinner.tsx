import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import LoadingIcon from '../LoadingIcon';

type LoadingSpinnerProps = {
  message?: string;
};

const gridStyles = makeStyles({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    animation: '0.45s fade-in',
    alignItems: 'center',
  },
});

const typographyStyles = makeStyles({
  root: {
    paddingTop: '10px',
  },
});

function LoadingSpinner({message}: LoadingSpinnerProps): JSX.Element {
  const gridClasses = gridStyles();
  const typographyClasses = typographyStyles();

  return (
    <Grid classes={gridClasses}>
      <LoadingIcon height="10rem" />
      {message && (
        <Typography classes={typographyClasses} variant="subtitle1">
          {message}
        </Typography>
      )}
    </Grid>
  );
}

export default LoadingSpinner;

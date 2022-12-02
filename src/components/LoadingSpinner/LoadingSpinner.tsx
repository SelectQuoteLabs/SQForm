import React from 'react';
import {Grid, Typography} from '@mui/material';
import LoadingIcon from '../LoadingIcon';

type LoadingSpinnerProps = {
  message?: string;
};

const gridStyles = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  animation: '0.45s fade-in',
  alignItems: 'center',
};

function LoadingSpinner({message}: LoadingSpinnerProps): JSX.Element {
  return (
    <Grid sx={gridStyles}>
      <LoadingIcon height="10rem" />
      {message && (
        <Typography sx={{pt: '10px'}} variant="subtitle1">
          {message}
        </Typography>
      )}
    </Grid>
  );
}

export default LoadingSpinner;

import React from 'react';
import {Paper, makeStyles} from '@material-ui/core';

type TopSubHeaderProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
      marginBottom: `${theme.spacing(4)}px`,
    },
  };
});

function TopSubHeader({children}: TopSubHeaderProps): React.ReactElement {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      {children}
    </Paper>
  );
}

export default TopSubHeader;

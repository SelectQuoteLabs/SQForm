import React from 'react';
import {Paper} from '@mui/material';

type TopSubHeaderProps = {
  children: React.ReactNode;
};

function TopSubHeader({children}: TopSubHeaderProps): React.ReactElement {
  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        p: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
        mb: `${theme.spacing(4)}`,
      })}
    >
      {children}
    </Paper>
  );
}

export default TopSubHeader;

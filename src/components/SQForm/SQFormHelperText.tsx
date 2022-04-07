import React from 'react';
import {useFormikContext} from 'formik';
import {Grid, Typography, makeStyles} from '@material-ui/core';
import {
  NewReleases as WarningIcon,
  VerifiedUser as VerifiedIcon,
  Report as FailIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      padding: `0 ${theme.spacing(2)}px`,
    },
    icon: {
      marginRight: theme.spacing(1),
      fontSize: '24px',
    },
    valid: {
      color: 'var(--color-textSuccessGreen)',
    },
    error: {
      color: 'var(--color-brightYellow)',
    },
    fail: {
      color: 'var(--color-textErrorRed)',
    },
  };
});

const helperStateMap = {
  fail: 'fail',
  error: 'error',
  valid: 'valid',
};

export interface SQFormHelperTextProps {
  isFailedState?: boolean;
  errorText?: string;
  failText?: string;
  validText?: string;
}

function SQFormHelperText({
  isFailedState = false,
  errorText = 'There is an error in the form',
  failText = 'Cannot proceed',
  validText = 'All fields completed',
}: SQFormHelperTextProps): JSX.Element {
  const classes = useStyles();
  const {isValid} = useFormikContext();
  const {fail, error, valid} = helperStateMap;

  const getHelperTextType = () => {
    switch (true) {
      case isFailedState:
        return 'fail';
      case isValid:
        return 'valid';
      default:
        return 'error';
    }
  };

  const helperTextType: keyof typeof helperStateMap = getHelperTextType();

  const getHelperTextIcon = () => {
    switch (helperTextType) {
      case 'fail':
        return FailIcon;
      case 'valid':
        return VerifiedIcon;
      default:
        return WarningIcon;
    }
  };

  const helperTextMap = {
    [valid]: validText,
    [error]: errorText,
    [fail]: failText,
  };

  const Icon = getHelperTextIcon();

  return (
    <Grid
      container
      justifyContent="flex-end"
      wrap="nowrap"
      alignItems="center"
      className={`${classes.wrapper} ${classes[helperTextType]}`}
    >
      <Icon className={classes.icon} />
      <Typography variant="h6">{helperTextMap[helperTextType]}</Typography>
    </Grid>
  );
}

export default SQFormHelperText;

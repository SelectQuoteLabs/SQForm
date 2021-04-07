import React from 'react';
import CheckMarkIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/SnackBar';
import Alert from '@material-ui/lab/Alert';
import {SQForm, SQFormIconButton} from '../../src';
import Slide from '@material-ui/core/Slide';

export const SQFormStoryWrapper = ({
  children,
  initialValues,
  validationSchema,
  muiGridProps,
  showSubmit = true
}) => {
  const [value, setValue] = React.useState('');
  const [snackBarIsOpen, setSnackBarIsOpen] = React.useState(false);

  const handleSubmit = values => {
    setValue(values);
    setSnackBarIsOpen(true);
  };

  return (
    <>
      <SQForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        muiGridProps={{wrap: 'nowrap', ...muiGridProps}}
        onSubmit={handleSubmit}
      >
        {children}
        {showSubmit && (
          <Grid item size={2} style={{alignSelf: 'center'}}>
            <SQFormIconButton IconComponent={CheckMarkIcon} />
          </Grid>
        )}
      </SQForm>
      {showSubmit && (
        <SnackBar
          open={snackBarIsOpen}
          autoHideDuration={5000}
          TransitionComponent={Slide}
          onClose={() => setSnackBarIsOpen(false)}
        >
          <Alert severity="success" variant="filled">
            <pre style={{fontSize: '1rem', margin: 0}}>
              {JSON.stringify(value, null, 2)}
            </pre>
          </Alert>
        </SnackBar>
      )}
    </>
  );
};

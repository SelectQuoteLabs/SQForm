import React from 'react';
import Grid from '@material-ui/core/Grid';
import {SQForm, SQFormButton} from '../../src';
import {
  Snackbar,
  SnackbarProvider,
  useSnackbar,
} from 'scplus-shared-components';

export function SQFormStoryWrapper({
  children,
  initialValues,
  validationSchema,
  muiGridProps,
  showSubmit = true,
}) {
  return (
    <SnackbarProvider>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        muiGridProps={muiGridProps}
        showSubmit={showSubmit}
      >
        {children}
      </Form>
    </SnackbarProvider>
  );
}

function Form({
  children,
  initialValues,
  validationSchema,
  muiGridProps,
  showSubmit = true,
}) {
  const [value, setValue] = React.useState('');

  const [snackbarState, {snackbar, closeSnackBar}] = useSnackbar();
  const handleSubmit = (values) => {
    setValue(values);
  };

  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      snackbar.success(
        <pre style={{fontSize: '14px', margin: 0}}>
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
  }, [snackbar, value]);

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
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        )}
      </SQForm>
      <Snackbar snackbarState={snackbarState} closeSnackBar={closeSnackBar} />
    </>
  );
}

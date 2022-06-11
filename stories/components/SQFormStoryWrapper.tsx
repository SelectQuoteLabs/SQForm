import React from 'react';
import type {AnyObjectSchema} from 'yup';
import {Grid} from '@material-ui/core';
import {SQForm, SQFormButton} from '../../src';
import {
  Snackbar,
  SnackbarProvider,
  useSnackbar,
} from 'scplus-shared-components';
import type {GridProps} from '@material-ui/core';
import type {FormikValues} from 'formik';

export type SQFormStoryWrapperProps = {
  children: React.ReactNode;
  initialValues: FormikValues;
  validationSchema?: AnyObjectSchema;
  muiGridProps?: GridProps;
  showSubmit?: boolean;
};

export function SQFormStoryWrapper({
  children,
  initialValues,
  validationSchema,
  muiGridProps,
  showSubmit = true,
}: SQFormStoryWrapperProps): React.ReactElement {
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
}: SQFormStoryWrapperProps): React.ReactElement {
  const [value, setValue] = React.useState({});

  const [snackbarState, {snackbar, closeSnackBar}] = useSnackbar();
  const handleSubmit = (values: FormikValues) => {
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
          <Grid item={true} sm={2} style={{alignSelf: 'center'}}>
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        )}
      </SQForm>
      <Snackbar snackbarState={snackbarState} closeSnackBar={closeSnackBar} />
    </>
  );
}

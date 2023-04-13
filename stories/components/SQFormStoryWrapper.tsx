import React from 'react';
import {Grid} from '@mui/material';
import {SQForm, SQFormButton} from '../../src';
import {
  Snackbar,
  SnackbarProvider,
  useSnackbar,
} from 'scplus-shared-components';
import type {AnyObjectSchema} from 'yup';
import type {GridProps} from '@mui/material';
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

  const [_snackbarStateContext, snackbarDispatchContext] = useSnackbar();
  const {snackbar} = snackbarDispatchContext || {};
  const handleSubmit = (values: FormikValues) => {
    setValue(values);
  };

  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      snackbar?.success(JSON.stringify(value, null, 2));
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
      <Snackbar />
    </>
  );
}

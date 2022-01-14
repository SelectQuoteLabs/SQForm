import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Formik, Form} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {object as YupObject, setLocale} from 'yup';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';
import type {GridProps} from '@material-ui/core';
import type {FormikHelpers, FormikValues} from 'formik';
import type {ObjectShape} from 'yup/lib/object';

setLocale({
  mixed: {
    required: 'Required',
  },
});

interface SQFormProps<Values> {
  /** Form Input(s) */
  children: React.ReactNode;
  /** Bool to pass through to Formik. https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize?: boolean;
  /** Form Entity Object */
  initialValues: Record<string, Values>;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
  /**
   * Form Submission Handler | @typedef onSubmit: (values: Values, formikBag: FormikBag) => void | Promise<any>
   * IMPORTANT: If onSubmit is async, then Formik will automatically set isSubmitting to false on your behalf once it has resolved.
   * This means you do NOT need to call formikBag.setSubmitting(false) manually.
   * However, if your onSubmit function is synchronous, then you need to call setSubmitting(false) on your own.
   *
   * https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany
   * */
  onSubmit: (
    values: Record<string, Values>,
    formikBag: FormikHelpers<FormikValues>
  ) => void | Promise<unknown>;
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema?: ObjectShape;
}

function SQForm<Values>({
  children,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  onSubmit,
  validationSchema,
}: SQFormProps<Values>): JSX.Element {
  const validationYupSchema = React.useMemo(() => {
    if (!validationSchema) return;

    return YupObject().shape(validationSchema);
  }, [validationSchema]);

  const initialErrors = useInitialRequiredErrors(
    validationSchema,
    initialValues
  );

  // HACK: This is a workaround for: https://github.com/mui-org/material-ui-pickers/issues/2112
  // Remove this reset handler when the issue is fixed.
  const handleReset = () => {
    document &&
      document.activeElement &&
      (document.activeElement as HTMLElement).blur();
  };

  const handleSubmit = useDebouncedCallback(
    (
      values: Record<string, Values>,
      formikHelpers: FormikHelpers<FormikValues>
    ) => onSubmit(values, formikHelpers),
    500,
    {leading: true, trailing: false}
  );

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialErrors={initialErrors}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onReset={handleReset}
      validationSchema={validationYupSchema}
      validateOnMount={true}
    >
      {(_props) => {
        return (
          <Form>
            <Grid
              {...muiGridProps}
              container
              spacing={muiGridProps.spacing ?? 2}
            >
              {children}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SQForm;

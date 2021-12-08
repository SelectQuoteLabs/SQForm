import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Formik, Form} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {object as YupObject, setLocale} from 'yup';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';

setLocale({
  mixed: {
    required: 'Required'
  }
});

function SQForm({
  children,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  onSubmit,
  validationSchema
}) {
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
    document && document.activeElement && document.activeElement.blur();
  };

  const handleSubmit = useDebouncedCallback(
    (...args) => onSubmit(...args),
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
      {_props => {
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

SQForm.propTypes = {
  /** Form Input(s) */
  children: PropTypes.node.isRequired,
  /** Bool to pass through to Formik. https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize: PropTypes.bool,
  /** Form Entity Object */
  initialValues: PropTypes.object.isRequired,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object,
  /**
   * Form Submission Handler | @typedef onSubmit: (values: Values, formikBag: FormikBag) => void | Promise<any>
   * IMPORTANT: If onSubmit is async, then Formik will automatically set isSubmitting to false on your behalf once it has resolved.
   * This means you do NOT need to call formikBag.setSubmitting(false) manually.
   * However, if your onSubmit function is synchronous, then you need to call setSubmitting(false) on your own.
   *
   * https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany
   * */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema: PropTypes.object
};

export default SQForm;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Formik, Form} from 'formik';
import SQFormButton from '../SQForm/SQFormButton';

const useStyles = makeStyles(() => {
  return {
    form: {
      height: '100%',
      width: '100%'
    },
    card: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `'header' 'content' 'footer'`,
      height: '100%'
    },
    cardHeader: {
      gridArea: 'header',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      padding: '24px 32px'
    },
    cardContent: {
      gridArea: 'content',
      overflowY: 'auto'
    },
    cardFooter: {
      gridArea: 'footer',
      display: 'flex',
      justifyContent: 'space-between'
    }
  };
});

function SQFormScrollableCard({
  children,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  onSubmit,
  title,
  validationSchema
}) {
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {() => {
        return (
          <Form className={classes.form}>
            <Card
              raised={true}
              elevation={1}
              square={true}
              className={classes.card}
            >
              <CardHeader
                title={title}
                className={classes.cardHeader}
                titleTypographyProps={{variant: 'h4', style: {fontWeight: 200}}}
              />
              <CardContent className={classes.cardContent}>
                <Grid
                  {...muiGridProps}
                  container
                  spacing={muiGridProps.spacing ?? 2}
                >
                  {children}
                </Grid>
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <SQFormButton type="reset" title="Reset Form">
                  Reset
                </SQFormButton>
                {/* TODO: InfoText goes here */}
                <SQFormButton>Submit</SQFormButton>
              </CardActions>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}

SQFormScrollableCard.propTypes = {
  /** Form related Field(s) and components */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  /** Reinitialize form values when props change - https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize: PropTypes.bool,
  /** Form Entity Object aka initial values of the form */
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
  /** The Title for the Header component */
  title: PropTypes.string.isRequired,
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema: PropTypes.object
};

export default SQFormScrollableCard;

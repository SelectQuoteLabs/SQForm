import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  makeStyles
} from '@material-ui/core';
import {Formik, Form} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import SQFormButton from '../SQForm/SQFormButton';
import SQFormHelperText from '../SQForm/SQFormHelperText';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';

const useStyles = makeStyles(theme => {
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
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
    },
    cardContent: {
      gridArea: 'content',
      overflowY: 'auto',
      padding: `${theme.spacing(2)}px`
    },
    childrenContainer: {
      width: 'auto',
      margin: ({hasSubHeader}) => {
        return hasSubHeader ? `${theme.spacing(2)}px ${theme.spacing(4)}px` : 0;
      }
    },
    cardFooter: {
      gridArea: 'footer',
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
    }
  };
});

function SQFormScrollableCard({
  children,
  enableReinitialize = false,
  height,
  helperErrorText,
  helperFailText,
  helperValidText,
  initialValues,
  isDisabled = false,
  isFailedState = false,
  isSelfBounding,
  muiGridProps = {},
  onSubmit,
  resetButtonText = 'Reset',
  shouldRenderHelperText = true,
  shouldRequireFieldUpdates = false,
  submitButtonText = 'Submit',
  SubHeaderComponent,
  title,
  validationSchema,
  isHeaderDisabled = false
}) {
  const hasSubHeader = Boolean(SubHeaderComponent);

  const validationYupSchema = React.useMemo(() => {
    if (!validationSchema) return;

    return Yup.object().shape(validationSchema);
  }, [validationSchema]);

  const initialErrors = useInitialRequiredErrors(
    validationSchema,
    initialValues
  );

  const classes = useStyles({hasSubHeader});

  const handleSubmit = useDebouncedCallback(
    (...args) => onSubmit(...args),
    500,
    {leading: true, trailing: false}
  );

  const formattedTitle = React.useMemo(() => title.replace(/\s/g, '-'), [
    title
  ]);

  const [calculatedHeight, setCalculatedHeight] = React.useState(0);

  React.useEffect(() => {
    const currentElement = document.getElementById(
      `sqform-scrollable-card-id-${formattedTitle}`
    );

    const topOffset = currentElement?.getBoundingClientRect().top;
    const offsetBasedHeight = `calc(100vh - ${topOffset}px - 24px)`;

    const parentHeight = currentElement.parentElement.clientHeight;
    const parentTopOffset = currentElement.parentElement.getBoundingClientRect()
      .top;
    const topDifferential = topOffset - parentTopOffset;
    const maxOffsetBasedHeight = `calc(${parentHeight}px - ${topDifferential}px)`;

    const calculatedHeight = `min(${offsetBasedHeight}, ${maxOffsetBasedHeight})`;

    setCalculatedHeight(calculatedHeight);
  }, [formattedTitle]);

  const heightToUse = height || (isSelfBounding && calculatedHeight) || '100%';

  return (
    <div
      id={`sqform-scrollable-card-id-${formattedTitle}`}
      style={{height: heightToUse}}
    >
      <Formik
        enableReinitialize={enableReinitialize}
        initialErrors={initialErrors}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationYupSchema}
        validateOnMount={true}
      >
        {_props => {
          return (
            <Form className={classes.form}>
              <Card
                raised={true}
                elevation={1}
                square={true}
                className={classes.card}
              >
                {!isHeaderDisabled && (
                  <CardHeader
                    title={title}
                    className={classes.cardHeader}
                    titleTypographyProps={{variant: 'h4'}}
                  />
                )}

                <CardContent className={classes.cardContent}>
                  {SubHeaderComponent}
                  <Grid
                    {...muiGridProps}
                    container
                    spacing={muiGridProps.spacing ?? 2}
                    className={classes.childrenContainer}
                  >
                    {children}
                  </Grid>
                </CardContent>
                <CardActions className={classes.cardFooter}>
                  <SQFormButton type="reset" title="Reset Form">
                    {resetButtonText}
                  </SQFormButton>
                  {shouldRenderHelperText && (
                    <SQFormHelperText
                      isFailedState={isFailedState}
                      errorText={helperErrorText}
                      failText={helperFailText}
                      validText={helperValidText}
                    />
                  )}
                  <SQFormButton
                    isDisabled={isDisabled}
                    shouldRequireFieldUpdates={shouldRequireFieldUpdates}
                  >
                    {submitButtonText}
                  </SQFormButton>
                </CardActions>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

SQFormScrollableCard.propTypes = {
  /** Form related Field(s) and components */
  children: PropTypes.node.isRequired,
  /** Reinitialize form values when props change - https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize: PropTypes.bool,
  /** Number overriding the height of the component */
  height: PropTypes.number,
  /** Helper text to display in the Footer when the Form is in an Error state */
  helperErrorText: PropTypes.string,
  /** Helper text to display in the Footer when the Form is in a Failure state */
  helperFailText: PropTypes.string,
  /** Helper text to display in the Footer when the Form is in a Valid state */
  helperValidText: PropTypes.string,
  /** Form Entity Object aka initial values of the form */
  initialValues: PropTypes.object.isRequired,
  /** Imperatively disable the Form Submit button */
  isDisabled: PropTypes.bool,
  /** Override the failure/success state of the form's footer helper text. Default: false */
  isFailedState: PropTypes.bool,
  /** Boolean to determine whether the Card should determine it's own height or use 100% of its parent's height. */
  isSelfBounding: PropTypes.bool,
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
  /** Label text for the reset button */
  resetButtonText: PropTypes.string,
  /** Conditionally the render of the form's footer helper text. Default: true */
  shouldRenderHelperText: PropTypes.bool,
  /** Pass through to SQFormButton that determines if the button will disable based on form data */
  shouldRequireFieldUpdates: PropTypes.bool,
  /** Label text for the Submit button */
  submitButtonText: PropTypes.string,
  /** Component to render as the Subheader */
  SubHeaderComponent: PropTypes.element,
  /** The Title for the Header component */
  title: PropTypes.string,
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema: PropTypes.object,
  //** Boolean used to determine if title/header is enabled or disabled */
  isHeaderDisabled: PropTypes.bool
};

export default SQFormScrollableCard;

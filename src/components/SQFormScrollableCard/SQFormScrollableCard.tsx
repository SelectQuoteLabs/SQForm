import React from 'react';
import {Card, CardHeader, CardContent, CardActions, Grid} from '@mui/material';
import {Formik, Form} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import SQFormButton from '../SQForm/SQFormButton';
import SQFormHelperText from '../SQForm/SQFormHelperText';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';
import {HEADER_HEIGHT} from '../../utils/constants';
import type {GridProps} from '@mui/material';
import type {FormikHelpers, FormikValues} from 'formik';
import type {AnyObjectSchema} from 'yup';

export type SQFormScrollableCardProps<Values extends FormikValues> = {
  /** An object of css-in-js style properties to be passed and spread onto the `CardContent` component */
  cardContentStyles?: React.CSSProperties;
  /** Form related Field(s) and components */
  children: React.ReactNode;
  /** Reinitialize form values when props change - https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize?: boolean;
  /** Number overriding the height of the component */
  height?: React.CSSProperties['height'];
  /** Helper text to display in the Footer when the Form is in an Error state */
  helperErrorText?: string;
  /** Helper text to display in the Footer when the Form is in a Failure state */
  helperFailText?: string;
  /** Helper text to display in the Footer when the Form is in a Valid state */
  helperValidText?: string;
  /** Form Entity Object aka initial values of the form */
  initialValues: Values;
  /** Imperatively disable the Form Submit button */
  isDisabled?: boolean;
  /** Override the failure/success state of the form's footer helper text. Default: false */
  isFailedState?: boolean;
  /** Boolean to determine whether the Card should determine it's own height or use 100% of its parent's height. */
  isSelfBounding?: boolean;
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
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<unknown>;
  /** Label text for the reset button */
  resetButtonText?: string;
  /** Conditionally the render of the form's footer helper text. Default: true */
  shouldRenderHelperText?: boolean;
  /** Pass through to SQFormButton that determines if the button will disable based on form data */
  shouldRequireFieldUpdates?: boolean;
  /** Label text for the Submit button */
  submitButtonText?: string;
  /** Component to render as the Subheader */
  SubHeaderComponent?: React.ReactNode;
  /** The Title for the Header component */
  title?: string;
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema?: AnyObjectSchema;
  /** Boolean used to determine if title/header is enabled or disabled */
  isHeaderDisabled?: boolean;
  /** Boolean used to determine if the corners of the card should be squared */
  isSquareCorners?: boolean;
  /** The value for this card if used by SQFormScrollableCardsMenuWrapper */
  value?: string;
  /** The label to display for this card if used by SQFormScrollableCardsMenuWrapper */
  label?: string;
};

function SQFormScrollableCard<Values>({
  cardContentStyles = {},
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
  isHeaderDisabled = false,
  isSquareCorners = true,
}: SQFormScrollableCardProps<Values>): React.ReactElement {
  const hasSubHeader = Boolean(SubHeaderComponent);

  const initialErrors = useInitialRequiredErrors(
    validationSchema,
    initialValues
  );

  const handleSubmit = useDebouncedCallback(
    (formValues: Values, formikBag: FormikHelpers<Values>) =>
      onSubmit(formValues, formikBag),
    500,
    {leading: true, trailing: false}
  );

  const cardID = React.useMemo(() => {
    if (title) {
      return title.replace(/\s/g, '-');
    } else {
      // Ensures IDs are present if no title is given and are random
      // incase multiple SQFormScrollableCards exist in the dom
      // Statistically unique for the lifetime of the components
      return (Date.now() * Math.random()).toString();
    }
  }, [title]);

  const [calculatedHeight, setCalculatedHeight] =
    React.useState<React.CSSProperties['height']>(0);

  React.useEffect(() => {
    const currentElement = document.getElementById(
      `sqform-scrollable-card-id-${cardID}`
    );

    if (!currentElement?.parentElement) {
      return;
    }

    const topOffset = currentElement?.getBoundingClientRect().top;
    const offsetBasedHeight = `calc(100vh - ${topOffset}px - 24px)`;

    const parentHeight = currentElement.parentElement.clientHeight;
    const parentTopOffset =
      currentElement.parentElement.getBoundingClientRect().top;
    const topDifferential = topOffset - parentTopOffset;
    const maxOffsetBasedHeight = `calc(${parentHeight}px - ${topDifferential}px)`;

    const calculatedHeight = `min(${offsetBasedHeight}, ${maxOffsetBasedHeight})`;

    setCalculatedHeight(calculatedHeight);
  }, [cardID]);

  const heightToUse =
    height || (isSelfBounding && calculatedHeight ? calculatedHeight : '100%');

  return (
    <div
      id={`sqform-scrollable-card-id-${cardID}`}
      style={{height: heightToUse}}
    >
      <Formik
        enableReinitialize={enableReinitialize}
        initialErrors={initialErrors}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {(_props) => {
          return (
            <Form style={{height: '100%', width: '100%'}}>
              <Card
                raised={true}
                elevation={1}
                square={isSquareCorners}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridTemplateRows: 'auto 1fr auto',
                  gridTemplateAreas: `'header' 'content' 'footer'`,
                  height: '100%',
                }}
              >
                {!isHeaderDisabled && (
                  <CardHeader
                    title={title}
                    sx={(theme) => ({
                      gridArea: 'header',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
                      height: HEADER_HEIGHT, // overrides a scplus-shared-component theme hard coded height
                    })}
                    titleTypographyProps={{variant: 'h5'}}
                  />
                )}

                <CardContent
                  sx={(theme) => ({
                    gridArea: 'content',
                    overflowY: 'auto',
                    p: `${theme.spacing(2)}`,
                    ...cardContentStyles,
                    '& .MuiGrid-root.MuiGrid-item': {
                      p: theme.spacing(1),
                    },
                  })}
                >
                  {SubHeaderComponent}
                  <Grid
                    {...muiGridProps}
                    container={true}
                    spacing={muiGridProps.spacing ?? 2}
                    sx={(theme) => ({
                      width: 'auto',
                      m: hasSubHeader
                        ? `${theme.spacing(2)} ${theme.spacing(4)}`
                        : 0,
                    })}
                  >
                    {children}
                  </Grid>
                </CardContent>
                <CardActions
                  sx={(theme) => ({
                    gridArea: 'footer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
                    '& .MuiGrid-root.MuiGrid-container': {
                      p: `0 ${theme.spacing(2)}`,
                      ml: theme.spacing(1),
                    },
                  })}
                >
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

export default SQFormScrollableCard;

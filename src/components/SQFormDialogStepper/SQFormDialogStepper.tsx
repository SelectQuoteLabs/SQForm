import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Slide,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@material-ui/core';
import {Form, Formik, useFormikContext} from 'formik';
import {RoundedButton} from 'scplus-shared-components';
import LoadingSpinner from '../LoadingSpinner';
import type {TransitionProps} from '@material-ui/core/transitions';
import type {
  DialogProps,
  GridProps,
  DialogContentProps,
} from '@material-ui/core';
import type {AnyObjectSchema} from 'yup';
import type {FormikHelpers, FormikValues} from 'formik';

export interface SQFormDialogStepProps {
  /** The content to be rendered in the step body. */
  children?: JSX.Element | Array<JSX.Element>;
  /** Should the loading spinner be shown */
  isLoading?: boolean;
  /** Optional message to be added to the loading spinner */
  loadingMessage?: string;
  /** The label to display in the stepper */
  label?: string;
  /** Validation schema for this step */
  validationSchema?: AnyObjectSchema;
}

export function SQFormDialogStep({
  children,
  isLoading = false,
  loadingMessage = '',
}: SQFormDialogStepProps): JSX.Element {
  return isLoading ? (
    <LoadingSpinner message={loadingMessage} />
  ) : (
    <>{children}</>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<unknown, string>},
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    padding: 20,
    width: '100%',
    maxWidth: ({
      steps,
    }: {
      steps: Array<React.ReactChild | React.ReactFragment | React.ReactPortal>;
    }) => `${300 * steps.length}px`,
    '& svg': {
      fontSize: 30,
      '& text': {
        fontSize: 15,
        fontWeight: 600,
      },
    },
    '& span': {
      whiteSpace: 'nowrap',
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: '5px',
    },
  },
});

const useActionsStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 100%',
    padding: '16px 24px',
  },
});

const useStepperStyles = makeStyles({
  root: {
    padding: '1px',
    justifyContent: 'center',
  },
});

export interface SQFormDialogStepperProps<Values extends FormikValues> {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText?: string;
  /** The content to be rendered in the dialog body.  Will be an array of React elements. */
  children: Array<JSX.Element>;
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick?: boolean;
  /** Sets the dialog to the maxWidth. */
  fullWidth?: boolean;
  /** Disables the next/submit button */
  isNextDisabled?: boolean;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Allows the initial values to be updated after initial render */
  enableReinitialize?: boolean;
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: (
    event: Record<string, unknown>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  /** Callback function invoked when user clicks primary submit button */
  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => void;
  /** Title text at the top of the Dialog */
  title: string;
  /** Form Entity Object */
  initialValues: Values;
  /** Callback function that is called when a step is completed to pass back the current state values to the consumer */
  setValues?: (values: Values) => void;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
  /** Any prop from https://material-ui.com/api/dialog/#props */
  dialogProps?: DialogProps;
  /** Optional styling on the dialog */
  contentStyle?: DialogContentProps['style'];
}

export function SQFormDialogStepper<Values extends FormikValues>({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isOpen = false,
  isNextDisabled = false,
  maxWidth = 'sm',
  onClose,
  onSubmit,
  title,
  enableReinitialize = false,
  muiGridProps = {},
  dialogProps,
  setValues,
  fullWidth = true,
  contentStyle,
  initialValues,
  ...props
}: SQFormDialogStepperProps<Values>): JSX.Element {
  const steps = children;
  const [activeStep, setActiveStep] = React.useState(0);
  const currentChild = steps[activeStep];
  const [completed, setCompleted] = React.useState<number[]>([]);

  const validationSchema = currentChild.props.validationSchema || null;

  const classes = useStyles({steps});
  const actionsClasses = useActionsStyles();
  const stepperClasses = useStepperStyles();

  const isLastStep = React.useMemo(() => {
    return activeStep === steps.length - 1;
  }, [activeStep, steps]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setCompleted([...completed, activeStep]);
  };

  const handleStep = (step: number) => () => {
    if (completed.includes(step)) {
      setActiveStep(step);
    }
  };

  const handleSubmit = async (
    values: Values,
    helpers: FormikHelpers<Values>
  ) => {
    if (isLastStep) {
      await onSubmit(values, helpers);
    } else {
      setValues && setValues(values);
      handleNext();
    }
  };

  function SubmitButton() {
    const {errors, values, dirty} = useFormikContext<Record<string, unknown>>();

    const isButtonDisabled = React.useMemo(() => {
      if (isNextDisabled) {
        return true;
      }
      if (!validationSchema) {
        return false;
      }
      const currentStepKeys = Object.keys(validationSchema.fields);
      const stepValues = currentStepKeys.every((step) => {
        return !!values[step];
      });

      if (
        !stepValues ||
        currentStepKeys.some((step) => Object.keys(errors).includes(step)) ||
        !dirty
      ) {
        return true;
      }

      return false;
    }, [errors, values, dirty]);

    const primaryButtonText = isLastStep ? 'Submit' : 'Next';
    return (
      <RoundedButton
        type="submit"
        isDisabled={isButtonDisabled}
        title={primaryButtonText}
      >
        {primaryButtonText}
      </RoundedButton>
    );
  }

  const handleClose = (
    event: Record<string, unknown>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }

    onClose(event, reason);
  };

  return (
    <Formik
      {...props}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
    >
      {() => (
        <Dialog
          TransitionComponent={Transition}
          disableBackdropClick={disableBackdropClick}
          maxWidth={maxWidth}
          open={isOpen}
          onClose={handleClose}
          fullWidth={fullWidth}
          {...dialogProps}
        >
          <Form>
            <DialogTitle disableTypography={true}>
              <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <Divider />
            {steps.length > 1 && (
              <Grid container classes={stepperClasses}>
                <Stepper
                  activeStep={activeStep}
                  classes={classes}
                  alternativeLabel={true}
                >
                  {steps.map((child, index) => (
                    <Step key={`${child.props.label}-${index}`}>
                      <StepButton onClick={handleStep(index)}>
                        <Typography
                          variant="overline"
                          color={index === activeStep ? 'error' : 'initial'} // sets the color to orange if current step
                        >
                          {child?.props.label}
                        </Typography>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            )}
            <DialogContent
              dividers
              style={{
                paddingTop: '40px',
                paddingBottom: '40px',
                ...contentStyle,
              }}
            >
              <Grid
                {...muiGridProps}
                container
                spacing={muiGridProps.spacing ?? 3}
                justifyContent="center"
              >
                {currentChild}
              </Grid>
            </DialogContent>
            <DialogActions classes={actionsClasses}>
              <RoundedButton
                title={cancelButtonText}
                onClick={onClose}
                color="secondary"
                variant="outlined"
              >
                {cancelButtonText}
              </RoundedButton>
              <SubmitButton />
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
}

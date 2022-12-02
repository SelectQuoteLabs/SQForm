import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import {Form, Formik, useFormikContext} from 'formik';
import {RoundedButton} from 'scplus-shared-components';
import LoadingSpinner from '../LoadingSpinner';
import type {DialogProps, GridProps, DialogContentProps} from '@mui/material';
import type {AnyObjectSchema} from 'yup';
import type {FormikHelpers, FormikValues} from 'formik';
import type {TransitionProps} from '@mui/material/transitions';

export type SQFormDialogStepProps = {
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
};

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
  props: TransitionProps & {children: React.ReactElement<unknown, string>},
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useClasses = ({steps}: {steps: Array<JSX.Element>}) => ({
  root: {
    padding: '20px',
    width: '100%',
    maxWidth: `${300 * steps.length}px`,
    '& svg': {
      fontSize: 30,
      '& text': {
        fontSize: '15px',
        fontWeight: '600',
      },
    },
    '& span': {
      whiteSpace: 'nowrap',
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: '5px',
    },
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 100%',
    padding: '16px 24px',
  },
  stepper: {
    padding: '1px',
    justifyContent: 'center',
  },
  stepButton: (isActiveStep: boolean) => ({
    '& circle': {
      color: isActiveStep ? 'var(--color-spanishOrange)' : 'disabled',
    },
  }),
  stepText: (isActiveStep: boolean) => ({
    '& .MuiTypography-root': {
      fontSize: '12px',
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      color: isActiveStep ? 'var(--color-spanishOrange)' : 'disabled',
    },
  }),
});

export type SQFormDialogStepperProps<Values extends FormikValues> = {
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
};

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

  const classes = useClasses({steps});

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
    const {errors, dirty} = useFormikContext<Record<string, unknown>>();
    const isButtonDisabled = React.useMemo(() => {
      if (isNextDisabled) {
        return true;
      }
      if (!validationSchema) {
        return false;
      }
      const currentStepKeys = Object.keys(validationSchema.fields);

      if (
        currentStepKeys.some((step) => Object.keys(errors).includes(step)) ||
        !dirty
      ) {
        return true;
      }

      return false;
    }, [errors, dirty]);

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
      validateOnMount={true}
    >
      {() => (
        <Dialog
          TransitionComponent={Transition}
          maxWidth={maxWidth}
          open={isOpen}
          onClose={handleClose}
          fullWidth={fullWidth}
          {...dialogProps}
        >
          <Form>
            <DialogTitle>
              <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <Divider />
            {steps.length > 1 && (
              <Grid container={true} sx={classes.stepper}>
                <Stepper
                  activeStep={activeStep}
                  sx={classes.root}
                  alternativeLabel={true}
                >
                  {steps.map((child, index) => (
                    <Step
                      key={`${child.props.label}-${index}`}
                      sx={classes.stepButton(index === activeStep)}
                    >
                      <StepButton
                        onClick={handleStep(index)}
                        sx={classes.stepText(index === activeStep)}
                      >
                        <Typography variant="overline">
                          {child?.props.label}
                        </Typography>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            )}
            <DialogContent
              dividers={true}
              style={{
                paddingTop: '40px',
                paddingBottom: '40px',
                ...contentStyle,
              }}
            >
              <Grid
                container={true}
                spacing={muiGridProps.spacing ?? 3}
                justifyContent="center"
                {...muiGridProps}
              >
                {currentChild}
              </Grid>
            </DialogContent>
            <DialogActions sx={classes.action}>
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

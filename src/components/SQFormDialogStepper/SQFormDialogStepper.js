import React from 'react';
import PropTypes from 'prop-types';
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
  Typography
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import * as Yup from 'yup';
import {Form, Formik, useFormikContext} from 'formik';
import {IconButton, RoundedButton} from 'scplus-shared-components';

export function SQFormDialogStep({children}) {
  return <>{children}</>;
}

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    padding: 20,
    '& svg': {
      fontSize: 30
    },
    '& span': {
      fontSize: 15,
      whiteSpace: 'nowrap'
    }
  }
});

const useActionsStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 100%',
    padding: '16px 24px'
  }
});

const useStepperStyles = makeStyles({
  root: {
    justifyContent: 'center'
  }
});

export function SQFormDialogStepper({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isOpen = false,
  maxWidth = 'sm',
  onClose,
  onSubmit,
  saveButtonText = 'Save',
  title,
  enableReinitialize = false,
  muiGridProps = {},
  setValues,
  fullWidth = true,
  contentStyle,
  ...props
}) {
  const steps = React.Children.toArray(children);
  const [activeStep, setActiveStep] = React.useState(0);
  const currentChild = steps[activeStep];
  const [completed, setCompleted] = React.useState({});

  const validationSchema = currentChild.props.validationSchema
    ? Yup.object().shape(currentChild.props.validationSchema)
    : null;

  const classes = useStyles();
  const actionsClasses = useActionsStyles();
  const stepperClasses = useStepperStyles();

  const isLastStep = React.useMemo(() => {
    return activeStep === steps.length - 1;
  }, [activeStep, steps]);

  // Our last step doesn't get marked complete
  const isAllStepsCompleted = () => {
    return Object.keys(completed).length === steps.length - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep && !isAllStepsCompleted
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    handleComplete();
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    const nextStep = step.toString();
    const prevStep = (step - 1).toString();
    const completedKeys = Object.keys(completed);
    if ([nextStep, prevStep].some(step => completedKeys.includes(step))) {
      setActiveStep(step);
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleSubmit = async (values, helpers) => {
    if (isLastStep) {
      await onSubmit(values, helpers);
      setCompleted(true);
    } else {
      setValues(values);
      handleNext();
    }
  };

  function NextButton() {
    const {errors, values} = useFormikContext();

    const isButtonDisabled = React.useMemo(() => {
      if (!validationSchema) {
        return false;
      }
      const formValues = Object.values(values).filter(val => val);
      if (!formValues.length || isLastStep) return true;

      if (
        Object.keys(validationSchema.fields).some(step =>
          Object.keys(errors).includes(step)
        )
      ) {
        return true;
      }

      return false;
    }, [errors, values]);

    return (
      <IconButton
        height="80px"
        width="80px"
        title="Next Step"
        IconComponent={ArrowRightIcon}
        isDisabled={isButtonDisabled}
        isIconTeal={true}
        type="submit"
      />
    );
  }

  function SubmitButton() {
    const {errors, values, dirty} = useFormikContext();

    const isButtonDisabled = React.useMemo(() => {
      if (!validationSchema) {
        return false;
      }
      const currentStepKeys = Object.keys(validationSchema.fields);
      const formValues = Object.values(values).filter(val => val);

      if (
        !formValues.length ||
        currentStepKeys.some(step => Object.keys(errors).includes(step)) ||
        !dirty
      ) {
        return true;
      }

      if (isLastStep && isAllStepsCompleted()) {
        return false;
      }
      return false;
    }, [errors, values, dirty]);
    return (
      <RoundedButton
        type="submit"
        isDisabled={isButtonDisabled}
        title={cancelButtonText}
      >
        {isLastStep ? 'Submit' : 'Next'}
      </RoundedButton>
    );
  }

  return (
    <Formik
      {...props}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting, isValid}) => (
        <Dialog
          TransitionComponent={Transition}
          disableBackdropClick={disableBackdropClick}
          maxWidth={maxWidth}
          open={isOpen}
          onClose={onClose}
          fullWidth={fullWidth}
        >
          <Form>
            <DialogTitle disableTypography={true}>
              <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <Divider />
            {steps.length > 1 && (
              <Grid container classes={stepperClasses}>
                <IconButton
                  height="80px"
                  width="80px"
                  title="Previous Step"
                  IconComponent={ArrowLeftIcon}
                  isDisabled={activeStep === 0}
                  isIconTeal={true}
                  onClick={handleBack}
                />
                <Stepper nonLinear activeStep={activeStep} classes={classes}>
                  {steps.map((child, index) => (
                    <Step key={child.props.label}>
                      <StepButton
                        onClick={handleStep(index)}
                        completed={completed[index]}
                      >
                        {child?.props.label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <NextButton />
              </Grid>
            )}
            <DialogContent
              dividers
              style={{
                paddingTop: '40px',
                paddingBottom: '40px',
                ...contentStyle
              }}
            >
              <Grid
                {...muiGridProps}
                container
                spacing={muiGridProps.spacing || 3}
                justify="center"
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

SQFormDialogStepper.propTypes = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText: PropTypes.string,
  /** The content to be rendered in the dialog body.  Will be an array of React elements. */
  children: PropTypes.array.isRequired,
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick: PropTypes.bool,
  /** Sets the dialog to the maxWidth. */
  fullWidth: PropTypes.bool,
  /** The current open/closed state of the Dialog */
  isOpen: PropTypes.bool.isRequired,
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: PropTypes.func.isRequired,
  /** Callback function invoke when the user clicks the primary button */
  onSave: PropTypes.func,
  /** The primary button text (Button located on right side of Dialog) */
  saveButtonText: PropTypes.string,
  /** Title text at the top of the Dialog */
  title: PropTypes.string.isRequired,
  /** Form Entity Object */
  initialValues: PropTypes.object.isRequired,
  /** Callback function that is called when a step is completed to pass back the current state values to the consumer */
  setValues: PropTypes.func,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object,
  /** Optional styling on the dialog */
  contentStyle: PropTypes.object
};

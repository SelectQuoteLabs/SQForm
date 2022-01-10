import PropTypes from 'prop-types';

export const HeaderPropTypes = {
  /** Optional Text button to display in the section header */
  actionButton: PropTypes.node,
  /** Title to display in the section header */
  title: PropTypes.string.isRequired,
  /** Informative text to display as a subheader next to the Title */
  infoText: PropTypes.string,
  /** Warning text to display as a subheader next to the Title */
  warningText: PropTypes.string,
  /** Error text to display as a subheader next to the Title
   * if the form is in a failed state
   */
  errorText: PropTypes.string,
  /** Success text to display as a subheader next to the Title
   * if the form has no errors and is in a Valid state
   */
  successText: PropTypes.string,
  /** This prop is controlled by taskModules.isFailedState
   * Red failure text to display as a subheader next to the Title
   * if the form is in a failed state where the user cannot continue
   */
  isFailedState: PropTypes.bool,
};

export const AgentScriptPropTypes = {
  /** Scripted Text for the user to read */
  text: PropTypes.string.isRequired,
  ...HeaderPropTypes,
};

export const OutcomePropTypes = {
  /** SQForm Elements to render inside the Form */
  FormElements: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  /** Any props from MUI <Grid> component */
  muiGridProps: PropTypes.object,
  ...HeaderPropTypes,
};

export const FormikProps = {
  /** Form Entity Object aka initial values of the form */
  initialValues: PropTypes.object.isRequired,
  /** Form Submission Handler | @typedef onSubmit: (values: Values, formikBag: FormikBag, context) => void | Promise<any> */
  onSubmit: PropTypes.func.isRequired,
  /** Yup validation schema shape */
  validationSchema: PropTypes.object,
};

export const TaskModuleProps = {
  /** Unique name used as a key for managing expansion state within Accordion */
  name: PropTypes.string.isRequired,
  /** Title text */
  title: PropTypes.string.isRequired,
  /** Subtitle text - Each Subtitle is separated by a pipe "|" */
  subtitles: PropTypes.arrayOf(PropTypes.string),
  /** Panel is disabled, the user cannot toggle the panel while disabled */
  isDisabled: PropTypes.bool,
  /** Is initially expanded */
  isInitiallyExpanded: PropTypes.bool,
  /** Controlled loading */
  isLoading: PropTypes.bool,
  /** Custom loading message for controlled loading */
  isLoadingMessage: PropTypes.string,
  /** expandPanel callback synchronizes consumer state with Accordion state.
   * Requires isPanelExpanded prop. */
  expandPanel: PropTypes.func,
  /** Optional prop for the consumer to define the cards open/close state.
   * Requires expandPanel prop. */
  isPanelExpanded: PropTypes.bool,
  /** Optional click handler if you want to perform a side effect on click */
  onClick: PropTypes.func,
  /** Reset button text */
  resetButtonText: PropTypes.string,
  /** Submit button text */
  submitButtonText: PropTypes.string,
  /** Flag for if the form is in a failed state where the user cannot continue */
  isFailedState: PropTypes.bool,
  /** Manually disable submit button */
  isSubmitButtonDisabled: PropTypes.bool,
  /** The props used to configure SQForm */
  formikProps: PropTypes.shape(FormikProps).isRequired,
  /** The props used to configure the Scripted Text section */
  scriptedTextProps: PropTypes.shape(AgentScriptPropTypes).isRequired,
  /** The props used to configure the Outcome form section */
  outcomeProps: PropTypes.shape(OutcomePropTypes).isRequired,
};

export const GuidedWorkflowProps = {
  /** Main Title */
  mainTitle: PropTypes.string.isRequired,
  /** Main Subtitle Informative Text */
  mainSubtitle: PropTypes.string,
  /** Number of tasks completed (Default is zero) */
  initialCompletedTasks: PropTypes.number,
  /**
   * Disables all Task Modules except the current Active Task module
   * This prevents the user from returning to a previous task module
   */
  isStrictMode: PropTypes.bool,
  /**
   * Callback function which passes the error as an argument for the consumer to handle
   * Usually the consumer will render an alert to signal an error occured
   */
  onError: PropTypes.func.isRequired,
  /** Task Module configuration Object(s) */
  taskModules: PropTypes.arrayOf(PropTypes.shape(TaskModuleProps).isRequired)
    .isRequired,
  /** An object of css-in-js style properties to be passed */
  containerStyles: PropTypes.object,
};

import PropTypes from 'prop-types';

export const HeaderPropTypes = {
  actionButton: PropTypes.node,
  title: PropTypes.string.isRequired,
  infoText: PropTypes.string,
  warningText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  isFailedState: PropTypes.bool
};

export const AgentScriptPropTypes = {
  text: PropTypes.string.isRequired,
  ...HeaderPropTypes
};

export const OutcomePropTypes = {
  FormElements: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  muiGridProps: PropTypes.object,
  ...HeaderPropTypes
};

export const FormikProps = {
  /** Form Entity Object aka initial values of the form */
  initialValues: PropTypes.object.isRequired,
  /** Form Submission Handler | @typedef onSubmit: (values: Values, formikBag: FormikBag) => void | Promise<any> */
  onSubmit: PropTypes.func.isRequired,
  /** Yup validation schema shape */
  validationSchema: PropTypes.object
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
  /** Manually disable submit button */
  isSubmitButtonDisabled: PropTypes.bool,
  formikProps: PropTypes.shape(FormikProps).isRequired,
  scriptedTextProps: PropTypes.shape(AgentScriptPropTypes).isRequired,
  outcomeProps: PropTypes.shape(OutcomePropTypes).isRequired
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
    .isRequired
};
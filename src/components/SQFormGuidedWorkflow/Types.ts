import React from 'react';
import type {GridProps} from '@material-ui/core';
import type {FormikHelpers, FormikValues} from 'formik';
import type {AnyObjectSchema} from 'yup';

export interface SQFormGuidedWorkflowHeaderProps {
  /** Title to display in the section header */
  title: string;
  /** Optional elements to display in the section header */
  actions?: React.ReactElement;
  /** Informative text to display as a subheader next to the title */
  infoText?: string;
  /** Warning text to display as a subheader next to the title */
  warningText?: string;
  /** Error text to display as a subheader next to the title
   * if the form is in a failed state
   */
  errorText?: string;
  /** Success text to display as a subheader next to the title
   * if the form has no errors and is in a Valid state
   */
  successText?: string;
  /** This prop is controlled by taskModules.isFailedState
   * Determines if the form is in a failed state where the user cannot continue
   */
  isFailedState?: boolean;
}

export interface SQFormGuidedWorkflowAdditionalInformationProps
  extends SQFormGuidedWorkflowHeaderProps {
  Elements: React.ReactElement;
}

export interface SQFormGuidedWorkflowAgentScriptProps
  extends SQFormGuidedWorkflowHeaderProps {
  /** Scripted Text for the user to read */
  text: string;
}

export interface SQFormGuidedWorkflowOutcomeProps
  extends SQFormGuidedWorkflowHeaderProps {
  /** SQForm Elements to render inside the Form */
  FormElements: React.ReactElement;
  /** Any props from MUI <Grid> component */
  muiGridProps?: GridProps;
}

export interface SQFormGuidedWorkflowDataProps<TValues extends FormikValues> {
  /** Form Entity Object aka initial values of the form */
  initialValues: TValues;
  /** Form Submission Handler | @typedef onSubmit: (values: Values, formikBag: FormikBag, context) => void | Promise<any> */
  onSubmit: (
    values: TValues,
    formikBag: FormikHelpers<TValues>,
    context: SQFormGuidedWorkflowContext<TValues>
  ) => void | Promise<unknown>;
  /** Yup validation schema shape */
  validationSchema?: AnyObjectSchema;
}

export interface SQFormGuidedWorkflowTaskModuleProps<
  TValues extends FormikValues
> {
  /** Unique name used as a key for managing expansion state within Accordion */
  name: string;
  /** Title text */
  title: string;
  /** The props used to configure SQForm */
  formikProps: SQFormGuidedWorkflowDataProps<TValues>;
  /** The props used to configured the Additional Information section */
  additionalInformationSectionProps?: SQFormGuidedWorkflowAdditionalInformationProps;
  /** The props used to configure the Scripted Text section */
  scriptedTextProps: SQFormGuidedWorkflowAgentScriptProps;
  /** The props used to configure the Outcome form section */
  outcomeProps: SQFormGuidedWorkflowOutcomeProps;
  /** Subtitle text - Each Subtitle is separated by a pipe "|" */
  subtitles?: Array<string>;
  /** Panel is disabled, the user cannot toggle the panel while disabled */
  isDisabled?: boolean;
  /** Whether the panel is initially expanded */
  isInitiallyExpanded?: boolean;
  /** Whether the module is loading */
  isLoading?: boolean;
  /** Custom loading message to display when module is loading */
  isLoadingMessage?: string;
  /** Optional click handler if you want to perform a side effect on click */
  onClick?: () => void;
  /** Reset button text */
  resetButtonText?: string;
  /** Submit button text */
  submitButtonText?: string;
  /** Flag for if the form is in a failed state where the user cannot continue */
  isFailedState?: boolean;
  /** Whether the submit button is disabled */
  isSubmitButtonDisabled?: boolean;
}

export interface SQFormGuidedWorkflowProps<TValues extends FormikValues> {
  /** Main Title */
  mainTitle: string;
  /** Main Subtitle Informative Text */
  mainSubtitle: string;
  /** Task Module configuration Object(s) */
  taskModules: Array<SQFormGuidedWorkflowTaskModuleProps<TValues>>;
  /** Number of tasks completed (Default is zero) */
  initialCompletedTasks?: number;
  /**
   * Disables all Task Modules except the current Active Task module
   * This prevents the user from returning to a previous task module
   */
  isStrictMode?: boolean;
  /**
   * Callback function which passes the error as an argument for the consumer to handle
   * Usually the consumer will render an alert to signal an error occured
   */
  onError?: (error: Error) => void;
  /** An object of css-in-js style properties to be passed */
  containerStyles?: React.CSSProperties;
}

export type SQFormGuidedWorkflowContext<TValues> = {
  [key: number]: {
    name: string;
    data: TValues;
    isDisabled: boolean;
  };
};

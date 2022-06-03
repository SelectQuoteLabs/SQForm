import React from 'react';
import {Formik} from 'formik';
import SQFormDialogInner from './SQFormDialogInner';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';
import type {FormikHelpers, FormikValues, FormikContextType} from 'formik';
import type {DialogProps, GridProps, ButtonProps} from '@material-ui/core';
import type {AnyObjectSchema} from 'yup';
import type {SQFormDialogTertiaryValue} from './types';

export type SQFormDialogProps<Values extends FormikValues> = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText?: string;
  /** The content to be rendered in the dialog body */
  children: React.ReactNode;
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick?: boolean;
  /** The current disabled state of the Dialog Save Button */
  isDisabled?: boolean;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth?: DialogProps['maxWidth'];
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: (
    event: Record<string, unknown>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  /** Callback function invoke when the user clicks the primary button */
  onSave: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<unknown>;
  /** Determine if the secondary action button should be displayed (default: true) */
  showSecondaryButton?: boolean;
  /**
   * determine the status of the tertiary button
   * can be one of'HIDE_BUTTON'|'NO_VALIDATION'|'IS_DISABLED'|'IS_ENABLED'|'FORM_VALIDATION_ONLY'|'IS_DISABLED_AND_FORM_VALIDATION',
   * this will determine if the button is rendered, as well as if the button is disabled and if it uses form validation.
   */
  tertiaryStatus?: SQFormDialogTertiaryValue;
  /** The tertiary button text */
  tertiaryButtonText?: string;
  /** Callback function invoked when the user clicks the tertiary button */
  onTertiaryClick?: (formikContext: FormikContextType<Values>) => void;
  /** Variant to be used for the tertiary button. Defaults to 'outlined' */
  tertiaryButtonVariant?: ButtonProps['variant'];
  /** Whether to show save/submit button (default: true) */
  shouldDisplaySaveButton?: boolean;
  /** The primary button text (Button located on right side of Dialog) */
  saveButtonText?: string;
  /** Title text at the top of the Dialog */
  title: string;
  /** Value to pass on to Formik for enableReinitialize prop https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize?: boolean;
  /** Form Entity Object */
  initialValues: Values;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
  /** Whether or not the dialog form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates?: boolean;
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema?: AnyObjectSchema;
};

function SQFormDialog<Values extends FormikValues>({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isDisabled = false,
  isOpen,
  maxWidth = 'sm',
  onClose,
  onSave,
  shouldDisplaySaveButton = true,
  saveButtonText = 'Save',
  tertiaryButtonText,
  title,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  shouldRequireFieldUpdates = false,
  validationSchema,
  showSecondaryButton = true,
  onTertiaryClick,
  tertiaryStatus = 'HIDE_BUTTON',
  tertiaryButtonVariant = 'outlined',
}: SQFormDialogProps<Values>): React.ReactElement {
  const initialErrors = useInitialRequiredErrors(
    validationSchema,
    initialValues
  );

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialErrors={initialErrors}
      initialValues={initialValues}
      onSubmit={onSave}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      <SQFormDialogInner<Values>
        cancelButtonText={cancelButtonText}
        children={children}
        disableBackdropClick={disableBackdropClick}
        isDisabled={isDisabled}
        isOpen={isOpen}
        maxWidth={maxWidth}
        onClose={onClose}
        shouldDisplaySaveButton={shouldDisplaySaveButton}
        saveButtonText={saveButtonText}
        shouldRequireFieldUpdates={shouldRequireFieldUpdates}
        title={title}
        muiGridProps={muiGridProps}
        showSecondaryButton={showSecondaryButton}
        tertiaryStatus={tertiaryStatus}
        tertiaryButtonText={tertiaryButtonText}
        onTertiaryClick={onTertiaryClick}
        tertiaryButtonVariant={tertiaryButtonVariant}
      />
    </Formik>
  );
}

export default SQFormDialog;

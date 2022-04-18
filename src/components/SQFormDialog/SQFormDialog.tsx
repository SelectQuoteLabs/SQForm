import React from 'react';
import {Formik} from 'formik';
import SQFormDialogInner from './SQFormDialogInner';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';
import type {FormikHelpers, FormikValues} from 'formik';
import type {DialogProps, GridProps} from '@material-ui/core';
import type {AnyObjectSchema} from 'yup';

export interface SQFormDialogProps<Values extends FormikValues> {
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
  /** Whether to show the tertiary button. (Default: false) */
  showTertiaryButton?: boolean;
  /** The tertiary button text */
  tertiaryButtonText?: string;
  /** Whether the tertiary button is disabled (Default: false) */
  isTertiaryDisabled?: boolean;
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
  /** Callback function invoked when the user clicks the tertiary button */
  onTertiaryClick?: React.MouseEventHandler<HTMLButtonElement>;
}

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
  showTertiaryButton = false,
  isTertiaryDisabled = false,
  onTertiaryClick,
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
      <SQFormDialogInner
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
        showTertiaryButton={showTertiaryButton}
        tertiaryButtonText={tertiaryButtonText}
        isTertiaryDisabled={isTertiaryDisabled}
        onTertiaryClick={onTertiaryClick}
      />
    </Formik>
  );
}

export default SQFormDialog;

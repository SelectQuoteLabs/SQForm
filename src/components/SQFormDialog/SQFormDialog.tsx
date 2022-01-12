import React from 'react';
import {Formik} from 'formik';
import type {FormikHelpers} from 'formik';
import type {DialogProps, GridProps} from '@material-ui/core';
import * as Yup from 'yup';
import SQFormDialogInner from './SQFormDialogInner';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';

interface SQFormDialogProps<Values> {
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
  validationSchema: Record<
    keyof Values,
    Yup.AnySchema<Values[keyof Values] | null | undefined>
  >;
}

function SQFormDialog<Values>({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isDisabled = false,
  isOpen,
  maxWidth = 'sm',
  onClose,
  onSave,
  showSecondaryButton = true,
  shouldDisplaySaveButton = true,
  saveButtonText = 'Save',
  title,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  shouldRequireFieldUpdates = false,
  validationSchema,
}: SQFormDialogProps<Values>): React.ReactElement {
  const validationYupSchema = React.useMemo(() => {
    if (!validationSchema) return;

    return Yup.object().shape(validationSchema);
  }, [validationSchema]);

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
      validationSchema={validationYupSchema}
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
      />
    </Formik>
  );
}

export default SQFormDialog;

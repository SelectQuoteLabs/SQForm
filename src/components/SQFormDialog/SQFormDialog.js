import React from 'react';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SQFormDialogInner from './SQFormDialogInner';
import {useInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';

function SQFormDialog({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isDisabled = false,
  isOpen,
  maxWidth = 'sm',
  onClose,
  onSave,
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
}) {
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
        onSave={onSave}
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

SQFormDialog.propTypes = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText: PropTypes.string,
  /** The content to be rendered in the dialog body */
  children: PropTypes.node.isRequired,
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick: PropTypes.bool,
  /** The current disabled state of the Dialog Save Button */
  isDisabled: PropTypes.bool,
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
  /** Value to pass on to Formik for enableReinitialize prop https://formik.org/docs/api/formik#enablereinitialize-boolean */
  enableReinitialize: PropTypes.bool,
  /** Form Entity Object */
  initialValues: PropTypes.object.isRequired,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object,
  /** Whether or not the dialog form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates: PropTypes.bool,
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema: PropTypes.object,
  /** show/hide the secondary Cancel button.  Defaults to show(true) */
  showSecondaryButton: PropTypes.bool,
  /** show/hide the tertiary button.  Defaults to hide(false) */
  showTertiaryButton: PropTypes.bool,
  /** The tertiary button text (Button located on right side of Dialog NEXT to primary button) */
  tertiaryButtonText: PropTypes.string,
  /** The current disabled state of the Tertiary Button */
  isTertiaryDisabled: PropTypes.bool,
  /** Callback function invoked when the user clicks the tertiary button */
  onTertiaryClick: PropTypes.func,
};

export default SQFormDialog;

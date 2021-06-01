import React from 'react';
import PropTypes from 'prop-types';
import {useDialog} from '@selectquotelabs/sqhooks';
import {DialogAlert, RoundedButton} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

function SQFormResetButtonWithConfirmation({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  variant = 'contained',
  onReset
}) {
  const {isDialogOpen, openDialog, closeDialog} = useDialog();
  const {dirty, handleReset} = useFormButton(isDisabled);

  const handlePrimaryButtonClick = () => {
    handleReset();

    // optional function prop consumer can pass to handle any additional side effects when resetting form
    onReset && onReset();

    closeDialog();
  };

  return (
    <>
      <RoundedButton
        title={buttonTitle}
        isDisabled={isDisabled || !dirty}
        onClick={openDialog}
        variant={variant}
      >
        {children}
      </RoundedButton>
      <DialogAlert
        isOpen={isDialogOpen}
        title={confirmationTitle}
        primaryButtonText="Reset"
        onPrimaryButtonClick={handlePrimaryButtonClick}
        secondaryButtonText="Cancel"
        onSecondaryButtonClick={closeDialog}
      >
        {confirmationContent}
      </DialogAlert>
    </>
  );
}

SQFormResetButtonWithConfirmation.propTypes = {
  /** The contents of the form button; usually text */
  children: PropTypes.node.isRequired,
  /** Title of the confirmation dialog */
  confirmationTitle: PropTypes.string,
  /** Content of the confirmation dialog */
  confirmationContent: PropTypes.node.isRequired,
  /** Whether the button is disabled */
  isDisabled: PropTypes.bool,
  /** Title of the button */
  buttonTitle: PropTypes.string,
  /** Callback for reset*/
  onReset: PropTypes.func
};

export default SQFormResetButtonWithConfirmation;

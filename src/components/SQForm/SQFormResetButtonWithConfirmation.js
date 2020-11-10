import React from 'react';
import PropTypes from 'prop-types';

import {DialogAlert, RoundedButton, useDialog} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

function SQFormResetButtonWithConfirmation({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  variant = 'contained',
  onReset = () => {}
}) {
  const [isOpen, {openDialog, closeDialog}] = useDialog();
  const {dirty, handleReset} = useFormButton(isDisabled);

  const handlePrimaryButtonClick = () => {
    handleReset();

    // optional function prop consumer can pass to handle any additional side effects when resetting form
    onReset();

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
        isOpen={isOpen}
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
  children: PropTypes.node.isRequired,
  confirmationTitle: PropTypes.string,
  confirmationContent: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onReset: PropTypes.func
};

export default SQFormResetButtonWithConfirmation;

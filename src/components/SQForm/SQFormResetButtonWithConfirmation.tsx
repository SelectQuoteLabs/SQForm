import React from 'react';
import {useDialog} from '@selectquotelabs/sqhooks';
import {DialogAlert, RoundedButton} from 'scplus-shared-components';
import {useFormButton, BUTTON_TYPES} from './useFormButton';

export interface SQFormResetButtonWithConfirmationProps {
  /** The contents of the form button; usually text */
  children: React.ReactNode;
  /** Title of the confirmation dialog */
  confirmationTitle?: string;
  /** Content of the confirmation dialog */
  confirmationContent: React.ReactNode;
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Title of the button */
  buttonTitle?: string;
  /** Callback for reset*/
  onReset?: () => void;
  /** style variant, "contained" or "outlined"*/
  variant?: 'contained' | 'outlined';
}

function SQFormResetButtonWithConfirmation({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  variant = 'contained',
  onReset
}: SQFormResetButtonWithConfirmationProps): JSX.Element {
  const {isDialogOpen, openDialog, closeDialog} = useDialog();
  const {dirty, handleReset} = useFormButton({
    isDisabled,
    buttonType: BUTTON_TYPES.RESET,
    shouldRequireFieldUpdates: false
  });

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

export default SQFormResetButtonWithConfirmation;

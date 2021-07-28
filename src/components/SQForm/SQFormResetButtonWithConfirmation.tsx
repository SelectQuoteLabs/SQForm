import React from 'react';
import {DialogAlert, RoundedButton} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';
import {useDialog} from '@selectquotelabs/sqhooks';

type SQFormResetButtonWithConfirmationTypes = {
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

  variant?: string;
};

function SQFormResetButtonWithConfirmation({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  variant = 'contained',
  onReset
}: SQFormResetButtonWithConfirmationTypes): JSX.Element {
  const {isDialogOpen, openDialog, closeDialog} = useDialog();
  const {dirty, handleReset} = useFormButton(isDisabled);

  const handlePrimaryButtonClick = (): void => {
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

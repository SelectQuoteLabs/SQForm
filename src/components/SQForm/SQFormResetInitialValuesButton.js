import React from 'react';
import PropTypes from 'prop-types';

import {DialogAlert, TextButton, useDialog} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

function SQFormResetInitialValuesButton({
  children,
  isDisabled = false,
  buttonTitle = 'Form Reset',
  confirmationContent,
  confirmationTitle = 'Reset Form',
  tooltip = 'Reset Button',
  initialValuesObject = {},
  ...props
}) {
  const [isOpen, {openDialog, closeDialog}] = useDialog();
  const {values, resetForm} = useFormButton(isDisabled);

  const handlePrimaryButtonClick = () => {
    resetForm({
      values: {
        ...values,
        ...initialValuesObject
      }
    });

    closeDialog();
  };

  return (
    <>
      <TextButton
        tooltip={tooltip}
        title={buttonTitle}
        isDisabled={isDisabled}
        onClick={openDialog}
        {...props}
      >
        {children}
      </TextButton>
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

SQFormResetInitialValuesButton.propTypes = {
  children: PropTypes.node.isRequired,
  confirmationTitle: PropTypes.string,
  confirmationContent: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  buttonTitle: PropTypes.string,
  initialValuesObject: PropTypes.object,
  tooltip: PropTypes.string
};

export default SQFormResetInitialValuesButton;

import React from 'react';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton, BUTTON_TYPES} from '../../hooks/useFormButton';
import type {ButtonType} from '../../hooks/useFormButton';

export type SQFormButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  shouldRequireFieldUpdates?: boolean;
  title?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function SQFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title,
  type = 'submit',
  onClick,
}: SQFormButtonProps): JSX.Element {
  const isResetButton = type === BUTTON_TYPES.RESET;
  const {isButtonDisabled, handleClick} = useFormButton({
    isDisabled,
    shouldRequireFieldUpdates,
    onClick,
    buttonType: type,
  });

  const getTitle = () => {
    switch (true) {
      case Boolean(title):
        return title || '';
      case isResetButton:
        return 'Reset Form';
      default:
        return 'Form Submission';
    }
  };

  return (
    <RoundedButton
      title={getTitle()}
      type={type}
      isDisabled={isButtonDisabled}
      onClick={handleClick}
      variant={isResetButton ? 'outlined' : 'contained'}
    >
      {children}
    </RoundedButton>
  );
}

export default SQFormButton;

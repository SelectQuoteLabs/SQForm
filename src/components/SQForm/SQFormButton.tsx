import React from 'react';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton, BUTTON_TYPES} from './useFormButton';
import type {ButtonType} from './useFormButton';

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
  const {isButtonDisabled, setValues, handleClick, initialValues} =
    useFormButton({
      isDisabled,
      shouldRequireFieldUpdates,
      onClick,
      buttonType: type,
    });

  const getClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    /* There is a Formik bug where simply calling handleReset does not cause the form to re-validate.
          To fix this, we manually reset the form by setting the values back to the initialValues.
          Github Issue: https://github.com/jaredpalmer/formik/issues/3512 */
    const formReset = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setValues(initialValues);
    };

    if (isResetButton) {
      return formReset(event);
    } else if (typeof onClick !== 'undefined') {
      return handleClick(event);
    }
  };

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
      onClick={getClickHandler}
      variant={isResetButton ? 'outlined' : 'contained'}
    >
      {children}
    </RoundedButton>
  );
}

export default SQFormButton;

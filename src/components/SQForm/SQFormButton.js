import React from 'react';
import PropTypes from 'prop-types';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton, BUTTON_TYPES} from './useFormButton';

function SQFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title,
  type = 'submit',
  onClick
}) {
  const isResetButton = type === BUTTON_TYPES.RESET;
  const {isButtonDisabled, handleReset, handleClick} = useFormButton(
    isDisabled,
    shouldRequireFieldUpdates,
    onClick,
    type
  );

  const getClickHandler = (...args) => {
    if (isResetButton) {
      return handleReset;
    } else if (typeof onClick !== 'undefined') {
      return handleClick(...args);
    }
  };

  const getTitle = () => {
    switch (true) {
      case Boolean(title):
        return title;
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

SQFormButton.propTypes = {
  /** Contents of the form button, usually text */
  children: PropTypes.node.isRequired,
  /** Custom disabled state */
  isDisabled: PropTypes.bool,
  /** Whether or not the form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates: PropTypes.bool,
  /** The title of the button */
  title: PropTypes.string,
  /** Type of button, defaults to 'submit' */
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  /** Standard React event handler */
  onClick: PropTypes.func
};

export default SQFormButton;

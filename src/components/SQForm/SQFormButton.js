import React from 'react';
import PropTypes from 'prop-types';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

function SQFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title = 'Form Submission',
  type = 'submit',
  onClick
}) {
  const {dirty, isButtonDisabled, handleReset, handleClick} = useFormButton(
    isDisabled,
    shouldRequireFieldUpdates,
    onClick
  );

  const isSQFormButtonDisabled = React.useMemo(() => {
    if (type === 'reset') {
      return !dirty;
    }

    return isButtonDisabled;
  }, [dirty, isButtonDisabled, type]);

  const getClickHandler = (...args) => {
    if (type === 'reset') {
      return handleReset;
    } else if (typeof onClick !== 'undefined') {
      return handleClick(...args);
    }
  };

  return (
    <RoundedButton
      title={title}
      type={type}
      isDisabled={isSQFormButtonDisabled}
      onClick={getClickHandler}
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
  type: PropTypes.oneOf(['submit', 'reset']),
  /** Standard React event handler */
  onClick: PropTypes.func
};

export default SQFormButton;

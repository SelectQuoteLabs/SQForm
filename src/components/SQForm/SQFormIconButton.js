import React from 'react';
import PropTypes from 'prop-types';

import {useFormButton} from './useFormButton';
import {IconButton} from 'scplus-shared-components';

function SQFormIconButton({
  IconComponent,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title = 'Form Submission',
  type = 'submit',
  onClick
}) {
  const {isButtonDisabled, handleClick} = useFormButton(
    isDisabled,
    shouldRequireFieldUpdates,
    onClick
  );

  function Icon() {
    return <IconComponent title={title} />;
  }

  return (
    <IconButton
      IconComponent={Icon}
      title={title}
      type={type}
      isDisabled={isButtonDisabled}
      onClick={onClick ? handleClick : undefined}
    />
  );
}

SQFormIconButton.propTypes = {
  /** The Material UI Icon to render inside the button */
  IconComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  /** Custom disabled state */
  isDisabled: PropTypes.bool,
  /** Whether or not the form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates: PropTypes.bool,
  /** The title of the button */
  title: PropTypes.string,
  /** Type of button, defaults to 'submit' */
  type: PropTypes.string,
  /** Standard React event handler */
  onClick: PropTypes.func
};

export default SQFormIconButton;

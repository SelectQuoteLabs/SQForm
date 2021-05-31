import React from 'react';
import PropTypes from 'prop-types';

import {useFormButton} from './useFormButton';
import {IconButton} from 'scplus-shared-components';

function SQFormIconButton({
  IconComponent,
  isIconTeal = false,
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

  return (
    <IconButton
      IconComponent={IconComponent}
      title={title}
      type={type}
      isDisabled={isButtonDisabled}
      onClick={onClick ? handleClick : undefined}
      isIconTeal={isIconTeal}
    />
  );
}

SQFormIconButton.propTypes = {
  /** The Material UI Icon to render inside the button */
  IconComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  /** Custom disabled state */
  isDisabled: PropTypes.bool,
  /** Allows the icon color to be the SQ Teal color */
  isIconTeal: PropTypes.bool,
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

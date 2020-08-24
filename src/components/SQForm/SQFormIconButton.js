import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from 'scplus-shared-components';

import {useFormButton} from './useFormButton';

function SQFormIconButton({
  IconComponent,
  isDisabled = false,
  title = 'Form Submission',
  type = 'submit'
}) {
  const {isButtonDisabled} = useFormButton(isDisabled);

  return (
    <IconButton
      IconComponent={IconComponent}
      title={title}
      type={type}
      isDisabled={isButtonDisabled}
    />
  );
}

SQFormIconButton.propTypes = {
  /** The Material UI Icon to render inside the button */
  IconComponent: PropTypes.func.isRequired,
  /** Custom disabled state */
  isDisabled: PropTypes.bool,
  /** The title of the button */
  title: PropTypes.string,
  /** Type of button, defaults to 'button' */
  type: PropTypes.string
};

export default SQFormIconButton;

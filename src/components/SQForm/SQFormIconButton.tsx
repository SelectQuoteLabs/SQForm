import React from 'react';

import {useFormButton, BUTTON_TYPES, ButtonType} from './useFormButton';
import {IconButton} from 'scplus-shared-components';
import {IconProps} from '@material-ui/core';

interface SQFormIconButtonProps {
  /** The Material UI Icon to render inside the button */
  IconComponent: React.ElementType;
  /** Custom disabled state */
  isDisabled?: boolean;
  /** Allows the icon color to be the SQ Teal color */
  isIconTeal?: boolean;
  /** Whether or not the form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates?: boolean;
  /** The title of the button */
  title?: string;
  /** Type of button, defaults to 'submit' */
  type?: ButtonType;
  /** Standard React event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function SQFormIconButton({
  IconComponent,
  isIconTeal = false,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title = 'Form Submission',
  type = BUTTON_TYPES.SUBMIT,
  onClick
}: SQFormIconButtonProps): JSX.Element {
  const {isButtonDisabled, handleClick} = useFormButton({
    isDisabled,
    shouldRequireFieldUpdates,
    onClick,
    buttonType: type
  });

  function Icon(props: IconProps) {
    return <IconComponent title={title} {...props} />;
  }

  return (
    <IconButton
      IconComponent={Icon}
      title={title}
      type={type}
      isDisabled={isButtonDisabled}
      onClick={onClick ? handleClick : undefined}
      isIconTeal={isIconTeal}
    />
  );
}

export default SQFormIconButton;

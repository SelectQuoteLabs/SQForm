import React from 'react';
import {useFormButton} from './useFormButton';
import {IconButton} from 'scplus-shared-components';

interface SQFormIconButtonProps {
  /** The Material UI Icon to render inside the button */
  IconComponent: React.ElementType;
  /** Custom disabled state */
  isDisabled?: boolean;
  /** Whether or not the form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates?: boolean;
  /** The title of the button */
  title?: string;
  /** Type of button, defaults to 'submit' */
  type?: string;
  /** Standard React event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function SQFormIconButton({
  IconComponent,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title = 'Form Submission',
  type = 'submit',
  onClick
}: SQFormIconButtonProps): JSX.Element {
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

export default SQFormIconButton;

import React from 'react';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

export interface Props {
  children: React.ReactNode;
  isDisabled?: boolean;
  shouldRequireFieldUpdates?: boolean;
  title?: string;
  type?: 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function SQFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title,
  type = 'submit',
  onClick
}: Props): JSX.Element {
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

  const getClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'reset') {
      return handleReset;
    } else if (typeof onClick !== 'undefined') {
      return handleClick(event);
    }
  };

  const getTitle = () => {
    switch (true) {
      case Boolean(title):
        return title;
      case type === 'reset':
        return 'Reset Form';
      default:
        return 'Form Submission';
    }
  };

  return (
    <RoundedButton
      title={getTitle()}
      type={type}
      isDisabled={isSQFormButtonDisabled}
      onClick={getClickHandler}
      variant={type === 'reset' ? 'outlined' : 'contained'}
    >
      {children}
    </RoundedButton>
  );
}

export default SQFormButton;

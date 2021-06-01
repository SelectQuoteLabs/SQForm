import React from 'react';
import {RoundedButton} from 'scplus-shared-components';
import {useFormButton} from './useFormButton';

interface Props {
  children: React.ReactNode;
  isDisabled?: boolean;
  shouldRequireFieldUpdates?: boolean;
  title?: string;
  type?: 'submit' | 'reset';
  onClick?: () => void;
}

function SQFormButton({
  children,
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  title,
  type = 'submit',
  onClick
}: Props) {
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

  const getClickHandler = (...args: unknown[]) => {
    if (type === 'reset') {
      return handleReset;
    } else if (typeof onClick !== 'undefined') {
      return handleClick(...args);
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
    >
      {children}
    </RoundedButton>
  );
}

export default SQFormButton;

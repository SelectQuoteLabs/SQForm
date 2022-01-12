import React from 'react';
import {useFormikContext} from 'formik';
import {useDebouncedCallback} from 'use-debounce';

export const BUTTON_TYPES = {
  SUBMIT: 'submit',
  RESET: 'reset',
};

export function useFormButton({
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  onClick,
  buttonType,
}) {
  const {values, initialValues, isValid, dirty, ...rest} = useFormikContext();

  const isButtonDisabled = React.useMemo(() => {
    if (isDisabled) {
      return true;
    }

    if (buttonType === BUTTON_TYPES.SUBMIT) {
      if (!isValid) {
        return true;
      }

      if (shouldRequireFieldUpdates && !dirty) {
        return true;
      }
    }

    if (buttonType === BUTTON_TYPES.RESET) {
      if (!dirty) {
        return true;
      }
    }

    return false;
  }, [isDisabled, isValid, shouldRequireFieldUpdates, buttonType, dirty]);

  const handleClick = useDebouncedCallback(
    (...args) => onClick?.(...args),
    500,
    {
      leading: true,
      trailing: false,
    }
  );

  return {
    isButtonDisabled,
    values,
    initialValues,
    isValid,
    handleClick,
    dirty,
    ...rest,
  };
}

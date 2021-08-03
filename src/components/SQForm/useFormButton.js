import React from 'react';
import {useFormikContext} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {hasUpdated} from '../../utils';

export const BUTTON_TYPES = {
  SUBMIT: 'submit',
  RESET: 'reset'
};

export function useFormButton(
  isDisabled,
  shouldRequireFieldUpdates,
  onClick,
  buttonType
) {
  const {values, initialValues, isValid, dirty, ...rest} = useFormikContext();
  const hasFormBeenUpdated = hasUpdated(initialValues, values);

  const isButtonDisabled = React.useMemo(() => {
    if (isDisabled) {
      return true;
    }

    if (buttonType === BUTTON_TYPES.SUBMIT) {
      if (!isValid) {
        return true;
      }

      if (shouldRequireFieldUpdates && !hasFormBeenUpdated) {
        return true;
      }
    }

    if (buttonType === BUTTON_TYPES.RESET) {
      if (!dirty) {
        return true;
      }
    }

    return false;
  }, [
    hasFormBeenUpdated,
    isDisabled,
    isValid,
    shouldRequireFieldUpdates,
    buttonType,
    dirty
  ]);

  const handleClick = useDebouncedCallback((...args) => onClick(...args), 500, {
    leading: true,
    trailing: false
  });

  return {
    isButtonDisabled,
    hasFormBeenUpdated,
    values,
    initialValues,
    isValid,
    handleClick,
    dirty,
    ...rest
  };
}

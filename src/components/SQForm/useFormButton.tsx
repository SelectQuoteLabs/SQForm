import React from 'react';
import {useFormikContext} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {hasUpdated} from '../../utils';

export function useFormButton(
  isDisabled: boolean,
  shouldRequireFieldUpdates: boolean,
  onClick: <TArgs extends any[], TResult>(...args: TArgs) => TResult
) {
  const {values, initialValues, isValid, ...rest} = useFormikContext();
  const hasFormBeenUpdated = hasUpdated(initialValues, values);

  const isButtonDisabled = React.useMemo(() => {
    if (isDisabled || !isValid) {
      return true;
    }

    if (shouldRequireFieldUpdates && !hasFormBeenUpdated) {
      return true;
    }

    return false;
  }, [hasFormBeenUpdated, isDisabled, isValid, shouldRequireFieldUpdates]);

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
    ...rest
  };
}

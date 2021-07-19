import React from 'react';
import {useFormikContext} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {hasUpdated} from '../../utils';

type UseFormButtonReturnType = {
  isButtonDisabled: boolean;
  hasFormBeenUpdated: boolean;
  values: unknown;
  initialValues: unknown;
  isValid: boolean;
  handleClick: (...args: unknown[]) => void;
  [key: string]: unknown;
};

export function useFormButton(
  isDisabled: boolean,
  shouldRequireFieldUpdates: boolean,
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
): UseFormButtonReturnType {
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

  const handleClick = useDebouncedCallback(
    event => onClick && onClick(event),
    500,
    {
      leading: true,
      trailing: false
    }
  );

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

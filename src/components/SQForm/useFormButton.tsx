import React from 'react';
import {useFormikContext} from 'formik';
import {useDebouncedCallback} from 'use-debounce';
import {hasUpdated} from '../../utils';
import {DebouncedState} from 'use-debounce/lib/useDebouncedCallback';

type UseFormButtonReturnType = {
  isButtonDisabled: boolean;
  hasFormBeenUpdated: boolean;
  values: unknown;
  initialValues: unknown;
  isValid: boolean;
  handleClick: DebouncedState<React.MouseEventHandler<HTMLButtonElement>>;
  [key: string]: unknown;
};

export function useFormButton(
  isDisabled: boolean,
  shouldRequireFieldUpdates: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
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

  const handleClick = useDebouncedCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(event => onClick && onClick(event), 500, {
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

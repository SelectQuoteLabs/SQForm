import React from 'react';
import {DebouncedState} from 'use-debounce/lib/useDebouncedCallback';
import {useDebouncedCallback} from 'use-debounce';
import {FormikContextType, useFormikContext} from 'formik';
import {hasUpdated} from '../../utils';

export const BUTTON_TYPES = {
  SUBMIT: 'submit',
  RESET: 'reset'
} as const;

export type ButtonType = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES];

interface UseFormButtonProps {
  isDisabled: boolean;
  shouldRequireFieldUpdates: boolean;
  buttonType: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type UseFormButtonReturnType<Values> = {
  isButtonDisabled: boolean;
  hasFormBeenUpdated: boolean;
  initialValues: Values;
  isValid: boolean;
  handleClick: DebouncedState<React.MouseEventHandler<HTMLButtonElement>>;
} & FormikContextType<Values>;

export function useFormButton<Values>({
  isDisabled = false,
  shouldRequireFieldUpdates = false,
  onClick,
  buttonType
}: UseFormButtonProps): UseFormButtonReturnType<Values> {
  const {values, initialValues, isValid, dirty, ...rest} = useFormikContext<
    Values
  >();
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
    buttonType,
    dirty,
    hasFormBeenUpdated,
    isDisabled,
    isValid,
    shouldRequireFieldUpdates
  ]);

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
    dirty,
    ...rest
  };
}

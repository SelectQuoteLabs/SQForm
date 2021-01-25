import React from 'react';
import {useFormikContext} from 'formik';
import {hasUpdated} from '../../utils';

export function useFormButton(isDisabled, shouldRequireFieldUpdates) {
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

  return {
    isButtonDisabled,
    hasFormBeenUpdated,
    values,
    initialValues,
    isValid,
    ...rest
  };
}

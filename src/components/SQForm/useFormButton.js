import React from 'react';
import {useFormikContext} from 'formik';

export function useFormButton(isDisabled) {
  const {dirty, errors, values, ...rest} = useFormikContext();

  const isButtonDisabled = React.useMemo(() => {
    const errorsCount = Object.values(errors).length;
    const formValues = Object.values(values).filter(val => val);

    if (!dirty || isDisabled) return true;
    if (!!errorsCount || !formValues.length) return true;

    return false;
  }, [dirty, errors, isDisabled, values]);

  return {dirty, errors, isButtonDisabled, values, ...rest};
}

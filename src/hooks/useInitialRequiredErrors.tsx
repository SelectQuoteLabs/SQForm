import React from 'react';
import {AnySchema} from 'yup';
import {FormikErrors} from 'formik';

// Until Formik exposes the validationSchema (again) via Context, the solution has to be handled at the Form declaration level
// There's a few open PR's on this issue, here's one for reference: https://github.com/formium/formik/pull/2933
export function useInitialRequiredErrors<Values>(
  validationSchema: AnySchema | Record<string, unknown> = {}
): FormikErrors<Values> {
  const initialRequiredErrorsRef = React.useRef(
    Object.entries(validationSchema).reduce((acc, [key, value]) => {
      if (value._exclusive?.required) {
        return {...acc, [key]: 'Required'};
      }
      return acc;
    }, {})
  );

  return initialRequiredErrorsRef.current;
}

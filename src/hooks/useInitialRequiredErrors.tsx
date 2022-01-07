import React from 'react';
import type {AnySchema} from 'yup';
import type {FormikErrors, FormikValues} from 'formik';

function _getHasValue(fieldValue: unknown) {
  if (Array.isArray(fieldValue)) {
    return !!fieldValue.length;
  }

  if (typeof fieldValue === 'number') {
    return true;
  }

  if (typeof fieldValue === 'boolean') {
    return true;
  }

  return !!fieldValue;
}

// Until Formik exposes the validationSchema (again) via useFormikContext(), the solution has to be handled at the Form declaration level
// There's a few open PR's on this issue, here's one for reference: https://github.com/formium/formik/pull/2933
export function useInitialRequiredErrors<Values>(
  validationSchema: AnySchema | Record<string, unknown> = {},
  initialValues: FormikValues
): FormikErrors<Values> {
  const initialRequiredErrorsRef = React.useRef(
    Object.entries(validationSchema).reduce((acc, [key, value]) => {
      if (value._exclusive?.required && !_getHasValue(initialValues[key])) {
        return {...acc, [key]: 'Required'};
      }
      return acc;
    }, {})
  );

  return initialRequiredErrorsRef.current;
}

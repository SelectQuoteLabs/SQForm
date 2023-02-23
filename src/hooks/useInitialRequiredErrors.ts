import type {AnyObjectSchema, ObjectSchema} from 'yup';
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

export function getInitialRequiredErrors<Values extends FormikValues>(
  validationSchema: AnyObjectSchema,
  initialValues: FormikValues
): FormikErrors<Values> {
  const validationFields = validationSchema.fields as ObjectSchema<Values>[];
  const initialErrors = Object.entries(validationFields).reduce(
    (acc, [key, value]) => {
      if (!_getHasValue(initialValues[key])) {
        const hasRequiredTest = value.tests?.some((testConfig) => {
          return testConfig?.OPTIONS.name === 'required';
        });

        if (hasRequiredTest) {
          return {...acc, [key]: 'Required'};
        }
      }

      return acc;
    },
    {}
  );

  return initialErrors;
}

// Until Formik exposes the validationSchema (again) via useFormikContext(), the solution has to be handled at the Form declaration level
// There's a few open PR's on this issue, here's one for reference: https://github.com/formium/formik/pull/2933
export function useInitialRequiredErrors<Values extends FormikValues>(
  validationSchema: AnyObjectSchema | undefined,
  initialValues: FormikValues
): FormikErrors<Values> {
  if (validationSchema?.fields) {
    return getInitialRequiredErrors(validationSchema, initialValues);
  }

  return {};
}

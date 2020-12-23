import {EMPTY_LABEL} from './constants';

// Note - Formik fields expect empty strings and not nulls
// When initializing the forms initialValues we can use this function to replace all nulls with empty strings
export function sanitizeInitialValues(valuesObject) {
  return JSON.parse(
    JSON.stringify(valuesObject, (_key, value) => {
      return value === null ? '' : value;
    })
  );
}

// Note - SQForm calls this function onSubmit automatically for you
export function serializeFormValues(formValues) {
  return JSON.parse(
    JSON.stringify(formValues, (_key, value) => {
      return value === '' || value === EMPTY_LABEL ? null : value;
    })
  );
}

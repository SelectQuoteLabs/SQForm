// Note - Formik fields expect empty strings and not nulls
// When initializing the forms initialValues we can use this function to replace all nulls with empty strings
export function sanitizeInitialValues(valuesObject) {
  return JSON.parse(
    JSON.stringify(valuesObject, (_key, value) => {
      return value === null ? '' : value;
    })
  );
}

// If we want to send null to our API instead of empty strings
// Note - If this becomes a common scenario we can make this the default behavior for SQForm onSubmit
export function serializeFormValues(formValues) {
  return JSON.parse(
    JSON.stringify(formValues, (_key, value) => {
      return value === '' ? null : value;
    })
  );
}

export const toKebabCase = (string) =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

export {MASKS} from './masks';

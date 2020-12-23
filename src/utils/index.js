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

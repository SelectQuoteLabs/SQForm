const DOCS_LINK = 'https://selectquotelabs.github.io/SQForm/docs';

export const getUndefinedChildrenWarning = (
  component: string,
  name: string
): string => {
  return `SQForm: The children you provided to the ${component} (name='${name}') component was undefined. An array must be provided. More information: ${DOCS_LINK}/common_issues`;
};

export const getUndefinedValueWarning = (
  component: string,
  name: string
): string => {
  return `SQForm: The initialValue you provided to SQForm for the ${component} (name='${name}') component was undefined. This can cause warnings and unexpected behavior. More information: ${DOCS_LINK}/common_issues`;
};

export const getOutOfRangeValueWarning = (
  component: string,
  name: string,
  requestedDisplayValue: string
): string => {
  return `SQForm: The requested display value, '${requestedDisplayValue}' for the ${component} (name='${name}') component could not be found. More information: ${DOCS_LINK}/common_issues`;
};

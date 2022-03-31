import moment from 'moment';

export const DATE_TIME_FORMATS = {
  DATABASE_FORMAT: 'YYYY-MM-DD HH:mm:ss.SSS', // Possibly not needed
  DATABASE_FORMAT_WITHOUT_SECONDS: 'YYYY-MM-DD HH:mm',
  DATABASE_FORMAT_WITH_MILITARY_TIME: 'YYYY-MM-DD HH:mm:ss',
  DATE_FULL_MONTH_AND_YEAR: 'MMMM YYYY',
  DATE_SHORT: 'MM/DD/YYYY',
  DATE_TIME_SHORT_MONTH: 'MMM DD, YYYY HH:mm a',
  DATE_WITH_YEAR_TIME_WITH_AMPM_FORMAT: 'MM/DD/YY, h:mm a',
  DATE_WITH_YEAR_TIME_WITH_AMPM_NO_COMMA: 'MM/DD/YY h:mm a',
  DATE_YEAR_MONTH_FIRST: 'YYYY-MM-DD',
  DAY_OF_MONTH: 'D',
  LOCAL_DATE_WITH_LOCAL_TIME: 'L, LTS',
  LOCAL_DATE_WITH_TIME: 'l h:mm:ss A',
  LOCAL_TIME_WITH_SECONDS: 'LTS',
  MINUTES_SECONDS: 'mm:ss',
  MONTH_FULL: 'MMMM',
  TIME_HOURS_MINUTES_AMPM: 'hh:mm a',
  TIME_HOUR_NO_LEADING_0_MINUTES_AMPM: 'h:mm A',
  TIME_HOURS_WITH_SECONDS: 'HH:mm:ss',
};

/**
 * Converts a date/time on the client to be in the proper format for the server. Accepts a string or Moment object.
 * Defaults to a new Moment object with date/time set to now.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time on the client to convert for server
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {string} The date/time as a utc ISO string
 */
export function getDateWithoutTimezone(dateTime, fromFormat) {
  if (!dateTime) {
    dateTime = moment();
  }

  const momentToConvert =
    typeof dateTime === 'string' ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert;
}

/**
 * Converts a date/time on the server to be in the proper format for the client. Accepts a string or Moment object.
 * Defaults to a new Moment object with date/time set to now.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time from the server to convert for client
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {Moment} A Moment object converted to local browser time
 */
export function applyBrowserTimezoneToDate(dateTime, fromFormat) {
  if (!dateTime) {
    dateTime = moment();
  }

  const momentToConvert =
    typeof dateTime === 'string' ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert.local();
}

/**
 * Converts a date/time on the client to be in a special format for the server. Accepts a string or Moment object.
 * The toFormat is required.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time on the client to convert for server
 * @param {string} toFormat - The format to convert to
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {string} The date/time as a utc ISO string
 */
export function clientMomentToSpecialServerFormat(
  dateTime,
  toFormat,
  fromFormat
) {
  if (!toFormat) {
    throw Error(
      'clientMomentToSpecialServerFormat must have toFormat to work properly'
    );
  }

  const momentToConvert =
    typeof dateTime === 'string' ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert.format(toFormat);
}

export function getDateAsMomentIfValid(date) {
  if (!date) {
    return undefined;
  }

  const momentDate = moment(date);

  return momentDate.isValid() ? momentDate : undefined;
}

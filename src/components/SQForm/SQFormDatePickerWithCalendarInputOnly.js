import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/HighlightOff';
import {useFormikContext} from 'formik';
import {IconButton, makeStyles} from '@material-ui/core';
import SQFormDatePicker from './SQFormDatePicker';
import {useForm} from './useForm';

const useClearButtonStyles = makeStyles({
  root: {
    order: 1,
    padding: 0,
  },
});

const useCalendarButtonStyles = makeStyles({
  root: {
    order: 2,
    '& .MuiIconButton-root': {
      padding: 0,
    },
    '& .MuiIconButton-edgeEnd': {
      margin: 0,
    },
  },
});

function SQFormDatePickerWithCalendarInputOnly({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  placeholder = '',
  onBlur,
  onChange,
  setDisabledDate,
  muiFieldProps = {},
}) {
  const {
    fieldState: {isFieldRequired},
    fieldHelpers: {handleBlur, handleChange},
  } = useForm({
    name,
    onBlur,
    onChange,
  });
  const clearButtonClasses = useClearButtonStyles();
  const calendarButtonClasses = useCalendarButtonStyles();
  const {values, setFieldValue} = useFormikContext();

  const clearField = () => {
    setFieldValue(name, '');
  };

  return (
    <SQFormDatePicker
      name={name}
      label={label}
      size={size}
      isDisabled={isDisabled}
      isRequired={isFieldRequired}
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={handleChange}
      setDisabledDate={setDisabledDate}
      isCalendarOnly={true}
      muiFieldProps={{
        ...muiFieldProps,
        InputProps: {
          startAdornment: (
            <IconButton
              classes={clearButtonClasses}
              onClick={clearField}
              disabled={isDisabled || !values[name]}
            >
              <ClearIcon color="disabled" fontSize="small" />
            </IconButton>
          ),
        },
        InputAdornmentProps: {
          position: 'end',
          classes: calendarButtonClasses,
        },
      }}
      muiTextInputProps={{
        readOnly: true,
        style: {cursor: isDisabled ? 'default' : 'pointer'},
      }}
    />
  );
}

SQFormDatePickerWithCalendarInputOnly.propTypes = {
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.string.isRequired,
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder: PropTypes.string,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Disable specific date(s) (day: DateIOType) => boolean
   * This is a predicate function called for every day of the month
   * Return true to disable that day or false to enable that day
   */
  setDisabledDate: PropTypes.func,
  /** Any valid prop for material ui datepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps: PropTypes.object,
};

export default SQFormDatePickerWithCalendarInputOnly;

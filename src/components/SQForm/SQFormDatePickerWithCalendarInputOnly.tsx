import React from 'react';
import ClearIcon from '@material-ui/icons/HighlightOff';
import {useFormikContext} from 'formik';
import {IconButton, makeStyles} from '@material-ui/core';
import SQFormDatePicker, {SQFormDatePickerProps} from './SQFormDatePicker';
import {useForm} from './useForm';
import type {BaseFieldProps} from 'types';

export interface SQFormDatePickerWithCalendarInputOnlyProps extends BaseFieldProps {
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Custom onChange event callback */
  onChange?: SQFormDatePickerProps['onChange'];
  /** Disable specific date(s) (day: DateIOType) => boolean
   * This is a predicate function called for every day of the month
   * Return true to disable that day or false to enable that day
   */
  setDisabledDate?: SQFormDatePickerProps['setDisabledDate'];
  /** Any valid prop for material ui datepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps?: SQFormDatePickerProps['muiFieldProps'];
}

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
  muiFieldProps,
}: SQFormDatePickerWithCalendarInputOnlyProps): React.ReactElement {
  const {
    formikField: {helpers},
    fieldState: {isFieldRequired},
    fieldHelpers: {handleBlur},
  } = useForm({
    name,
    onBlur,
  });
  const clearButtonClasses = useClearButtonStyles();
  const calendarButtonClasses = useCalendarButtonStyles();
  const {values, setFieldValue} =
    useFormikContext<{[name: string]: moment.Moment}>();

  const clearField = () => {
    setFieldValue(name, '');
  };

  const handleChange = (date: moment.Moment | null) => {
    helpers.setValue(date);
    onChange && onChange(date);
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
      muiFieldProps={muiFieldProps}
      muiTextInputProps={{
        readOnly: true,
        style: {cursor: isDisabled ? 'default' : 'pointer'},
      }}
      InputProps={{
        startAdornment: (
          <IconButton
            classes={clearButtonClasses}
            onClick={clearField}
            disabled={isDisabled || !values[name]}
          >
            <ClearIcon color="disabled" fontSize="small" />
          </IconButton>
        ),
      }}
      InputAdornmentProps={{
        position: 'end',
        classes: calendarButtonClasses,
      }}
    />
  );
}

export default SQFormDatePickerWithCalendarInputOnly;

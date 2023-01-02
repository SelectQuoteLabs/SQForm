import React from 'react';
import {IconButton} from '@mui/material';
import {HighlightOff as ClearIcon} from '@mui/icons-material';
import {useFormikContext} from 'formik';
import SQFormDatePicker from './SQFormDatePicker';
import {useForm} from './useForm';
import type {Moment} from 'moment';
import type {BaseFieldProps} from '../../types';
import type {SQFormDatePickerProps} from './SQFormDatePicker';

export type SQFormDatePickerWithCalendarInputOnlyProps = BaseFieldProps & {
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
};

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
    fieldHelpers: {handleBlur},
  } = useForm({
    name,
    onBlur,
  });
  const {values, setFieldValue} = useFormikContext<{[name: string]: Moment}>();

  const clearField = () => {
    setFieldValue(name, '');
  };

  const handleChange = (date: Moment | null) => {
    helpers.setValue(date);
    onChange && onChange(date);
  };

  return (
    <SQFormDatePicker
      name={name}
      label={label}
      size={size}
      isDisabled={isDisabled}
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
            sx={{
              order: 1,
              p: 0,
            }}
            size="large"
            onClick={clearField}
            disabled={isDisabled || !values[name]}
          >
            <ClearIcon color="disabled" fontSize="small" />
          </IconButton>
        ),
      }}
      InputAdornmentProps={{
        position: 'end',
        sx: {
          order: 2,
          '& .MuiIconButton-root': {
            p: 0,
          },
          '& .MuiIconButton-edgeEnd': {
            m: 0,
          },
        },
      }}
    />
  );
}

export default SQFormDatePickerWithCalendarInputOnly;

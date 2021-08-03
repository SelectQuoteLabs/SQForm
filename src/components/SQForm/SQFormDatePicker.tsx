import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {DatePicker, BaseDatePickerProps} from '@material-ui/pickers';
import BaseFieldProps from '../../types/BaseFieldProps';
import {
  makeStyles,
  ClickAwayListener,
  InputBaseComponentProps
} from '@material-ui/core';
import {useForm} from './useForm';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root.Mui-focused, & .MuiInputBase-root:hover:not(.Mui-disabled)': {
      '& .MuiIconButton-root': {
        color: 'var(--color-teal)'
      }
    }
  }
}));

interface SQFormDatePickerProps extends BaseFieldProps {
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Required property used to highlight input and label if not fulfilled */
  isRequired?: boolean;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Custom onChange event callback */
  onChange?: (
    date: React.ChangeEvent<Element | moment.Moment> | unknown
  ) => void;
  /** Disable specific date(s) (day: DateIOType) => boolean
   * This is a predicate function called for every day of the month
   * Return true to disable that day or false to enable that day
   */
  setDisabledDate: (day: unknown) => boolean;
  /** Any valid prop for material ui datepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps?: BaseDatePickerProps;
  /** Any valid prop for MUI input field - https://material-ui.com/api/text-field/ & https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes */
  muiTextInputProps?: InputBaseComponentProps;
  /** A Boolean flag used when using calendar only; disabled text filed input */
  isCalendarOnly?: boolean;
}

function SQFormDatePicker({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  isRequired = false,
  placeholder = '',
  onBlur,
  onChange,
  setDisabledDate,
  muiFieldProps = {},
  muiTextInputProps = {},
  isCalendarOnly = false
}: SQFormDatePickerProps): JSX.Element {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError},
    fieldHelpers: {handleBlur, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onBlur,
    onChange
  });

  const handleChange = (
    date: React.ChangeEvent<Element | moment.Moment> | unknown
  ) => {
    helpers.setValue(date);
    onChange && onChange(date);
  };

  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const handleClose = () => setIsCalendarOpen(false);
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);
  const handleClickAway = () => {
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
    }
  };

  const classes = useStyles();

  // An empty string will not reset the DatePicker so we have to pass null
  const value = field.value || null;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid item sm={size}>
        <DatePicker
          label={label}
          disabled={isDisabled}
          shouldDisableDate={setDisabledDate}
          value={value}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={toggleCalendar}
          open={isCalendarOpen}
          renderInput={inputProps => {
            return (
              <TextField
                {...inputProps}
                name={name}
                color="primary"
                error={isFieldError}
                fullWidth={true}
                inputProps={{...inputProps.inputProps, ...muiTextInputProps}}
                InputLabelProps={{shrink: true}}
                FormHelperTextProps={{error: isFieldError}}
                helperText={!isDisabled && HelperTextComponent}
                placeholder={placeholder}
                onBlur={handleBlur}
                required={isRequired}
                onClick={
                  isCalendarOnly && !isDisabled
                    ? toggleCalendar
                    : handleClickAway
                }
                classes={classes}
              />
            );
          }}
          {...muiFieldProps}
        />
      </Grid>
    </ClickAwayListener>
  );
}

export default SQFormDatePicker;

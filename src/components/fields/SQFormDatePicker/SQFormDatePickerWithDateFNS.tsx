import React from 'react';
import {ClickAwayListener, Grid, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {useForm} from '../../../hooks/useForm';
import type {BasePickerProps} from '@mui/x-date-pickers/internals';
import type {BaseDatePickerProps} from '@mui/x-date-pickers/DatePicker/shared';
import type {SQFormDatePickerProps} from 'index';

type MuiFieldProps<TDate> = BaseDatePickerProps<TDate, TDate> &
  Omit<BasePickerProps<TDate, TDate | null>, 'value' | 'onChange'>;

export type SQFormDatePickerDateFNSProps = Omit<
  SQFormDatePickerProps,
  'onChange' | 'muiFieldProps'
> & {
  onChange?: (date: Date | null) => void;
  muiFieldProps?: MuiFieldProps<Date>;
};

function SQFormDatePickerWithDateFNS({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  placeholder = 'MM / DD / YYYY',
  onBlur,
  onChange,
  setDisabledDate,
  muiFieldProps,
  muiTextInputProps = {},
  isCalendarOnly = false,
  InputProps,
  InputAdornmentProps,
}: SQFormDatePickerDateFNSProps): JSX.Element {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, HelperTextComponent},
  } = useForm<Date | null, Date | null>({
    name,
    onBlur,
  });

  const handleChange = (date: Date | null) => {
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

  // An empty string will not reset the DatePicker so we have to pass null
  const value = field.value || null;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid item={true} sm={size}>
        <DatePicker
          label={label}
          disabled={isDisabled}
          shouldDisableDate={setDisabledDate}
          value={value}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={toggleCalendar}
          open={isCalendarOpen}
          renderInput={(inputProps) => {
            return (
              <TextField
                {...inputProps}
                name={name}
                color="primary"
                variant="standard"
                error={isFieldError}
                fullWidth={true}
                inputProps={{
                  ...inputProps.inputProps,
                  placeholder,
                  ...muiTextInputProps,
                }}
                InputLabelProps={{shrink: true}}
                FormHelperTextProps={{error: isFieldError}}
                helperText={!isDisabled && HelperTextComponent}
                onBlur={handleBlur}
                required={isFieldRequired}
                onClick={
                  isCalendarOnly && !isDisabled
                    ? toggleCalendar
                    : handleClickAway
                }
              />
            );
          }}
          InputProps={InputProps}
          InputAdornmentProps={InputAdornmentProps}
          {...muiFieldProps}
        />
      </Grid>
    </ClickAwayListener>
  );
}

export default SQFormDatePickerWithDateFNS;

import React from 'react';
import {ClickAwayListener, Grid, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {useForm} from '../../../hooks/useForm';
import type {Moment} from 'moment';
import type {InputBaseComponentProps} from '@mui/material';
import type {DatePickerProps} from '@mui/x-date-pickers/DatePicker';
import type {BasePickerProps} from '@mui/x-date-pickers/internals';
import type {BaseDatePickerProps} from '@mui/x-date-pickers/DatePicker/shared';
import type {BaseFieldProps} from '../../../types';
import type {SxProps, Theme} from '@mui/material/styles';

type MuiFieldProps<TDate> = BaseDatePickerProps<TDate, TDate> &
  Omit<BasePickerProps<TDate, TDate | null>, 'value' | 'onChange'>;

export type SQFormDatePickerProps = BaseFieldProps & {
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Whether or not to show the helper text */
  displayHelperText?: boolean;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Custom onChange event callback */
  onChange?: (date: Moment | null) => void;
  /** Disable specific date(s) (day: DateIOType) => boolean
   * This is a predicate function called for every day of the month
   * Return true to disable that day or false to enable that day
   */
  setDisabledDate?: (day: unknown) => boolean;
  /** Any valid prop for material ui datepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps?: MuiFieldProps<Moment>;
  /** Any valid prop for MUI input field - https://material-ui.com/api/text-field/ & https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes */
  muiTextInputProps?: InputBaseComponentProps;
  /** Props provided to the Input component. Most commonly used for adornments. */
  InputProps?: DatePickerProps<Moment, Moment>['InputProps'];
  /** Props provided to the input adornments. */
  InputAdornmentProps?: DatePickerProps<
    Moment,
    Moment
  >['InputAdornmentProps'] & {
    sx?: SxProps<Theme>;
  };
  /** A Boolean flag used when using calendar only; disabled text filed input */
  isCalendarOnly?: boolean;
};

function SQFormDatePicker({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  displayHelperText = true,
  placeholder = 'MM / DD / YYYY',
  onBlur,
  onChange,
  setDisabledDate,
  muiFieldProps,
  muiTextInputProps = {},
  isCalendarOnly = false,
  InputProps,
  InputAdornmentProps,
}: SQFormDatePickerProps): JSX.Element {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, HelperTextComponent},
  } = useForm<Moment | null, Moment | null>({
    name,
    onBlur,
  });

  const handleChange = (date: Moment | null) => {
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
                helperText={
                  !isDisabled && displayHelperText && HelperTextComponent
                }
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

export default SQFormDatePicker;

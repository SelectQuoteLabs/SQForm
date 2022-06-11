import React from 'react';
import {
  ClickAwayListener,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {DatePicker} from '@material-ui/pickers';
import {useForm} from './useForm';
import type {BasePickerProps, BaseDatePickerProps} from '@material-ui/pickers';
import type {ParsableDate} from '@material-ui/pickers/constants/prop-types';
import type {SQFormDatePickerProps} from 'index';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root.Mui-focused, & .MuiInputBase-root:hover:not(.Mui-disabled)':
      {
        '& .MuiIconButton-root': {
          color: 'var(--color-teal)',
        },
      },
  },
}));

type MuiFieldProps<TDate> = BaseDatePickerProps<TDate> &
  Omit<
    BasePickerProps<ParsableDate<TDate>, TDate | null>,
    'value' | 'onChange'
  >;

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
  placeholder = '',
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
          renderInput={(inputProps) => {
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
                required={isFieldRequired}
                onClick={
                  isCalendarOnly && !isDisabled
                    ? toggleCalendar
                    : handleClickAway
                }
                classes={classes}
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

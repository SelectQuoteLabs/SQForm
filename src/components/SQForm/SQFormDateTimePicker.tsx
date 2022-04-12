import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DateTimePicker} from '@material-ui/pickers';
import {ClickAwayListener, makeStyles} from '@material-ui/core';
import {useForm} from './useForm';
import type {Moment} from 'moment';
import type {BaseDateTimePickerProps} from '@material-ui/pickers';
import type {BaseFieldProps} from '../../types';
import type {ParsableDate} from '@material-ui/pickers/constants/prop-types';

export interface SQFormDateTimePickerProps extends BaseFieldProps {
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Custom onChange event callback */
  onChange?: (date: Moment | null) => void;
  /** Any valid prop for material ui datetimepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps?: BaseDateTimePickerProps<Moment>;
}

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

function SQFormDateTimePicker({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  placeholder = '',
  onBlur,
  onChange,
  muiFieldProps = {},
}: SQFormDateTimePickerProps): JSX.Element {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, HelperTextComponent},
  } = useForm<Moment | null, unknown>({
    name,
    onBlur,
  });

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
  const value: ParsableDate<Moment> | null =
    (field.value as ParsableDate<Moment>) ?? null;

  const handleChange = (date: Moment | null): void => {
    helpers.setValue(date);
    onChange && onChange(date);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid item sm={size}>
        <DateTimePicker
          label={label}
          disabled={isDisabled}
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
                disabled={isDisabled}
                error={isFieldError}
                fullWidth={true}
                InputLabelProps={{shrink: true}}
                FormHelperTextProps={{error: isFieldError}}
                helperText={!isDisabled && HelperTextComponent}
                placeholder={placeholder}
                onBlur={handleBlur}
                onClick={handleClickAway}
                required={isFieldRequired}
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

export default SQFormDateTimePicker;

import React from 'react';
import moment from '@material-ui/pickers/adapter/moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DateTimePicker, BaseDateTimePickerProps} from '@material-ui/pickers';
import {ClickAwayListener, makeStyles} from '@material-ui/core';
import {useForm} from './useForm';
import BaseFieldProps from '../../types/BaseFieldProps';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';

interface SQFormDateTimePickerProps extends BaseFieldProps {
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Required property used to highlight input and label if not fulfilled */
  isRequired?: boolean;
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder?: string;
  /** Custom onBlur event callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Custom onChange event callback */
  onChange?: React.ChangeEventHandler;
  /** Any valid prop for material ui datetimepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps?: BaseDateTimePickerProps;
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
}: SQFormDateTimePickerProps) {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, HelperTextComponent},
  } = useForm({
    name,
    onBlur,
    onChange,
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
  const value: ParsableDate<moment.Moment> | null =
    (field.value as ParsableDate<moment.Moment>) ?? null;

  const handleChange = (
    date: moment.Moment | null,
    _keyBoardInputValue: string | undefined
  ): void => {
    helpers.setValue(date)
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

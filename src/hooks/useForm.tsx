import React from 'react';
import isEqual from 'lodash.isequal';
import {getIn, useField} from 'formik';
import {Typography} from '@mui/material';
import {
  NewReleases as WarningIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import type {Theme} from '@mui/material';
import type {FieldHelperProps, FieldInputProps, FieldMetaProps} from 'formik';

type ChangeHandler<TChangeEvent> = (
  event: TChangeEvent,
  ...args: any[]
) => void;

type UseFormParam<TChangeEvent> = {
  name: string;
  onBlur?: React.FocusEventHandler;
  onChange?: ChangeHandler<TChangeEvent>;
};

type UseFormReturn<TValue, TChangeEvent> = {
  formikField: {
    field: FieldInputProps<TValue>;
    meta: FieldMetaProps<TValue>;
    helpers: FieldHelperProps<TValue>;
  };
  fieldState: {
    errorMessage: string;
    isTouched: boolean;
    isError: boolean;
    isFieldError: boolean;
    isFieldRequired: boolean;
    isFulfilled: boolean;
  };
  fieldHelpers: {
    handleBlur: React.FocusEventHandler;
    handleChange: ChangeHandler<TChangeEvent>;
    HelperTextComponent: React.ReactElement | string;
  };
};

const SPACE_STYLE = {marginRight: '0.3333rem'};
const WARNING_ICON_STYLES = {
  ...SPACE_STYLE,
  width: '12px',
  height: '11px',
};
const SUCCESS_ICON_STYLES = {
  ...WARNING_ICON_STYLES,
  width: '9px',
  height: '11px',
};

function _handleError(name: string) {
  if (typeof name !== 'string') {
    throw new Error('Name is a required param and must be a String!');
  }
}

function _getHasValue(meta: FieldMetaProps<unknown>) {
  const fieldValue = getIn(meta, 'value');

  if (Array.isArray(fieldValue)) {
    return !!fieldValue.length;
  }

  if (typeof fieldValue === 'number') {
    return true;
  }

  if (typeof fieldValue === 'boolean') {
    return true;
  }

  return !!fieldValue;
}

function _transformErrorMessageToString<TValue>(meta: FieldMetaProps<TValue>) {
  const error = getIn(meta, 'error');

  if (Array.isArray(error)) {
    return error.join('').toLowerCase() || undefined;
  }

  return error;
}

export function useForm<TValue, TChangeEvent>({
  name,
  onBlur,
  onChange,
}: UseFormParam<TChangeEvent>): UseFormReturn<TValue, TChangeEvent> {
  _handleError(name);

  const [field, meta, helpers] = useField<TValue>(name);
  const errorMessage = _transformErrorMessageToString<TValue>(meta);
  const isTouched = getIn(meta, 'touched');
  const isDirty = !isEqual(meta.initialValue, meta.value);
  const hasValue = _getHasValue(meta);
  const isError = !!errorMessage;
  const isRequired = errorMessage?.toLowerCase() === 'required';

  const getFieldStatus = () => {
    if (isRequired && !hasValue && !isDirty && !isTouched) {
      return 'REQUIRED';
    }
    if (isError) {
      return 'ERROR';
    }
    if (hasValue && !isError && isDirty) {
      return 'USER_FULFILLED';
    }

    return 'FULFILLED';
  };

  const isFieldRequired = getFieldStatus() === 'REQUIRED';
  const isFieldError = getFieldStatus() === 'ERROR';
  const isFulfilled = getFieldStatus() === 'USER_FULFILLED';

  const handleChange: ChangeHandler<TChangeEvent> = React.useCallback(
    (event) => {
      field.onChange(event);
      onChange && onChange(event);
    },
    [field, onChange]
  );

  const handleBlur = React.useCallback(
    (event) => {
      field.onBlur(event);
      onBlur && onBlur(event);
    },
    [field, onBlur]
  );

  const HelperTextComponent = React.useMemo(() => {
    if (isFieldError) {
      return (
        <>
          <WarningIcon color="error" sx={WARNING_ICON_STYLES} />
          <Typography
            component="span"
            sx={(theme: Theme) => theme.typography.helper}
          >
            {errorMessage}
          </Typography>
        </>
      );
    }
    if (isFieldRequired) {
      return (
        <>
          <WarningIcon color="disabled" sx={WARNING_ICON_STYLES} />
          <Typography
            component="span"
            sx={(theme: Theme) => theme.typography.helper}
          >
            Required
          </Typography>
        </>
      );
    }
    if (isFulfilled) {
      return (
        <VerifiedIcon
          sx={{color: 'var(--color-textSuccessGreen)', ...SUCCESS_ICON_STYLES}}
        />
      );
    }
    return ' '; // return something so UI space always exists
  }, [isFieldError, isFieldRequired, isFulfilled, errorMessage]);

  return {
    formikField: {field, meta, helpers},
    fieldState: {
      errorMessage,
      isTouched,
      isError,
      isFieldError,
      isFieldRequired,
      isFulfilled,
    },
    fieldHelpers: {handleBlur, handleChange, HelperTextComponent},
  };
}

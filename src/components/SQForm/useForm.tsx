import React from 'react';
import isEqual from 'lodash.isequal';
import {getIn, useField} from 'formik';
import {
  NewReleases as WarningIcon,
  VerifiedUser as VerifiedIcon,
} from '@material-ui/icons';
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

const HELPER_TEXT_STYLE = {
  marginRight: '2px',
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.4px',
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
          <WarningIcon
            style={{
              color: 'var(--color-textWarningYellow)',
              ...HELPER_TEXT_STYLE,
            }}
          />
          <span
            style={{
              color: 'var(--color-textWarningYellow)',
              ...HELPER_TEXT_STYLE,
            }}
          >
            {errorMessage}
          </span>
        </>
      );
    }
    if (isFieldRequired) {
      return (
        <>
          <WarningIcon
            style={{color: 'var(--color-stone)', ...HELPER_TEXT_STYLE}}
          />
          <span style={{color: 'var(--color-granite)', ...HELPER_TEXT_STYLE}}>
            Required
          </span>
        </>
      );
    }
    if (isFulfilled) {
      return (
        <VerifiedIcon
          style={{color: 'var(--color-palmLeaf)', ...HELPER_TEXT_STYLE}}
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

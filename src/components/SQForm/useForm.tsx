import React from 'react';
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  getIn,
  useField,
} from 'formik';
import isEqual from 'lodash.isequal';
import WarningIcon from '@material-ui/icons/NewReleases';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

interface UseFormParam {
  name: string;
  onBlur?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler;
}

interface UseFormReturn {
  formikField: {
    field: FieldInputProps<unknown>;
    meta: FieldMetaProps<unknown>;
    helpers: FieldHelperProps<unknown>;
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
    handleChange: React.ChangeEventHandler;
    HelperTextComponent: React.ReactElement | string;
  };
}

const SPACE_STYLE = {marginRight: '0.3333rem'};

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

export function useForm({name, onBlur, onChange}: UseFormParam): UseFormReturn {
  _handleError(name);

  const [field, meta, helpers] = useField(name);
  const errorMessage = getIn(meta, 'error');
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

  const handleChange = React.useCallback(
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
          <WarningIcon color="error" style={SPACE_STYLE} />
          {errorMessage}
        </>
      );
    }
    if (isFieldRequired) {
      return (
        <>
          <WarningIcon color="disabled" style={SPACE_STYLE} />
          Required
        </>
      );
    }
    if (isFulfilled) {
      return (
        <VerifiedIcon
          style={{color: 'var(--color-palmLeaf)', ...SPACE_STYLE}}
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

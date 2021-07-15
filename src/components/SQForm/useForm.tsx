import React from 'react';
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  getIn,
  useField
} from 'formik';
import WarningIcon from '@material-ui/icons/NewReleases';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

type ChangeHandler<ChangeEventType> = (
  event: React.ChangeEvent<ChangeEventType>,
  ...args: any[]
) => void;

interface UseFormParam<ChangeEventType> {
  name: string;
  isRequired: boolean;
  onBlur?: React.FocusEventHandler;
  onChange?: ChangeHandler<ChangeEventType>;
}

interface UseFormReturn<ChangeEventType> {
  useFormikField: <Value extends unknown>() => [
    FieldInputProps<Value>,
    FieldMetaProps<Value>,
    FieldHelperProps<Value>
  ];
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
    handleChange: ChangeHandler<ChangeEventType>;
    HelperTextComponent: React.ReactElement | string;
  };
}

const SPACE_STYLE = {marginRight: '0.3333rem'};

function _handleError(name: string, isRequired: boolean) {
  if (typeof name !== 'string') {
    throw new Error('Name is a required param and must be a String!');
  }
  if (typeof isRequired !== 'boolean') {
    throw new Error('isRequired is a required param and must be a Boolean!');
  }
}

function _getIsFulfilled(hasValue: boolean, isError: boolean) {
  if (hasValue && !isError) {
    return true;
  }

  return false;
}

function _getHasValue(meta: FieldMetaProps<unknown>) {
  const fieldValue = getIn(meta, 'value');

  if (Array.isArray(fieldValue)) {
    return !!fieldValue.length;
  }

  if (typeof fieldValue === 'number') {
    return true;
  }

  return !!fieldValue;
}

export function useForm<ChangeEventType>({
  name,
  isRequired,
  onBlur,
  onChange
}: UseFormParam<ChangeEventType>): UseFormReturn<ChangeEventType> {
  _handleError(name, isRequired);

  const useFormikField = <Value extends unknown>() => useField<Value>(name);
  const [field, meta] = useField(name);
  const errorMessage = getIn(meta, 'error');
  const isTouched = getIn(meta, 'touched');
  const hasValue = _getHasValue(meta);
  const isError = !!errorMessage;
  const isFieldError = (isTouched || hasValue) && isError;
  const isFieldRequired = isRequired && !hasValue;
  const isFulfilled = _getIsFulfilled(hasValue, isError);

  const handleChange: ChangeHandler<ChangeEventType> = React.useCallback(
    event => {
      field.onChange(event);
      onChange && onChange(event);
    },
    [field, onChange]
  );

  const handleBlur = React.useCallback(
    event => {
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
    useFormikField,
    fieldState: {
      errorMessage,
      isTouched,
      isError,
      isFieldError,
      isFieldRequired,
      isFulfilled
    },
    fieldHelpers: {handleBlur, handleChange, HelperTextComponent}
  };
}

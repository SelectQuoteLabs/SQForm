import React from 'react';
import {getIn, useField} from 'formik';
import WarningIcon from '@material-ui/icons/NewReleases';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

const SPACE_STYLE = {marginRight: '0.3333rem'};

function _handleError(name, isRequired) {
  if (typeof name !== 'string') {
    throw new Error('Name is a required param and must be a String!');
  }
  if (typeof isRequired !== 'boolean') {
    throw new Error('isRequired is a required param and must be a Boolean!');
  }
}

export function useForm({name, isRequired, onBlur, onChange}) {
  _handleError(name, isRequired);

  const [field, meta, helpers] = useField(name);
  const errorMessage = getIn(meta, 'error');
  const isTouched = getIn(meta, 'touched');
  const isError = !!errorMessage;
  const isFieldError = isTouched && isError;
  const isFieldRequired = !isTouched && isRequired && !getIn(meta, 'value');
  const isFulfilled = isTouched && !isFieldError;

  const handleChange = React.useCallback(
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
    if (isFieldRequired) {
      return (
        <>
          <WarningIcon color="disabled" style={SPACE_STYLE} />
          Required
        </>
      );
    }
    if (isFieldError) {
      return (
        <>
          <WarningIcon color="error" style={SPACE_STYLE} />
          {errorMessage}
        </>
      );
    }
    if (isFulfilled)
      return (
        <VerifiedIcon
          style={{color: 'var(--color-palmLeaf)', ...SPACE_STYLE}}
        />
      );
    return ' '; // return something so DOM element always exists
  }, [errorMessage, isFieldError, isFieldRequired, isFulfilled]);

  return {
    formikField: {field, meta, helpers},
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

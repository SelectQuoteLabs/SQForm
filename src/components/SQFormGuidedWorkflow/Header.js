import React from 'react';
import {useFormikContext} from 'formik';
import {SectionHeader} from 'scplus-shared-components';
import {HeaderPropTypes} from './PropTypes';

const helperTextType = {
  info: 'info',
  error: 'error',
  success: 'success',
  warning: 'warning',
};

function Header({
  actionButton,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState = false,
}) {
  const {isValid, touched} = useFormikContext();
  const isFormTouched = Object.keys(touched).length;

  const shouldRenderInformativeHeading =
    infoText || warningText || errorText || successText;
  const isStaticInformativeHeading = infoText && !isFormTouched;

  const getInformativeHeadingType = () => {
    if (!shouldRenderInformativeHeading) {
      return;
    }

    switch (true) {
      case isFailedState:
        return helperTextType.error;
      case isStaticInformativeHeading:
        return helperTextType.info;
      case isValid:
        return helperTextType.success;
      default:
        return helperTextType.warning;
    }
  };

  const informativeHeadingType = getInformativeHeadingType();

  const helperTextMap = {
    [helperTextType.info]: infoText,
    [helperTextType.error]: errorText,
    [helperTextType.success]: successText,
    [helperTextType.warning]: warningText,
  };

  const getInformativeHeadingText = () => {
    if (!shouldRenderInformativeHeading) {
      return;
    }

    return helperTextMap[informativeHeadingType];
  };

  return (
    <SectionHeader
      title={title}
      informativeHeading={getInformativeHeadingText()}
      type={informativeHeadingType}
    >
      {actionButton}
    </SectionHeader>
  );
}

Header.propTypes = HeaderPropTypes;

export default Header;

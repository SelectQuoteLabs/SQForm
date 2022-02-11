import React from 'react';
import {useFormikContext} from 'formik';
import {SectionHeader} from 'scplus-shared-components';
import type {SQFormGuidedWorkflowHeaderProps} from './Types';

const helperTextType = {
  info: 'info',
  error: 'error',
  success: 'success',
  warning: 'warning',
};

function Header({
  actions,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState = false,
}: SQFormGuidedWorkflowHeaderProps): React.ReactElement {
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
    if (!shouldRenderInformativeHeading || !informativeHeadingType) {
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
      {actions}
    </SectionHeader>
  );
}

export default Header;

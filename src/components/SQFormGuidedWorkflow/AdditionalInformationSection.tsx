import React from 'react';
import {Section, SectionBody} from 'scplus-shared-components';
import Header from './Header';
import type {SQFormGuidedWorkflowAdditionalInformationProps} from './Types';

function AdditionalInformationSection({
  actions,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  Elements,
}: SQFormGuidedWorkflowAdditionalInformationProps): React.ReactElement {
  return (
    <Section>
      <Header
        actions={actions}
        title={title}
        infoText={infoText}
        warningText={warningText}
        errorText={errorText}
        successText={successText}
        isFailedState={isFailedState}
      />
      <SectionBody>{Elements}</SectionBody>
    </Section>
  );
}

export default AdditionalInformationSection;

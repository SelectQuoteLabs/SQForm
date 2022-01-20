import React from 'react';
import {Section, SectionBody} from 'scplus-shared-components';
import {AdditionalInformationPropTypes} from './PropTypes';
import Header from './Header';

function AdditionalInformationSection({
  actionButton,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  Elements,
}) {
  return (
    <Section>
      <Header
        actionButton={actionButton}
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

AdditionalInformationSection.propTypes = AdditionalInformationPropTypes;

export default AdditionalInformationSection;

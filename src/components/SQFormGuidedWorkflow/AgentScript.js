import React from 'react';
import {Section, SectionBody, ScriptedText} from 'scplus-shared-components';
import Header from './Header';
import {AgentScriptPropTypes} from './PropTypes';

function AgentScript({
  actionButton,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  text
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
      <SectionBody>
        <ScriptedText text={text} />
      </SectionBody>
    </Section>
  );
}

AgentScript.propTypes = AgentScriptPropTypes;

export default AgentScript;

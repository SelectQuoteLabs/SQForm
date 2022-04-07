import React from 'react';
import {Section, SectionBody, ScriptedText} from 'scplus-shared-components';
import Header from './Header';
import type {SQFormGuidedWorkflowAgentScriptProps} from './Types';

function AgentScript({
  actions,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  text,
}: SQFormGuidedWorkflowAgentScriptProps): React.ReactElement {
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
      <SectionBody>
        <ScriptedText text={text} />
      </SectionBody>
    </Section>
  );
}

export default AgentScript;

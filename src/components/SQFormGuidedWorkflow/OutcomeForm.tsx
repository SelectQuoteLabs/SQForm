import React from 'react';
import {Grid} from '@material-ui/core';
import {Section, SectionBody} from 'scplus-shared-components';
import Header from './Header';
import type {SQFormGuidedWorkflowOutcomeProps} from './Types';

function OutcomeForm({
  actions,
  FormElements,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  muiGridProps = {},
}: SQFormGuidedWorkflowOutcomeProps): React.ReactElement {
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
        <Grid {...muiGridProps} container spacing={muiGridProps.spacing ?? 2}>
          {FormElements}
        </Grid>
      </SectionBody>
    </Section>
  );
}

export default OutcomeForm;

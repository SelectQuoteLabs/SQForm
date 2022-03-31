import React from 'react';
import {Grid} from '@material-ui/core';
import {Section, SectionBody} from 'scplus-shared-components';
import Header from './Header';
import {OutcomePropTypes} from './PropTypes';

function OutcomeForm({
  actionButton,
  FormElements,
  title,
  infoText,
  warningText,
  errorText,
  successText,
  isFailedState,
  muiGridProps = {},
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
        <Grid {...muiGridProps} container spacing={muiGridProps.spacing ?? 2}>
          {FormElements}
        </Grid>
      </SectionBody>
    </Section>
  );
}

OutcomeForm.propTypes = OutcomePropTypes;

export default OutcomeForm;

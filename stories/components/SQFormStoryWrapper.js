import React from 'react';
import {action} from '@storybook/addon-actions';
import CheckMarkIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import {SQForm, SQFormIconButton} from '../../src';

const withFormikActions = name => (values, formikActions) => {
  formikActions.setSubmitting(false);
  action(name)(values);
};

export const SQFormStoryWrapper = ({
  children,
  initialValues,
  validationSchema,
  muiGridProps
}) => {
  return (
    <SQForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      muiGridProps={{wrap: 'nowrap', ...muiGridProps}}
      onSubmit={withFormikActions('submitted')}
    >
      {children}
      <Grid item size={2} style={{alignSelf: 'center'}}>
        <SQFormIconButton IconComponent={CheckMarkIcon} />
      </Grid>
    </SQForm>
  );
};

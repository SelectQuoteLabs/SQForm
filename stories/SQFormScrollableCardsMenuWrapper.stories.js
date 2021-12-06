import React from 'react';
import * as yup from 'yup';

import {
  SQFormScrollableCardsMenuWrapper,
  SQFormScrollableCard,
  SQFormTextField,
  SQFormCheckbox
} from '../src';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Forms/SQFormScrollableCardsMenuWrapper',
  component: SQFormScrollableCardsMenuWrapper,
  parameters: {
    docs: {page: createDocsPage({showStories: false})}
  }
};

export const sqFormScrollableCardsMenuWrapper = () => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <SQFormScrollableCardsMenuWrapper title="[selected user]">
        <ScrollableDetails label="Details" value="details" />
        <ScrollablePermissions label="Permissions" value="permissions" />
      </SQFormScrollableCardsMenuWrapper>
    </div>
  );
};

function ScrollableDetails() {
  const initialValues = {
    name: ''
  };

  const validationSchema = {
    name: yup.string().required()
  };

  const handleSubmit = (values, actions) => {
    window.alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      title="notApplicableBecauseHeaderDisabled" // bug in SQFormScrollableCard bc it errors if no title prop even though it doesn't render its cardheader
    >
      <SQFormTextField name="name" label="Name" size={12} />
    </SQFormScrollableCard>
  );
}

function ScrollablePermissions() {
  const initialValues = {
    isAdmin: false
  };

  const validationSchema = {
    isAdmin: yup.boolean()
  };

  const handleSubmit = (values, actions) => {
    window.alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      title="notApplicableBecauseHeaderDisabled"
    >
      <SQFormCheckbox name="isAdmin" label="Admin" size={12} />
    </SQFormScrollableCard>
  );
}

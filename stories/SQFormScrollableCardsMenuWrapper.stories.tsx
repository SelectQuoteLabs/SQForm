import * as Yup from 'yup';
import React from 'react';
import {
  SQFormScrollableCardsMenuWrapper,
  SQFormScrollableCard,
  SQFormTextField,
  SQFormCheckbox,
} from '../src';
import {createDocsPage} from '../old_stories/utils/createDocsPage';
import type {FormikHelpers} from 'formik';

export default {
  title: 'Forms/SQFormScrollableCardsMenuWrapper',
  component: SQFormScrollableCardsMenuWrapper,
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

export const sqFormScrollableCardsMenuWrapper = (): React.ReactElement => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <SQFormScrollableCardsMenuWrapper title="[selected user]">
        <ScrollableDetails />
        <ScrollablePermissions />
      </SQFormScrollableCardsMenuWrapper>
    </div>
  );
};

function ScrollableDetails(): React.ReactElement {
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required().min(12),
  });

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    window.alert(JSON.stringify(values, null, 2));
    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm();
  };

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
    >
      <SQFormTextField name="name" label="Name" size={12} />
    </SQFormScrollableCard>
  );
}

function ScrollablePermissions(): React.ReactElement {
  const initialValues = {
    isAdmin: false,
  };

  const validationSchema = Yup.object({
    isAdmin: Yup.boolean(),
  });

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    window.alert(JSON.stringify(values, null, 2));
    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm();
  };

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
    >
      <SQFormCheckbox name="isAdmin" label="Admin" size={12} />
    </SQFormScrollableCard>
  );
}

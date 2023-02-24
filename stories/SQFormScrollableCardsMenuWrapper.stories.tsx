import * as Yup from 'yup';
import React from 'react';
import {
  SQFormScrollableCardsMenuWrapper,
  SQFormScrollableCard,
  SQFormTextField,
  SQFormCheckbox,
} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import type {FormikHelpers} from 'formik';

export default {
  title: 'Forms/SQFormScrollableCardsMenuWrapper',
  component: SQFormScrollableCardsMenuWrapper,
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

export const SQFormScrollableCardsMenuWrapperStoryWrapper =
  (): React.ReactElement => {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <SQFormScrollableCardsMenuWrapper title="[selected user]">
          <ScrollableDetails value="details" label="Details" />
          <ScrollablePermissions value="permissions" label="Permissions" />
        </SQFormScrollableCardsMenuWrapper>
      </div>
    );
  };

function ScrollableDetails({
  value,
  label,
}: {
  value: string;
  label: string;
}): React.ReactElement {
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
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      value={value}
      label={label}
    >
      <SQFormTextField name="name" label="Name" size={12} />
    </SQFormScrollableCard>
  );
}

function ScrollablePermissions({
  value,
  label,
}: {
  value: string;
  label: string;
}): React.ReactElement {
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
      isSelfBounding={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      value={value}
      label={label}
    >
      <SQFormCheckbox name="isAdmin" label="Admin" size={12} />
    </SQFormScrollableCard>
  );
}

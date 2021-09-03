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
  const menuItems = [
    {
      label: 'Details',
      value: 'details'
    },
    {
      label: 'Permissions',
      value: 'permissions'
    }
  ];

  return (
    <div style={{width: '100%', height: '100%'}}>
      <SQFormScrollableCardsMenuWrapper
        title="[selected user]"
        menuItems={menuItems}
      >
        <ScrollableDetails
          id="details" // maps to menuItems[0].value
        />
        <ScrollablePermissions
          id="permissions" // maps to menuItems[1].value
        />
      </SQFormScrollableCardsMenuWrapper>
    </div>
  );
};

function ScrollableDetails() {
  const initialValues = {
    name: ''
  };

  const validationSchema = {
    name: yup.string().required('Required')
  };

  const handleSubmit = (values, actions) => {
    window.alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  /**
   * TODO: This code can/should be removed once this issue is resolved - https://github.com/SelectQuoteLabs/SQForm/issues/436
   * Once this problem is resolved, we can remove this code block below and also remove the wrapper container around our SQFormScrollableCard
   */
  const [calculatedHeight, setCalculatedHeight] = React.useState(0);

  React.useEffect(() => {
    const currentElement = document.getElementById(`ResultContainer`);
    const topOffset = currentElement?.getBoundingClientRect().top;
    const offsetBasedHeight = `calc(100vh - ${topOffset}px - 24px)`;
    const parentHeight = currentElement?.parentElement?.clientHeight;
    const parentTopOffset = currentElement?.parentElement?.getBoundingClientRect()
      .top;
    const topDifferential =
      topOffset && parentTopOffset ? topOffset - parentTopOffset : 0;
    const maxOffsetBasedHeight = `calc(${parentHeight}px - ${topDifferential}px)`;
    const calculatedContainerHeight = `min(${offsetBasedHeight}, ${maxOffsetBasedHeight})`;

    setCalculatedHeight(calculatedContainerHeight);
  }, []);

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      height={calculatedHeight}
      title="notApplicableBecauseHeaderDisabled" // bug in SQFormScrollableCard bc it errors if no title prop even though it doesn't render its cardheader
    >
      <SQFormTextField
        name="name"
        label="Name"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
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
  /**
   * TODO: This code can/should be removed once this issue is resolved - https://github.com/SelectQuoteLabs/SQForm/issues/436
   * Once this problem is resolved, we can remove this code block below and also remove the wrapper container around our SQFormScrollableCard
   */
  const [calculatedHeight, setCalculatedHeight] = React.useState(0);

  React.useEffect(() => {
    const currentElement = document.getElementById(`ResultContainer`);
    const topOffset = currentElement?.getBoundingClientRect().top;
    const offsetBasedHeight = `calc(100vh - ${topOffset}px - 24px)`;
    const parentHeight = currentElement?.parentElement?.clientHeight;
    const parentTopOffset = currentElement?.parentElement?.getBoundingClientRect()
      .top;
    const topDifferential =
      topOffset && parentTopOffset ? topOffset - parentTopOffset : 0;
    const maxOffsetBasedHeight = `calc(${parentHeight}px - ${topDifferential}px)`;
    const calculatedContainerHeight = `min(${offsetBasedHeight}, ${maxOffsetBasedHeight})`;

    setCalculatedHeight(calculatedContainerHeight);
  }, []);

  return (
    <SQFormScrollableCard
      isHeaderDisabled={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      shouldRequireFieldUpdates={true}
      validationSchema={validationSchema}
      height={calculatedHeight}
      title="notApplicableBecauseHeaderDisabled"
    >
      <SQFormCheckbox name="isAdmin" label="Admin" size={12} />
    </SQFormScrollableCard>
  );
}

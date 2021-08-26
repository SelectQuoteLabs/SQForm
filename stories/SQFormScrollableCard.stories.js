import React from 'react';
import * as Yup from 'yup';

import {Paper} from '@material-ui/core';
import {SQFormScrollableCard, SQFormTextField} from '../src';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Forms/SQFormScrollableCard',
  component: SQFormScrollableCard,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
    children: {table: {disable: true}},
    validationSchema: {table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})}
  }
};

const defaultArgs = {
  title: 'Default',
  initialValues: {hello: ''},
  muiGridProps: {
    spacing: 2,
    alignItems: 'center'
  },
  onSubmit: () => {},
  validationSchema: {hello: Yup.string().required('Required')}
};

const Template = args => {
  const {wrapper, validationSchema, ...restArgs} = args;

  const basicCard = (
    <SQFormScrollableCard
      validationSchema={validationSchema}
      shouldRequireFieldUpdates={true}
      {...restArgs}
    >
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(validationSchema)}
      />
    </SQFormScrollableCard>
  );

  return (
    <>{wrapper ? React.cloneElement(wrapper, {}, basicCard) : basicCard}</>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

const SubHeader = () => (
  <Paper elevation={2}>
    <h3 style={{textAlign: 'center', padding: '10px'}}>Sub Header</h3>
  </Paper>
);

export const WithSubHeader = Template.bind({});
WithSubHeader.args = {
  ...defaultArgs,
  SubHeaderComponent: <SubHeader />
};

const Wrapper = ({children}) => (
  <div style={{height: '100%', overflow: 'hidden'}}>
    <Paper
      elevation={2}
      style={{height: '30%', margin: '10px 0', textAlign: 'center'}}
    >
      <h2>Imaginary beatiful content</h2>
    </Paper>
    {children}
  </div>
);

export const WithSelfBoundingHeight = Template.bind({});
WithSelfBoundingHeight.args = {
  ...defaultArgs,
  title: 'With Self-Bounding Height',
  isSelfBounding: true,
  wrapper: <Wrapper />,
  SubHeaderComponent: <SubHeader />
};

export const WithStaticHeight = Template.bind({});
WithStaticHeight.args = {
  ...defaultArgs,
  title: 'With Static Height',
  height: 450,
  SubHeaderComponent: <SubHeader />
};

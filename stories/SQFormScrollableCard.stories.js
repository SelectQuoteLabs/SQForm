import React from 'react';
import * as Yup from 'yup';

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
  }
};

const Template = args => {
  return (
    <SQFormScrollableCard {...args}>
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
      <SQFormTextField
        name="hello"
        label="Hello"
        size={12}
        isRequired={Boolean(args.validationSchema)}
      />
    </SQFormScrollableCard>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  title: 'With Validation',
  validationSchema: {
    hello: Yup.string().required('Required')
  }
};

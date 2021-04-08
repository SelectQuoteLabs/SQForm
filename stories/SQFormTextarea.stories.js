import React from 'react';
import * as Yup from 'yup';

import {SQFormTextarea as SQFormTextareaComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormTextarea',
  component: SQFormTextareaComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

const defaultArgs = {
  label: 'Textarea',
  name: 'textarea'
};

const Template = args => {
  const {schema, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      validationSchema={schema}
    >
      <SQFormTextareaComponent
        {...rest}
        size={args.size !== 'auto' ? Number(args.size) : args.size}
      />
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  isRequired: true,
  schema: {
    [defaultArgs.name]: Yup.string().required('Required')
  }
};
WithValidation.parameters = {
  controls: {exclude: 'schema'}
};

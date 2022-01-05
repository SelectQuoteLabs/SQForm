import React from 'react';
import * as Yup from 'yup';

import {SQFormTextarea as SQFormTextareaComponent} from '../src';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';

export default {
  title: 'Components/SQFormTextarea',
  component: SQFormTextareaComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
};

const defaultArgs = {
  label: 'Textarea',
  name: 'textarea',
};

const Template = (args) => {
  const {schema, SQFormProps, size, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      validationSchema={schema}
      {...SQFormProps}
    >
      <SQFormTextareaComponent {...rest} size={getSizeProp(size)} />
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema: {
    [defaultArgs.name]: Yup.string().required(),
  },
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

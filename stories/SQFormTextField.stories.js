import React from 'react';
import * as Yup from 'yup';

import {SQFormTextField as SQFormTextFieldComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormTextField',
  component: SQFormTextFieldComponent,
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
  label: 'Text Field',
  name: 'textField'
};

const Template = args => {
  const {schema, SQFormProps, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      validationSchema={schema}
      {...SQFormProps}
    >
      <SQFormTextFieldComponent
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

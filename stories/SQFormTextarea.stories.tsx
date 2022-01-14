import React from 'react';
import * as Yup from 'yup';
import { AnySchema } from 'yup';
import type {Story, Meta} from '@storybook/react';

import {SQFormTextarea as SQFormTextareaComponent} from '../src';
import { SQFormTextareaProps } from 'components/SQForm/SQFormTextarea';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import { GridSizeOptions } from './types/storyHelperTypes';

type FormProps = {
  initialValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initialValues'>;

type SQFormTextAreaStory = Story<
  Omit<SQFormTextareaProps, 'size'> &
  {
    size: GridSizeOptions,
    sqFormProps?: FormProps,
    schema: Record<string, AnySchema>,
  }
>

const meta: Meta = {
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

const Template: SQFormTextAreaStory = (args) => {
  const {schema, sqFormProps, size, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      validationSchema={schema}
      {...sqFormProps}
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

export default meta;

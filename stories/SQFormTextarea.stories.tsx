import * as Yup from 'yup';
import React from 'react';
import getSizeProp from '../old_stories/utils/getSizeProp';
import {SQFormTextarea as SQFormTextareaComponent} from '../src';
import {createDocsPage} from '../old_stories/utils/createDocsPage';
import {SQFormStoryWrapper} from '../old_stories/components/SQFormStoryWrapper';
import type {Story, Meta} from '@storybook/react';
import type {SQFormTextareaProps} from 'components/SQForm/SQFormTextarea';
import type {SQFormStoryWrapperProps} from '../old_stories/components/SQFormStoryWrapper';
import type {GridSizeOptions} from '../old_stories/types/storyHelperTypes';

type FormProps = {
  initialValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;

type SQFormTextAreaStory = Story<
  Omit<SQFormTextareaProps, 'size'> & {
    size: GridSizeOptions;
    sqFormProps?: FormProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
  }
>;

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
  schema: Yup.object({
    [defaultArgs.name]: Yup.string().required(),
  }),
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

export default meta;

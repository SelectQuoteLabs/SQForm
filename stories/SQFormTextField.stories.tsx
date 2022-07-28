import * as Yup from 'yup';
import React from 'react';
import getSizeProp from '../old_stories/utils/getSizeProp';
import {SQFormTextField as SQFormTextFieldComponent} from '../src';
import {createDocsPage} from '../old_stories/utils/createDocsPage';
import {SQFormStoryWrapper} from '../old_stories/components/SQFormStoryWrapper';
import type {Story, Meta} from '@storybook/react';
import type {GridSizeOptions} from '../old_stories/types/storyHelperTypes';
import type {SQFormStoryWrapperProps} from '../old_stories/components/SQFormStoryWrapper';
import type {SQFormTextFieldProps} from 'components/SQForm/SQFormTextField';

type SQFormTextFieldStoryType = Story<
  Omit<SQFormTextFieldProps, 'size'> & {
    size?: GridSizeOptions;
    SQFormProps?: {
      initialValues?: SQFormStoryWrapperProps['initialValues'];
    } & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;
  }
>;

export default {
  title: 'Components/SQFormTextField',
  component: SQFormTextFieldComponent,
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
} as Meta;

const defaultArgs = {
  label: 'Text Field',
  name: 'textField',
};

const Template: SQFormTextFieldStoryType = (args) => {
  const {SQFormProps, size, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      {...SQFormProps}
    >
      <SQFormTextFieldComponent {...rest} size={getSizeProp(size)} />
    </SQFormStoryWrapper>
  );
};

export const Default: SQFormTextFieldStoryType = Template.bind({});
Default.args = defaultArgs;

export const WithValidation: SQFormTextFieldStoryType = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  SQFormProps: {
    validationSchema: Yup.object({
      [defaultArgs.name]: Yup.string().required('Required'),
    }),
  },
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

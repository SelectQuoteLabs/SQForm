import {SQFormTextField as SQFormTextFieldComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import type {GridSizeOptions} from './types/storyHelperTypes';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';
import type {Story, Meta} from '@storybook/react';
import type {SQFormTextFieldProps} from 'components/SQForm/SQFormTextField';
import React from 'react';
import * as Yup from 'yup';

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

import React from 'react';
import * as Yup from 'yup';
import * as markdown from '../notes/SQFormDropdown.md';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormDropdown as SQFormDropdownComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {Meta, Story} from '@storybook/react';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import type {GridSizeOptions} from './types/storyHelperTypes';
import type {SQFormDropdownProps} from 'components/fields/SQFormDropdown/SQFormDropdown';

type FormProps = {
  initalValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initalValues' | 'children'>;

type DropdownStoryType = Story<
  Omit<SQFormDropdownProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps?: FormProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
  }
>;

const meta: Meta = {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {table: {disable: true}},
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
    sqFormProps: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown}),
      source: {
        type: 'code',
      },
    },
  },
};

const MOCK_STATE_OPTIONS = [
  {label: 'Arizona', value: 'AZ'},
  {label: 'Kansas', value: 'KS', isDisabled: true},
  {label: 'Missouri', value: 'MO'},
];

const questions = [
  'What benefits do you use more often?',
  "Are there benefits that you don't use today, but would like to learn if you have them?",
  'Are there any quesions that you have about your plan?',
];

const defaultArgs = {
  label: 'Is there anything else you would like your plan to do for you?',
  name: 'state',
  children: MOCK_STATE_OPTIONS,
  sqFormProps: {
    initialValues: {state: ''},
  },
};

const validationSchema = Yup.object({
  [defaultArgs.name]: Yup.string().required('Required'),
});

const Template: DropdownStoryType = (args) => {
  const {sqFormProps, schema, size, ...dropdownProps} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        {...defaultArgs.sqFormProps}
        validationSchema={schema}
        {...sqFormProps}
      >
        <SQFormDropdownComponent
          {...dropdownProps}
          size={getSizeProp(size)}
          questions={questions}
        />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'Default';

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema: validationSchema,
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

export default meta;

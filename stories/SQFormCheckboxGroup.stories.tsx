import * as Yup from 'yup';
import React from 'react';
import {SQFormCheckboxGroup as SQFormCheckboxGroupComponent} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {Story, Meta} from '@storybook/react';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import type {SQFormCheckboxGroupProps} from 'components/fields/SQFormCheckboxGroup/SQFormCheckboxGroup';

export default {
  title: 'Components/SQFormCheckboxGroup',
  component: SQFormCheckboxGroupComponent,
  argTypes: {
    name: {table: {disable: true}},
    children: {table: {disable: true}},
    SQFormProps: {table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

const SHOPPING_LIST_OPTIONS = [
  {label: 'Voltfruit', value: 'voltfruit'},
  {label: 'Sunshroom', value: 'sunshroom'},
  {label: 'Bokoblin Guts', value: 'bokoblin guts'},
  {label: 'Lynel Hoof', value: 'lynel hoof'},
  {label: 'Stealthfin Trout', value: 'stealthfin trout'},
];

const defaultArgs = {
  groupLabel: 'Shopping List',
  name: 'shoppingList',
  children: SHOPPING_LIST_OPTIONS,
  initialValues: {shoppingList: []},
};

type CheckboxGroupTestProps = SQFormCheckboxGroupProps & {
  initialValues: Record<string, string[] | boolean>;
  schema: SQFormStoryWrapperProps['validationSchema'];
};

export const Default: Story<CheckboxGroupTestProps> = (args) => {
  return (
    <SQFormStoryWrapper
      initialValues={args.initialValues}
      showSubmit={true}
      validationSchema={undefined}
      muiGridProps={{}}
    >
      <SQFormCheckboxGroupComponent {...args} />
    </SQFormStoryWrapper>
  );
};

Default.args = defaultArgs;

export const WithValidation: Story<CheckboxGroupTestProps> = (args) => {
  return (
    <SQFormStoryWrapper
      initialValues={args.initialValues}
      showSubmit={true}
      validationSchema={args.schema}
      muiGridProps={{}}
    >
      <SQFormCheckboxGroupComponent {...args} />
    </SQFormStoryWrapper>
  );
};

WithValidation.args = {
  ...defaultArgs,
  schema: Yup.object({
    [defaultArgs.name]: Yup.array().required().min(1, 'Required'),
  }),
};

WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

import * as markdown from '../notes/SQFormReadOnlyField.md';
import {SQFormReadOnlyField as SQFormReadOnlyFieldComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {GridSizeOptions} from './types/storyHelperTypes';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';
import type {Story, Meta} from '@storybook/react';
import type {SQFormReadOnlyFieldProps} from 'components/SQForm/SQFormReadOnlyField';
import React from 'react';

type SQFormReadOnlyFieldStory = Story<
  Omit<SQFormReadOnlyFieldProps, 'size'> & {
    size?: GridSizeOptions;
    initialValue?: string;
  }
>;

const meta: Meta = {
  title: 'Components/SQFormReadOnlyField',
  component: SQFormReadOnlyFieldComponent,
  argTypes: {
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown}),
    },
  },
};

const defaultArgs = {
  label: 'ReadOnly Field',
  name: 'readOnlyField',
};

const Template: SQFormReadOnlyFieldStory = ({initialValue = '', ...args}) => {
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: initialValue}}
      showSubmit={false}
    >
      <SQFormReadOnlyFieldComponent {...args} size={getSizeProp(args.size)} />
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  ...defaultArgs,
  initialValue: 'Hello world!',
};
WithInitialValue.parameters = {
  controls: {exclude: 'initialValue'},
};

export default meta;

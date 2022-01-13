import React from 'react';
import {Story, Meta} from '@storybook/react';

import {SQFormReadOnlyField as SQFormReadOnlyFieldComponent} from '../src';
import type {SQFormReadOnlyFieldProps} from 'components/SQForm/SQFormReadOnlyField';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';
import type {gridOptions} from './utils/getSizeProp';
import * as markdown from '../notes/SQFormReadOnlyField.md';

type SQFormReadOnlyFieldStory = Story<
  Omit<SQFormReadOnlyFieldProps, 'size'> & {
    size?: gridOptions;
    initialValue?: string;
  }
>

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
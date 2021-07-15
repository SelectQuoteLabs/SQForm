import React from 'react';
import {GridSize} from '@material-ui/core';
import {Story, Meta} from '@storybook/react';
import {SQFormReadOnlyField as SQFormReadOnlyFieldComponent} from '../src';
import {SQFormReadOnlyFieldProps} from '../src/components/SQForm/SQFormReadOnlyField';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormReadOnlyField.md';

interface SQFormStoryWrapperProps extends SQFormReadOnlyFieldProps {
  initialValue: string | number;
}

export default {
  title: 'Components/SQFormReadOnlyField',
  component: SQFormReadOnlyFieldComponent,
  argTypes: {
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown})
    }
  }
} as Meta;

const defaultArgs = {
  label: 'ReadOnly Field',
  name: 'readOnlyField'
};

const Template: Story<SQFormStoryWrapperProps> = ({
  initialValue = '',
  ...args
}) => {
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: initialValue}}
      validationSchema={{}}
      muiGridProps={{}}
    >
      <SQFormReadOnlyFieldComponent
        {...args}
        size={
          (args.size !== 'auto' ? Number(args.size) : args.size) as GridSize
        }
      />
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  ...defaultArgs,
  initialValue: 'Hello world!'
};
WithInitialValue.parameters = {
  controls: {exclude: 'initialValue'}
};

import * as Yup from 'yup';
import React from 'react';
import getSizeProp from '../old_stories/utils/getSizeProp';
import markdown from '../notes/SQFormMultiValue.md';
import {SQFormMultiValue as SQFormMultiValueComponent} from '../src';
import {SQFormStoryWrapper} from '../old_stories/components/SQFormStoryWrapper';
import {createDocsPage} from '../old_stories/utils/createDocsPage';
import type {CustomStory} from '../old_stories/types/storyHelperTypes';
import type {SQFormMultiValueProps} from 'components/SQForm/SQFormMultiValue';

export default {
  title: 'Components/SQFormMultiValue',
  component: SQFormMultiValueComponent,
  argTypes: {
    children: {table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
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

const MOCK_COLOR_OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Orange', value: 'orange'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
  {label: 'Indigo', value: 'indigo'},
  {label: 'Violet', value: 'violet'},
];

const defaultArgs = {
  label: 'Favorite Colors',
  name: 'favoriteColors',
  children: MOCK_COLOR_OPTIONS,
};

const Template: CustomStory<SQFormMultiValueProps> = (args) => {
  const {sqFormProps, schema, size, ...componentProps} = args;

  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: ['red', 'green', 'Custom Option']}}
        validationSchema={schema}
        {...sqFormProps}
      >
        <SQFormMultiValueComponent
          {...componentProps}
          name={defaultArgs.name}
          label={defaultArgs.label}
          size={getSizeProp(size)}
        />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema: Yup.object({
    favoriteColors: Yup.array()
      .of(
        Yup.lazy((value: unknown) => {
          return typeof value === 'number' ? Yup.number() : Yup.string();
        }) as never
      )
      .required()
      .min(1, 'Required'),
  }),
  sqFormProps: {
    initialValues: {favoriteColors: []},
  },
};

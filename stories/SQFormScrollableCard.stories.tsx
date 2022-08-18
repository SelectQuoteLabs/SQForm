import * as Yup from 'yup';
import React from 'react';

import {Paper} from '@mui/material';
import {SQFormScrollableCard, SQFormTextField} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import type {GridProps} from '@mui/material';
import type {CustomStory} from './types/storyHelperTypes';
import type {SQFormScrollableCardProps} from 'components/SQFormScrollableCard/SQFormScrollableCard';

type SQFormScrollableCardStoryProps<Values> =
  SQFormScrollableCardProps<Values> & {
    wrapper: React.ReactElement;
  };

export default {
  title: 'Forms/SQFormScrollableCard',
  component: SQFormScrollableCard,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
    children: {table: {disable: true}},
    validationSchema: {table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

const spacing: GridProps['spacing'] = 2;
const defaultArgs = {
  title: 'Default',
  initialValues: {hello: ''},
  muiGridProps: {
    spacing,
    sx: {
      alignItems: 'center',
    },
  },
  onSubmit: () => {
    /* do nothing */
  },
  validationSchema: Yup.object({hello: Yup.string().required().min(15)}),
};

const Template: CustomStory<
  SQFormScrollableCardStoryProps<{[key: string]: unknown}>
> = (args): React.ReactElement => {
  const {wrapper, validationSchema, initialValues, ...restArgs} = args;

  const basicCard = (
    <SQFormScrollableCard<typeof initialValues>
      validationSchema={validationSchema}
      shouldRequireFieldUpdates={true}
      initialValues={initialValues}
      {...restArgs}
    >
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
      <SQFormTextField name="hello" label="Hello" size={12} />
    </SQFormScrollableCard>
  );

  return (
    <>{wrapper ? React.cloneElement(wrapper, {}, basicCard) : basicCard}</>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const CardContentStyles = Template.bind({});
CardContentStyles.args = {
  ...defaultArgs,
  cardContentStyles: {
    padding: `0 16px`,
  },
};

const SubHeader = () => (
  <Paper elevation={2}>
    <h3 style={{textAlign: 'center', padding: '10px'}}>Sub Header</h3>
  </Paper>
);

export const WithSubHeader = Template.bind({});
WithSubHeader.args = {
  ...defaultArgs,
  SubHeaderComponent: <SubHeader />,
};

const Wrapper = ({children}: {children?: React.ReactElement}) => (
  <div style={{height: '100%', overflow: 'hidden'}}>
    <Paper
      elevation={2}
      style={{height: '30%', margin: '10px 0', textAlign: 'center'}}
    >
      <h2>Imaginary beatiful content</h2>
    </Paper>
    {children}
  </div>
);

export const WithSelfBoundingHeight = Template.bind({});
WithSelfBoundingHeight.args = {
  ...defaultArgs,
  title: 'With Self-Bounding Height',
  isSelfBounding: true,
  wrapper: <Wrapper />,
  SubHeaderComponent: <SubHeader />,
};

export const WithStaticHeight = Template.bind({});
WithStaticHeight.args = {
  ...defaultArgs,
  title: 'With Static Height',
  height: 450,
  SubHeaderComponent: <SubHeader />,
};

export const WithRoundedCorners = Template.bind({});
WithRoundedCorners.args = {
  ...defaultArgs,
  title: 'With Rounded Corners',
  isSquareCorners: false,
};

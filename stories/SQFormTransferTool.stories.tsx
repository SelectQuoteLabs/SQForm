import React from 'react';
import {SQFormTransferTool} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import type {Story, Meta} from '@storybook/react';
import type {SQFormTransferToolProps} from 'components/SQFormTransferTool/SQFormTransferTool';

type SQFormTransferToolStory = Story<SQFormTransferToolProps>;

function getMockData(
  indexes: number[] = [0]
): SQFormTransferToolProps['transferProducts'] {
  return indexes.map((idx) => ({
    productID: 2 + idx,
    productTag: 'Product Tag ' + idx,
    productDisplayName: 'Product Name ' + idx,
    modalLinkText: `Transfer to div ${idx}`, // any longer than this and the button will truncate
    transferLine: '7777777777',
    enabled: idx < 3,
    steps: [
      {
        type: 'transfer',
        id: 1 + idx,
        text: null,
        options: null,
        condition: {
          logicalOperator: 'and',
          answers: [
            {questionId: 1, answerId: 2},
            {questionId: 2, answerId: 2},
            {questionId: 3, answerId: 2},
          ],
        },
      },
      {
        type: 'question',
        id: 2 + idx,
        text: 'First Question',
        options: [
          {
            value: 1,
            label: 'Yes',
          },
          {
            value: 2,
            label: 'No',
          },
        ],
        condition: null,
      },
      {
        type: 'scripting',
        id: 3 + idx,
        text: 'This is the scripting',
        options: null,
        condition: {
          logicalOperator: 'and',
          answers: [{questionId: 1, answerId: 2}],
        },
      },
      {
        type: 'question',
        id: 4 + idx,
        text: 'Question 2',
        options: [
          {
            value: 1,
            label: 'an option',
          },
          {
            value: 2,
            label: 'another option',
          },
          {
            value: 3,
            label: 'final',
          },
        ],
        condition: {
          logicalOperator: `or`,
          answers: [
            {
              questionId: 1,
              answerId: 2,
            },
            {
              questionId: 3,
              answerId: 1,
            },
          ],
        },
      },
    ],
  }));
}

const meta: Meta = {
  title: 'Forms/SQFormTransferTool',
  component: SQFormTransferTool,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

const defaultArgs = {
  title: 'Default',
  onSave: console.log,
  isOpen: false,
  transferProducts: getMockData([1, 2]),
  isLoading: false,
};

const Template: SQFormTransferToolStory = (args): React.ReactElement => {
  return (
    <>
      <h1>
        Toggle the TransferTool's <code>isOpen</code> state in the Controls tab
      </h1>
      <SQFormTransferTool {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  ...defaultArgs,
  transferProducts: getMockData([2, 7, 1]),
};

export const WithScriptingCondition = Template.bind({});
WithScriptingCondition.args = {
  ...defaultArgs,
  transferProducts: getMockData([0, 2]),
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  ...defaultArgs,
  isLoading: true,
};

export default meta;

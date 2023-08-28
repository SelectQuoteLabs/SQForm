import React from 'react';
import {SQFormTransferTool} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import type {Story, Meta} from '@storybook/react';
import type {SQFormTransferToolProps} from 'components/SQFormTransferTool/SQFormTransferTool';
import type {
  Step,
  TransferProduct,
  TransferStep,
} from 'components/SQFormTransferTool/types';

type SQFormTransferToolStory = Story<SQFormTransferToolProps>;

enum MOCK_IDs {
  QUESTION_ONE_ID,
  QUESTION_TWO_ID,
  QUESTION_THREE_ID,
  QUESTION_FOUR_ID,
  SCRIPTING_ONE_ID,
  SCRIPTING_TWO_ID,
  SCRIPTING_THREE_ID,
  SCRIPTING_FOUR_ID,
  TRANSFER_ONE_ID,
}

const questionStepOne: Step = {
  type: 'question',
  id: MOCK_IDs.QUESTION_ONE_ID,
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
};

const questionStepTwo: Step = {
  type: 'question',
  id: MOCK_IDs.QUESTION_TWO_ID,
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
  condition: null,
};

const conditionExample = {
  answers: [
    {
      questionId: MOCK_IDs.QUESTION_ONE_ID,
      answerId: 2,
    },
    {
      questionId: MOCK_IDs.QUESTION_TWO_ID,
      answerId: 1,
    },
  ],
};

// demonstrates AND logic
const questionStepThree: Step = {
  type: 'question',
  id: MOCK_IDs.QUESTION_THREE_ID,
  text: 'Question 3',
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
    ...conditionExample,
    logicalOperator: 'and',
  },
};

// demonstrates OR logic
const questionStepFour: Step = {
  type: 'question',
  id: MOCK_IDs.QUESTION_FOUR_ID,
  text: 'Question 4',
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
    ...conditionExample,
    logicalOperator: 'or',
  },
};

const stepScriptOne: Step = {
  type: 'script',
  id: MOCK_IDs.SCRIPTING_ONE_ID,
  text: 'Question 3 demonstrates AND logic, pick no for question one AND "an option" for question two',
  options: null,
  condition: null,
};

const stepScriptTwo: Step = {
  ...stepScriptOne,
  id: MOCK_IDs.SCRIPTING_TWO_ID,
  text: 'Question 4 demonstrates OR logic, pick either "no" for question one OR "an option for question two',
};

const stepScriptThree: Step = {
  ...stepScriptOne,
  id: MOCK_IDs.SCRIPTING_THREE_ID,
  text: 'The transfer button can also depend on question answers, select "Yes" for question 1',
};

const stepScriptFour: Step = {
  ...stepScriptOne,
  id: MOCK_IDs.SCRIPTING_FOUR_ID,
  text: 'Script steps are also conditional, this script is shown on the same condition that enables question 4',
  condition: questionStepFour.condition,
};

const stepTransfer: TransferStep = {
  type: 'transfer',
  id: MOCK_IDs.TRANSFER_ONE_ID,
  text: null,
  options: null,
  condition: {
    logicalOperator: 'or',
    answers: [
      {
        questionId: MOCK_IDs.QUESTION_ONE_ID,
        answerId: 1,
      },
    ],
  },
};

const conditionalMock: TransferProduct = {
  productID: 222,
  productTag: 'Product Tag',
  // Note the product name and transfer button text have to share space
  productDisplayName: 'Conditional Example',
  modalLinkText: `Transfer to DIV AB`,
  transferLine: '7777777777',
  enabled: true,
  steps: [
    stepTransfer,
    questionStepOne,
    questionStepTwo,
    stepScriptOne,
    questionStepThree,
    stepScriptTwo,
    questionStepFour,
    stepScriptThree,
    stepScriptFour,
  ],
};

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
        condition: null,
      },
      {
        type: 'question',
        id: MOCK_IDs.QUESTION_ONE_ID + idx,
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
        condition: null,
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
        condition: null,
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
  onTransfer: console.log,
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
  title: 'With Disabled',
  transferProducts: getMockData([2, 7, 1]),
};

export const WithConditions = Template.bind({});
WithConditions.args = {
  ...defaultArgs,
  title: 'With Conditions',
  transferProducts: [conditionalMock],
  loadingMessage: 'Loading Conditional Example...',
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  ...defaultArgs,
  title: 'Is Loading example',
  isLoading: true,
};

export default meta;

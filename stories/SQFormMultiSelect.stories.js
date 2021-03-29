import React from 'react';

import {SQForm, SQFormMultiSelect as SQFormMultiSelectComponent} from '../src';

export default {
  title: 'Components/SQFormMultiSelect',
  component: SQFormMultiSelectComponent,
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
};

const MOCK_FORM_FOR_MULTISELECT = {
  friends: []
};

const MOCK_FRIENDS_OPTIONS = [
  {label: 'Joe', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jane', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jack', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jill', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'John', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jocelyn', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jacob', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jackson', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Josh', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Joseph', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jeremy', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Joel', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jonah', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Judah', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jimmy', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jessica', value: random(10 + Math.ceil(Math.random() * 20))}
];

export const SQFormMultiSelect = args => (
  <div style={{minWidth: 250}}>
    <SQForm initialValues={MOCK_FORM_FOR_MULTISELECT} onSubmit={() => {}}>
      <SQFormMultiSelectComponent name="friends" label="Friends" {...args}>
        {MOCK_FRIENDS_OPTIONS}
      </SQFormMultiSelectComponent>
    </SQForm>
  </div>
);
SQFormMultiSelect.storyName = 'SQFormMultiSelect';

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

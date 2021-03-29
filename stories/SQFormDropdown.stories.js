import React from 'react';
import {withKnobs, boolean, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import Card from '@material-ui/core/Card';
import {SQForm, SQFormDropdown} from '../src';

export default {
  title: 'SQFormDropdown',
  decorators: [withKnobs]
};

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
  actions.resetForm();
};

export const BasicDropdown = () => {
  const initialValues = {
    dropdownExample: ''
  };
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormDropdown
          name="dropdownExample"
          label="Dropdown Example"
          displayEmpty={boolean('Display Empty Value')}
          isDisabled={boolean('Disable Dropdown')}
          isRequired={boolean('Require Dropdown')}
          onBlur={action('On Blur')}
          onChange={action('On Change')}
          size={number('Size')}
        >
          {[
            {
              label: 'Option 1',
              value: 1,
              isDisabled: boolean('Disable Option 1')
            },
            {label: 'Option 2', value: 2},
            {label: 'Option 3', value: 3}
          ]}
        </SQFormDropdown>
      </SQForm>
    </Card>
  );
};

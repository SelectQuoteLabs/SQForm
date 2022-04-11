import React from 'react';
import {Story, Meta} from '@storybook/react';
import Card from '@material-ui/core/Card';
import {SQFormReadOnly as SQFormReadOnlyComponent, MASKS} from '../src';
import type {SQFormReadOnlyProps, SQFormMaskedReadOnlyFieldProps} from '../src';
import type {GridSizeOptions} from './types/storyHelperTypes';

const MOCK_INITIAL_VALUES = {
  firstName: 'Jane',
  lastName: 'Doe',
  preferredName: '',
  email: '',
  birthDate: '01-01-1960',
  gender: 'Female',
  address1: '',
  address2: '',
  city: '',
  zip: 66202,
  state: 'Kansas',
  county: 'Johnson',
};

const readOnlyFields: SQFormMaskedReadOnlyFieldProps[] = [
  {
    label: 'First Name',
    name: 'firstName',
    size: 2,
  },
  {
    label: 'Last Name',
    name: 'lastName',
    size: 2,
  },
  {
    label: 'Preferred Name',
    name: 'preferredName',
    size: 2,
  },
  {
    label: 'Email',
    name: 'email',
    size: 2,
  },
  {
    label: 'Birthday',
    name: 'birthDate',
    size: 2,
    mask: MASKS.date,
  },
  {
    label: 'Gender',
    name: 'gender',
    size: 2,
  },
  {
    label: 'Residential Address Line 1',
    name: 'address1',
    size: 2,
  },
  {
    label: 'Residential Address Line 2',
    name: 'address2',
    size: 2,
  },
  {
    label: 'City',
    name: 'city',
    size: 2,
  },
  {
    label: 'Zip',
    name: 'zip',
    size: 2,
  },
  {
    label: 'State',
    name: 'state',
    size: 2,
  },
  {
    label: 'County',
    name: 'county',
    size: 2,
  },
];

type SQFormReadOnlyStory = Story<
  Omit<SQFormReadOnlyProps<typeof MOCK_INITIAL_VALUES>, 'size'> & {
    size?: GridSizeOptions;
  }
>;

const meta: Meta = {
  title: 'forms/SQFormReadOnly',
  component: SQFormReadOnlyComponent,
  argTypes: {
    name: {table: {disable: true}},
  },
};

const defaultArgs = {
  initialValues: MOCK_INITIAL_VALUES,
  readOnlyFields,
};

const Template: SQFormReadOnlyStory = (args): JSX.Element => {
  return (
    <Card raised style={{padding: 20, width: 1200}}>
      <SQFormReadOnlyComponent {...args} />
    </Card>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default meta;

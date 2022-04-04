import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import * as Yup from 'yup';

import {
  SQFormInclusionList as SQFormInclusionListComponent,
  SQFormInclusionListItem,
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import type {FieldArrayRenderProps} from 'formik';
import type {CustomStory} from './types/storyHelperTypes';
import type {SQFormInclusionListProps} from 'components/SQForm/SQFormInclusionList';

export default {
  title: 'Components/SQFormInclusionList',
  component: SQFormInclusionListComponent,
  argTypes: {
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
};

const MOCK_FORM_FOR_CHECKBOX_GROUP = {
  friends: ['Joe', 'Jane', 'Jack', 'Jill'],
  selectAll: false,
};
const names = [
  'Jim',
  'Jake',
  'John',
  'Jose',
  'Jaipal',
  'Joe',
  'Jane',
  'Jack',
  'Jill',
];

const defaultArgs = {
  name: 'friends',
  selectAllData: names,
  selectAllContainerProps: {
    style: {
      padding: '0 16px',
    },
  },
  selectAllProps: {
    label: 'ALL THE PEEPS',
  },
  children: (arrayHelpers: FieldArrayRenderProps) => {
    const {values} = arrayHelpers.form;
    return (
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{
          height: 200,
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        {names.map((name) => {
          return (
            <Grid item key={name}>
              <SQFormInclusionListItem
                name="friends"
                label={name}
                isChecked={values?.friends?.includes(name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    arrayHelpers.push(name);
                  } else {
                    const idx = values.friends.indexOf(name);
                    arrayHelpers.remove(idx);
                  }
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  },
};

const Template: CustomStory<SQFormInclusionListProps> = (args) => {
  const {schema, sqFormProps, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_FORM_FOR_CHECKBOX_GROUP}
      validationSchema={schema}
      {...sqFormProps}
    >
      <Card raised style={{minWidth: 250, padding: 16}}>
        <SQFormInclusionListComponent {...rest} />
      </Card>
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema: Yup.object({
    friends: Yup.array().min(5),
  }),
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

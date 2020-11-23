import React from 'react';
import * as Yup from 'yup';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CheckMarkIcon from '@material-ui/icons/CheckCircle';
import {SectionHeader} from 'scplus-shared-components';

import FriendsFieldArray from './components/FriendsFieldArray';
import FormValidationMessage from './components/FormValidationMessage';
import markdown from '../notes/SQForm.md';

import {
  SQForm,
  SQFormTextarea,
  SQFormTextField,
  SQFormButton,
  SQFormIconButton,
  SQFormAutocomplete,
  SQFormCheckbox,
  SQFormDropdown,
  SQFormReadOnlyField,
  SQFormResetButtonWithConfirmation,
  SQFormCheckboxGroup,
  SQFormCheckboxGroupItem,
  SQFormMultiSelect
} from '../src';

export default {
  title: 'SQForm',
  decorators: [withKnobs, withInfo],
  parameters: {
    notes: {markdown}
  }
};

const MOCK_AUTOCOMPLETE_OPTIONS = Array.from(new Array(10000))
  .map(() => {
    const randomValue = random(10 + Math.ceil(Math.random() * 20));
    return {label: randomValue, value: randomValue};
  })
  .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()));

const ACTIONS_AUTOCOMPLETE_OPTIONS = [
  {label: 'Action 1', value: 1},
  {label: 'Action 2', value: 2}
];

const MOCK_FORM_ENTITY = {
  firstName: '',
  lastName: '',
  city: '',
  age: '',
  state: '',
  tenThousandOptions: '',
  note: ''
};

const MOCK_ACTIONS_FORM_ENTITY = {
  actions: '',
  note: ''
};

const MOCK_FORM_WITH_BOOLEANS_ENTITY = {
  ...MOCK_FORM_ENTITY,
  hobby: '',
  cool: false,
  lame: false
};

const MOCK_FORM_FOR_FIELD_ARRAY = {
  ...MOCK_FORM_ENTITY,
  friends: ['Joe', 'Jane', 'Jack', 'Jill']
};

const MOCK_FORM_FOR_CHECKBOX_GROUP = {
  friends: ['Joe', 'Jane', 'Jack', 'Jill'],
  selectAll: false
};

const MOCK_STATE_OPTIONS = [
  {label: 'Arizona', value: 'AZ'},
  {label: 'Kansas', value: 'KS'},
  {label: 'Missouri', value: 'MO'}
];

const MOCK_FORM_FOR_MULTISELECT = {
  friends: []
};

const MOCK_FRIENDS_OPTIONS = [
  {label: 'Joe', value: 'Joe'},
  {label: 'Jane', value: 'Jane'},
  {label: 'Jack', value: 'Jack'},
  {label: 'Jill', value: 'Jill'}
];

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
  actions.resetForm();
};

export const basicForm = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_WITH_BOOLEANS_ENTITY}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormTextField name="firstName" label="First name" size={3} />
        <SQFormTextField name="lastName" label="Last name" size={3} />
        <SQFormReadOnlyField name="city" label="City" />
        <SQFormReadOnlyField name="state" label="State" size={1} />
        <SQFormAutocomplete
          name="tenThousandOptions"
          label="Ten Thousand Options"
          size={6}
        >
          {MOCK_AUTOCOMPLETE_OPTIONS}
        </SQFormAutocomplete>
        <SQFormTextField name="hobby" label="Hobby" size={4} />
        <SQFormTextField name="age" label="Age" size={2} />
        <SQFormDropdown name="state" label="State" displayEmpty={true} size={4}>
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <SQFormCheckbox name="cool" label="Cool" />
        <SQFormCheckbox name="lame" label="Lame" isDisabled={true} />
        <Grid item sm={12}>
          <Grid container justify="space-between">
            <SQFormResetButtonWithConfirmation
              variant="outlined"
              confirmationContent="You are about to reset this form. Any unsaved info for this customer will be removed"
            >
              RESET
            </SQFormResetButtonWithConfirmation>
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const formWithValidation = () => {
  const validationSchema = {
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string(),
    age: Yup.string()
      .min(1, 'Invalid age')
      .max(3, 'Invalid age')
      .required('Required'),
    state: Yup.string().required('Required'),
    tenThousandOptions: Yup.string().required('Required'),
    note: Yup.string().required('Required')
  };

  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_ENTITY}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <SQFormTextField
          name="firstName"
          label="First name"
          size={6}
          isRequired={true}
        />
        <SQFormTextField
          name="lastName"
          label="Last name"
          size={6}
          isRequired={true}
        />
        <SQFormTextField name="city" label="City" size={3} />
        <SQFormAutocomplete
          name="tenThousandOptions"
          label="Ten Thousand Options"
          size={6}
          isRequired={true}
        >
          {MOCK_AUTOCOMPLETE_OPTIONS}
        </SQFormAutocomplete>
        <SQFormDropdown
          name="state"
          label="State"
          isRequired={true}
          displayEmpty={true}
          size={5}
        >
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <SQFormTextField name="age" label="Age" size={2} isRequired={true} />
        <SQFormTextarea name="note" label="Note" size={5} isRequired={true} />
        <Grid item sm={12}>
          <Grid container justify="space-between">
            <SQFormButton title="Reset" type="reset">
              RESET
            </SQFormButton>
            <FormValidationMessage />

            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const formWithFieldArray = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_FOR_FIELD_ARRAY}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormTextField name="firstName" label="First name" size={3} />
        <SQFormTextField name="lastName" label="Last name" size={3} />
        <SQFormReadOnlyField name="city" label="City" />
        <SQFormReadOnlyField name="state" label="State" size={1} />
        <SQFormAutocomplete
          name="tenThousandOptions"
          label="Ten Thousand Options"
          size={6}
        >
          {MOCK_AUTOCOMPLETE_OPTIONS}
        </SQFormAutocomplete>
        <SQFormTextField name="hobby" label="Hobby" size={4} />
        <SQFormTextField name="age" label="Age" size={2} />
        <SQFormDropdown name="state" label="State" displayEmpty={true} size={4}>
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <SQFormCheckbox name="cool" label="Cool" />
        <SQFormCheckbox name="lame" label="Lame" isDisabled={true} />
        <Grid item sm={12}>
          <FriendsFieldArray name="friends" />
        </Grid>
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

// oftentimes this data might be fetched asynchronously so we'd need to memoize it inside the component
const names = [
  'Jim',
  'Jake',
  'John',
  'Jose',
  'Jaipal',
  'Joe',
  'Jane',
  'Jack',
  'Jill'
];

export const formWithCheckboxGroup = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SectionHeader title="Friends" />
      <SQForm
        // the property you want to store the array of checked items determines the `name` prop below
        initialValues={MOCK_FORM_FOR_CHECKBOX_GROUP}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        {/* the group's `name` string should always match the item's `name` string */}
        <SQFormCheckboxGroup
          name="friends"
          useSelectAll={true}
          selectAllData={names} // whatever you'd want 'select all' to include
          selectAllContainerProps={{
            // MUI Grid container props, plus a style prop if you're feeling fancy
            direction: 'column',
            wrap: 'nowrap',
            style: {
              padding: '16px 16px 0 16px'
            }
          }}
          selectAllProps={
            // any props that a SQFormCheckboxGroupItem accepts
            // realistically, these would only include `isDisabled`, `size`, `label`,
            {
              label: 'ALL THE PEEPS'
            }
          }
        >
          {arrayHelpers => {
            const {values} = arrayHelpers.form;
            return (
              <Grid
                container
                direction="column"
                wrap="nowrap"
                style={{
                  height: 200,
                  overflow: 'auto',
                  padding: '0 16px'
                }}
              >
                {names.map(name => {
                  return (
                    <Grid item key={name}>
                      <SQFormCheckboxGroupItem
                        name="friends"
                        label={name}
                        isChecked={values.friends.includes(name)}
                        onChange={e => {
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
          }}
        </SQFormCheckboxGroup>
        <Grid item sm={12}>
          <Grid container justify="space-between">
            <SQFormResetButtonWithConfirmation
              variant="outlined"
              confirmationContent="You are about to reset this form. Any unsaved info for this customer will be removed"
            >
              RESET
            </SQFormResetButtonWithConfirmation>
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const basicFormWithMultiSelect = () => {
  const validationSchema = {
    friends: Yup.string().required('Required')
  };

  return (
    <Card raised style={{padding: '16px', minWidth: '768px'}}>
      <SQForm
        initialValues={MOCK_FORM_FOR_MULTISELECT}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        muiGridProps={{
          spacing: 2,
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <SQFormMultiSelect
          name="friends"
          label="Friends"
          size={5}
          isRequired={true}
          useSelectAll={boolean('Use Select All', true)}
        >
          {MOCK_FRIENDS_OPTIONS}
        </SQFormMultiSelect>
        <Grid item size={2} style={{alignSelf: 'flex-end'}}>
          <SQFormIconButton IconComponent={CheckMarkIcon} />
        </Grid>
      </SQForm>
    </Card>
  );
};

export const basicFormWithCustomOnBlur = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_ENTITY}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormTextField
          name="firstName"
          label="First name"
          size={3}
          onBlur={action('Blur event!')}
        />
        <SQFormTextField
          name="lastName"
          label="Last name"
          size={3}
          onBlur={action('Blur event!')}
        />
        <SQFormTextField
          name="city"
          label="City"
          size={2}
          onBlur={action('Blur event!')}
        />
        <SQFormTextField
          name="age"
          label="Age"
          size={2}
          onBlur={action('Blur event!')}
        />
        <SQFormDropdown
          name="state"
          label="State"
          displayEmpty={true}
          size={2}
          onBlur={action('Blur event!')}
        >
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const basicFormWithCustomOnChange = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_ENTITY}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormTextField
          name="firstName"
          label="First name"
          size={3}
          onChange={action('Change event!')}
        />
        <SQFormTextField
          name="lastName"
          label="Last name"
          size={3}
          onChange={action('Change event!')}
        />
        <SQFormTextField
          name="city"
          label="City"
          size={2}
          onChange={action('Change event!')}
        />
        <SQFormTextField
          name="age"
          label="Age"
          size={2}
          onChange={action('Change event!')}
        />
        <SQFormDropdown
          name="state"
          label="State"
          displayEmpty={true}
          size={2}
          onChange={action('Change event!')}
        >
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const applyAnAction = () => {
  const validationSchema = {
    actions: Yup.string().required('Required')
  };

  return (
    <Card raised style={{padding: '16px', minWidth: '768px'}}>
      <SQForm
        initialValues={MOCK_ACTIONS_FORM_ENTITY}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        muiGridProps={{
          spacing: 2,
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <SQFormAutocomplete
          name="actions"
          label="Actions"
          size={5}
          isRequired={true}
        >
          {ACTIONS_AUTOCOMPLETE_OPTIONS}
        </SQFormAutocomplete>
        <SQFormTextarea
          name="note"
          label="Note"
          size={5}
          placeholder="Type to add note..."
          rows={2}
          rowsMax={2}
        />
        <Grid item size={2} style={{alignSelf: 'flex-end'}}>
          <SQFormIconButton IconComponent={CheckMarkIcon} />
        </Grid>
      </SQForm>
    </Card>
  );
};

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

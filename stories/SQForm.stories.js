import React from 'react';
import * as Yup from 'yup';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CheckMarkIcon from '@material-ui/icons/CheckCircle';
import {SectionHeader} from 'scplus-shared-components';

import FriendsFieldArray from './components/FriendsFieldArray';
import FormValidationMessage from './components/FormValidationMessage';
import {createDocsPage} from './utils/createDocsPage';
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
  SQFormInclusionList,
  SQFormInclusionListItem,
  SQFormMultiSelect,
  SQFormRadioButtonGroup,
  SQFormCheckboxGroup,
  SQFormMaskedTextField,
  SQFormMultiValue,
  MASKS,
} from '../src';

export default {
  title: 'Forms/SQForm',
  decorators: [withKnobs],
  parameters: {
    docs: {page: createDocsPage({markdown})},
  },
};

const MOCK_AUTOCOMPLETE_OPTIONS = Array.from(new Array(10000))
  .map(() => {
    const randomValue = random(10 + Math.ceil(Math.random() * 20));
    return {
      label: randomValue,
      value: randomValue,
      isDisabled: Math.random() > 0.8,
    };
  })
  .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()));

const ACTIONS_AUTOCOMPLETE_OPTIONS = [
  {label: 'Action 1', value: 1},
  {label: 'Action 2', value: 2},
];

const MOCK_FORM_ENTITY = {
  firstName: '',
  lastName: 'Doe',
  city: '',
  age: '',
  state: '',
  tenThousandOptions: '',
  note: '',
  preferredPet: '',
  warrantyOptions: [],
  warrantyOptionsSelectAll: false,
  favoriteColors: [],
};

const MOCK_ACTIONS_FORM_ENTITY = {
  actions: 2,
  note: '',
};

const MOCK_FORM_WITH_BOOLEANS_ENTITY = {
  ...MOCK_FORM_ENTITY,
  hobby: '',
  cool: false,
  lame: false,
  favoriteColors: [2, 4],
};

const MOCK_FORM_FOR_FIELD_ARRAY = {
  ...MOCK_FORM_ENTITY,
  friends: ['Joe', 'Jane', 'Jack', 'Jill'],
};

const MOCK_FORM_FOR_CHECKBOX_GROUP = {
  friends: ['Joe', 'Jane', 'Jack', 'Jill'],
  selectAll: false,
};

const MOCK_STATE_OPTIONS = [
  {label: 'Arizona', value: 'AZ'},
  {label: 'Kansas', value: 'KS'},
  {label: 'Missouri', value: 'MO'},
];

const MOCK_FORM_FOR_MULTISELECT = {
  friends: [],
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
  {label: 'Jessica', value: random(10 + Math.ceil(Math.random() * 20))},
];

const MOCK_MULTI_VALUE_OPTIONS = [
  {label: 'Green', value: 0},
  {label: 'Red', value: 1},
  {label: 'Orange', value: 2},
  {label: 'Pink', value: 3},
  {label: 'Purple', value: 4},
  {label: 'Black', value: 5},
  {label: 'White', value: 6},
  {label: 'Blue', value: 7},
];

const MOCK_FORM_MASKED_FIELDS = {
  phone: '',
  zip: '',
  currency: '',
  percent: '',
  email: '',
  date: '',
  ssn: '',
  custom: '',
};

const RADIO_GROUP_OPTIONS = [
  {label: 'Cat', value: 'cat'},
  {label: 'Dog', value: 'dog'},
  {label: 'Both', value: 'both', isDisabled: true},
];

const CHECKBOX_GROUP_OPTIONS = [
  {label: 'Glass', value: 1},
  {label: 'Drivetrain', value: 2},
  {label: 'Brakes', value: 3},
  {label: 'Interior', value: 4, isDisabled: true},
];

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
  actions.resetForm();
};

export const BasicForm = () => {
  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={MOCK_FORM_WITH_BOOLEANS_ENTITY}
        onSubmit={handleSubmit}
        muiGridProps={{spacing: 4}}
      >
        <SQFormTextField
          name="firstName"
          label="First name"
          size={3}
          maxCharacters={10}
        />
        <SQFormTextField name="lastName" label="Last name" size={3} />
        <SQFormReadOnlyField name="city" label="City" />
        <SQFormReadOnlyField name="state" label="State" size={1} />
        <SQFormAutocomplete
          name="tenThousandOptions"
          label="Ten Thousand Options"
          size={6}
          onInputChange={action('Update local state')}
          lockWidthToField={false}
        >
          {MOCK_AUTOCOMPLETE_OPTIONS}
        </SQFormAutocomplete>
        <SQFormTextField name="hobby" label="Hobby" size={4} />
        <SQFormTextField name="age" label="Age" type="number" size={2} />
        <SQFormDropdown name="state" label="State" displayEmpty={true} size={4}>
          {MOCK_STATE_OPTIONS}
        </SQFormDropdown>
        <SQFormCheckbox name="cool" label="Cool" />
        <SQFormCheckbox name="lame" label="Lame" isDisabled={true} />
        <SQFormRadioButtonGroup
          name="preferredPet"
          groupLabel="Cat or Dog?"
          shouldDisplayInRow={true}
        >
          {RADIO_GROUP_OPTIONS}
        </SQFormRadioButtonGroup>
        <SQFormCheckboxGroup
          name="warrantyOptions"
          groupLabel="Warranty Options"
          shouldDisplayInRow={true}
          shouldUseSelectAll={true}
        >
          {CHECKBOX_GROUP_OPTIONS}
        </SQFormCheckboxGroup>
        <SQFormMultiValue
          name="favoriteColors"
          label="Your Favorite Colors"
          size={4}
        >
          {MOCK_MULTI_VALUE_OPTIONS}
        </SQFormMultiValue>
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

export const FormWithValidation = () => {
  const validationSchema = {
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string(),
    age: Yup.number()
      .min(1, 'Age 1-65')
      .max(65, 'Age 1-65')
      .required('Required'),
    state: Yup.string().required('Required'),
    tenThousandOptions: Yup.string().required('Required'),
    preferredPet: Yup.string().required('Required'),
    warrantyOptions: Yup.array()
      .min(1, 'One option required')
      .required('Required'),
    note: Yup.string().required('Required'),
    favoriteColors: Yup.array()
      .of(
        Yup.lazy((value) => {
          return typeof value === 'number' ? Yup.number() : Yup.string();
        })
      )
      .min(1)
      .required('Required'),
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
          maxCharacters={10}
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
        <SQFormTextField
          name="age"
          label="Age"
          type="number"
          size={2}
          isRequired={true}
        />
        <SQFormTextarea
          name="note"
          label="Note"
          size={5}
          isRequired={true}
          maxCharacters={100}
        />
        <SQFormRadioButtonGroup
          name="preferredPet"
          groupLabel="Cat or Dog?"
          shouldDisplayInRow={true}
          isRequired={true}
        >
          {RADIO_GROUP_OPTIONS}
        </SQFormRadioButtonGroup>
        <SQFormCheckboxGroup
          name="warrantyOptions"
          groupLabel="Warranty Options"
          shouldDisplayInRow={true}
          isRequired={true}
        >
          {CHECKBOX_GROUP_OPTIONS}
        </SQFormCheckboxGroup>
        <SQFormMultiValue
          name="favoriteColors"
          label="Your Favorite Colors"
          size={4}
          isRequired={true}
        >
          {MOCK_MULTI_VALUE_OPTIONS}
        </SQFormMultiValue>
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
            <SQFormButton shouldRequireFieldUpdates={true}>Submit</SQFormButton>
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
  'Jill',
];

export const formWithInclusionlist = () => {
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
        <SQFormInclusionList
          name="friends"
          useSelectAll={true}
          selectAllData={names} // whatever you'd want 'select all' to include
          selectAllContainerProps={{
            // MUI Grid container props, plus a style prop if you're feeling fancy
            direction: 'column',
            wrap: 'nowrap',
            style: {
              padding: '16px 16px 0 16px',
            },
          }}
          selectAllProps={
            // any props that a SQFormInclusionListItem accepts
            // realistically, these would only include `isDisabled`, `size`, `label`,
            {
              label: 'ALL THE PEEPS',
            }
          }
        >
          {(arrayHelpers) => {
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
                        isChecked={values.friends.includes(name)}
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
          }}
        </SQFormInclusionList>
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
    friends: Yup.string().required('Required'),
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
          alignItems: 'center',
        }}
      >
        <SQFormMultiSelect
          name="friends"
          label="Friends"
          size={5}
          isRequired={true}
          onChange={action('Friends selected')}
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

export const basicFormWithMaskedFields = () => {
  const validationSchema = {
    phone: Yup.string()
      .required('Required')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .min(10, 'Phone number must be 10 digits'),
    zip: Yup.string()
      .required('Required')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .min(5, 'Zip code must be 5 digits'),
    currency: Yup.string().required('Required'),
  };

  return (
    <Card raised style={{padding: '16px', minWidth: '768px'}}>
      <SQForm
        initialValues={MOCK_FORM_MASKED_FIELDS}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        muiGridProps={{
          spacing: 2,
          justify: 'space-between',
          alignItems: 'center',
        }}
      >
        <SQFormMaskedTextField
          name="phone"
          label="Phone"
          size={4}
          mask={MASKS.phone}
          isRequired={true}
        />
        <SQFormMaskedTextField
          name="zip"
          label="Zip Code"
          size={4}
          mask={MASKS.zip}
          isRequired={true}
        />
        <SQFormMaskedTextField
          name="currency"
          label="Currency"
          size={4}
          mask={MASKS.currency}
          isRequired={true}
        />
        <SQFormMaskedTextField
          name="percent"
          label="Percent"
          size={4}
          mask={MASKS.percent}
        />
        <SQFormMaskedTextField
          name="email"
          label="Email"
          size={4}
          mask={MASKS.email}
        />
        <SQFormMaskedTextField
          name="date"
          label="Date"
          size={4}
          mask={MASKS.date}
        />
        <SQFormMaskedTextField
          name="ssn"
          label="SSN"
          size={4}
          mask={MASKS.ssn}
        />
        <SQFormMaskedTextField
          name="custom"
          label="Custom mask (ex: Canadian postal code)"
          size={4}
          placeholder="A1B 2C3"
          mask={[/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/]}
        />
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
    actions: Yup.string().required('Required'),
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
          alignItems: 'center',
        }}
      >
        <SQFormAutocomplete
          name="actions"
          label="Actions with a default value"
          size={5}
          isRequired={true}
          isDisabled={boolean('Disable autocomplete', true)}
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

export const SQFormCheckboxGroupExample = () => {
  const initialValues = {
    warrantyOptions: ['brakes'],
    selectAll: false,
  };

  const isGroupRequired = boolean('Is group required', false);

  const validationSchema = {
    warrantyOptions: Yup.array()
      .min(1, 'Must select at least 1 option')
      .required('Required'),
  };

  return (
    <Card raised style={{padding: '16px', minWidth: '250px'}}>
      <SQForm
        initialValues={initialValues}
        validationSchema={isGroupRequired ? validationSchema : {}}
        onSubmit={handleSubmit}
      >
        <SQFormCheckboxGroup
          name="warrantyOptions"
          groupLabel="Warranty Options"
          isRequired={isGroupRequired}
          shouldDisplayInRow={boolean('Should display in row', false)}
          shouldUseSelectAll={boolean('Should use select all', false)}
        >
          {CHECKBOX_GROUP_OPTIONS}
        </SQFormCheckboxGroup>
        <Grid item sm={12}>
          <Grid container justify="flex-end">
            <SQFormButton>Submit</SQFormButton>
          </Grid>
        </Grid>
      </SQForm>
    </Card>
  );
};

export const ccaChecklist = () => {
  const dropdownOptions = [
    {label: 'Pitched', value: 'pitched'},
    {label: 'Transferred', value: 'transferred'},
  ];
  const validationSchema = {
    dvh: Yup.string(),
    hra: Yup.string(),
    shield: Yup.string(),
  };

  return (
    <Card raised style={{padding: '16px', minWidth: '768px'}}>
      <SQForm
        initialValues={{
          dvh: '',
          hra: 'pitched',
          shield: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        muiGridProps={{
          spacing: 2,
          justify: 'space-between',
          alignItems: 'center',
        }}
      >
        <SQFormDropdown name="dvh" label="DVH" displayEmpty={true} size={2}>
          {dropdownOptions}
        </SQFormDropdown>
        <SQFormDropdown name="hra" label="HRA" displayEmpty={true} size={2}>
          {dropdownOptions}
        </SQFormDropdown>
        <SQFormDropdown
          name="shield"
          label="Reliashield"
          displayEmpty={true}
          size={2}
        >
          {dropdownOptions}
        </SQFormDropdown>
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

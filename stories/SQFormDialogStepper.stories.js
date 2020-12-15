import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {Typography} from '@material-ui/core';
import {CardList} from 'scplus-shared-components';
import markdown from '../notes/SQFormDialogStepper.md';

import {
  SQFormTextField,
  SQFormCheckbox,
  SQFormDialogStep,
  SQFormDialogStepper,
  SQFormCheckboxGroup,
  SQFormCheckboxGroupItem
} from '../src';

export default {
  title: 'SQFormDialogStepper',
  decorators: [withKnobs, withInfo],
  parameters: {
    notes: {markdown}
  }
};

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
};

export const SQFormDialogStepperWithValidationAndHeightStyle = () => {
  const prioritizedList = [
    {
      id: 1,
      firstName: 'Ashley',
      lastName: 'Payne',
      ColorCode: 'Yellow',
      PLRule: 'Quoted - LowInterest - Attempt2'
    },
    {
      id: 2,
      accountId: 1277773123,
      firstName: 'Tom',
      lastName: 'Payne',
      ColorCode: 'Green',
      PLRule: 'Quoted - LowInterest - Attempt2'
    }
  ];

  const agentPVList = () => {
    if (!prioritizedList) return [];
    return prioritizedList.map(listItem => ({
      id: listItem.id,
      header: listItem.accountId
        ? `Acct ID : ${listItem.accountId}`
        : 'Create a New Quote',
      secondaryRows: listItem.accountId && [
        `Name : ${listItem.firstName} ${listItem.lastName}`,
        `PV Rule : ${listItem.PLRule}`
      ],
      onClick: () => {
        listItem.accountId && alert(`Account ${listItem.accountId}`);
      }
    }));
  };

  const tabOptions = [
    {
      label: 'Agent PV',
      value: 'agentPV',
      listItems: agentPVList(),
      handleRefresh: () => {
        alert('Refreshing Prioritized List');
      }
    }
  ];

  const MOCK_FORM_FOR_CHECKBOX_GROUP = {
    friends: ['Joe', 'Jane', 'Jack', 'Jill'],
    selectAll: false
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
    'Jill'
  ];

  return (
    <>
      <h3>Toggle the isOpen checkbox in the Knobs tab to view the Stepper</h3>
      <SQFormDialogStepper
        title="Quote Tool"
        isOpen={boolean('isOpen', false, 'Open/Close Dialog')}
        onClose={action('Close button clicked')}
        contentHeight="25rem"
        contentStyle={{height: '30rem'}}
        fullWidth
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center'
        }}
        initialValues={{
          ...MOCK_FORM_FOR_CHECKBOX_GROUP
        }}
        setValues={() => {
          console.log('values set');
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="Quotes"
          validationSchema={Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string()
          })}
        >
          <CardList
            shouldRenderHeader={false}
            contentWidth="45rem"
            contentHeight="85vh"
            cardStyle={{minWidth: 'auto'}}
            isInitiallyExpanded={true}
            isExpandable={boolean('isExpandable', true)}
            tabs={tabOptions}
          />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Dependents"
          validationSchema={Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string()
          })}
        >
          <Typography variant="body2" noWrap>
            Select up to 5 dependents to be added to your quote.
          </Typography>{' '}
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
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};

export const SQDialogStepperWithValidation = () => {
  return (
    <>
      <h3>Toggle the isOpen checkbox in the Knobs tab to view the Stepper</h3>
      <SQFormDialogStepper
        title="SQ Stepper Form"
        isOpen={boolean('isOpen', false, 'Open/Close Dialog')}
        onClose={action('Close button clicked')}
        contentHeight="25rem"
        fullWidth
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center'
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          newAccount: false,
          accountID: '',
          description: '',
          age: ''
        }}
        setValues={() => {
          console.log('values set');
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="Personal Data"
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required name.')
          })}
        >
          <SQFormTextField
            fullWidth
            name="firstName"
            label="First Name"
            isRequired={true}
          />
          <SQFormTextField
            fullWidth
            name="lastName"
            label="Last Name"
            isRequired={true}
          />
          <SQFormTextField fullWidth name="middleI" label="Middle Initial" />
          <SQFormTextField fullWidth name="nickname" label="Nick-name" />
          <SQFormTextField fullWidth name="alias" label="Alias" />
          <SQFormCheckbox
            name="newAccount"
            type="checkbox"
            label="New Account"
          />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Account Info"
          validationSchema={Yup.object({
            accountID: Yup.mixed().when('newAccount', {
              is: true,
              then: Yup.number()
                .required('Required')
                .min(100, 'Since this is a new account we need the number')
            })
          })}
        >
          <SQFormTextField
            fullWidth
            name="accountID"
            type="number"
            label="Account ID"
          />
          <SQFormTextField name="age" label="Age" size={2} />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="More Info"
          validationSchema={Yup.object({
            description: Yup.string().required('Required')
          })}
        >
          <SQFormTextField
            fullWidth
            name="description"
            label="Description"
            isRequired={true}
          />
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};

import React from 'react';
import * as Yup from 'yup';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {Grid} from '@material-ui/core';
import {CardList, SectionHeader} from 'scplus-shared-components';
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
  const quotesList = [
    {
      id: 1,
      accountId: 1273123,
      name: 'Ashley Payne',
      PLRule: 'Quoted - LowInterest - Attempt2'
    },
    {
      id: 2,
      accountId: 1277773123,
      name: 'Tom Payne',
      PLRule: 'Quoted - LowInterest - Attempt2'
    },
    {
      id: 3,
      accountId: 1277773123,
      name: 'Tom Tim',
      PLRule: 'Quoted - LowInterest - Attempt2'
    },
    {
      id: 4,
      accountId: 1277773123,
      name: 'Tom Thumb',
      PLRule: 'Quoted - LowInterest - Attempt2'
    }
  ];

  const quotedList = () => {
    const mappedList = quotesList.map(listItem => ({
      id: listItem.id,
      header: `Acct ID : ${listItem.accountId}`,
      secondaryRows: [
        `Name : ${listItem.name}`,
        `PV Rule : ${listItem.PLRule}`
      ],
      onClick: () => {
        console.log(`Account ${listItem.accountId}`);
      }
    }));
    return [
      {
        header: 'Create a New Quote',
        id: 123,
        onClick: () => {
          console.log(`Create new account`);
        }
      },
      ...mappedList
    ];
  };

  const tabOptions = [
    {
      label: 'Agent PV',
      value: 'agentPV',
      listItems: quotedList(),
      isSelectable: true
    }
  ];

  const initialValues = {
    friends: ['Joe', 'Jane', 'Jack', 'Jill']
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
        contentStyle={{
          height: '100%',
          padding: '15px 15px'
        }}
        fullWidth
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center'
        }}
        initialValues={initialValues}
        setValues={() => {
          console.log('values set');
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep label="Quotes">
          <CardList
            shouldRenderHeader={false}
            contentWidth="100%"
            contentHeight="250px"
            cardStyle={{minWidth: 'auto', paddingLeft: '15px'}}
            isInitiallyExpanded={true}
            isExpandable={boolean('isExpandable', true)}
            tabs={tabOptions}
          />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Dependents"
          validationSchema={{
            friends: Yup.array()
          }}
        >
          <div style={{padding: '15px 15px 0px 15px', width: '100%'}}>
            <SectionHeader
              informativeHeading="Select up to 5 dependents to be added"
              title="Dependants"
            />
            <SQFormCheckboxGroup
              name="friends"
              useSelectAll={true}
              selectAllData={names} // whatever you'd want 'select all' to include
              selectAllContainerProps={{
                // MUI Grid container props, plus a style prop if you're feeling fancy
                direction: 'column',
                wrap: 'nowrap',
                style: {
                  paddingLeft: '15px'
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
                      height: 180,
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
          </div>
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
        contentStyle={{height: '300px'}}
        fullWidth
        maxWidth="md"
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center',
          spacing: 6
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          newAccount: false,
          accountID: '',
          description: '',
          age: ''
        }}
        setValues={formValues => {
          console.log('values set', formValues);
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="Personal Data"
          validationSchema={{
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required')
          }}
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
          validationSchema={{
            accountID: Yup.mixed().when('newAccount', {
              is: true,
              then: Yup.number()
                .required('Required for new account')
                .min(100, 'Required for new account')
            }),
            age: Yup.string().required('Required')
          }}
        >
          <SQFormTextField
            fullWidth
            name="accountID"
            type="number"
            label="Account ID"
          />
          <SQFormTextField name="age" label="Age" size={2} isRequired />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="More Info"
          validationSchema={{
            description: Yup.string().required('Required')
          }}
        >
          <SQFormTextField fullWidth name="description" label="Description" />
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};

export const SQDialogStepperLoading = () => {
  return (
    <>
      <h3>Toggle the isOpen checkbox in the Knobs tab to view the Stepper</h3>
      <SQFormDialogStepper
        title="SQ Stepper Form"
        isOpen={boolean('isOpen', false, 'Open/Close Dialog')}
        onClose={action('Close button clicked')}
        fullWidth
        maxWidth="md"
        initialValues={{
          firstName: '',
          lastName: '',
          text: ''
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="First Name"
          validationSchema={{
            firstName: Yup.string().required('Required')
          }}
          isLoading={false}
        >
          <div>
            <SQFormTextField
              fullWidth
              name="firstName"
              label="First Name"
              isRequired={true}
            />
            <SQFormTextField fullWidth name="text" label="Text" />
          </div>
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Last Name"
          validationSchema={{
            lastName: Yup.string().required('Required')
          }}
          isLoading={true}
          loadingMessage="Loading data for the step"
        >
          <SQFormTextField
            fullWidth
            name="lastName"
            label="Last Name"
            isRequired={true}
          />
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};

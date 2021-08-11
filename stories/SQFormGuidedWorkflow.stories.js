import React from 'react';
import * as Yup from 'yup';
import {
  ExpandingCardList,
  ExpandingCard,
  RoundedButton,
  TextButton
} from 'scplus-shared-components';
import {SQFormGuidedWorkflow, SQFormDropdown, SQFormTextarea} from '../src';

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export default {
  title: 'Forms/SQFormGuidedWorkflow',
  component: SQFormGuidedWorkflow
};

const outcomeDropdownOptions = [
  {label: 'Not Interested', value: 'not-interested'},
  {label: 'Interested', value: 'interested'}
];

const Template = () => {
  const [isIneligible, setIneligible] = React.useState(false);
  const [isModuleDisabled, setIsModuleDisabled] = React.useState(false);
  const scriptedTextMap = {
    customerName: 'Bob Smith',
    agentName: 'Jane Doe',
    planName: 'Super Cheap Med+'
  };
  const taskModules = [
    {
      name: 'intro',
      title: 'Introduction',
      formikProps: {
        initialValues: {
          outcome: '',
          notes: ''
        },
        onSubmit: async (values, _formikBag, context) => {
          await sleep(3000); // Simulate API call to see loading spinner
          console.log(values);
          console.log(context);
          if (values.outcome === 'not-interested') {
            setIsModuleDisabled(true);
          } else {
            setIsModuleDisabled(false);
          }
        },
        validationSchema: {
          outcome: Yup.string().required('Required'),
          notes: Yup.string()
        }
      },
      scriptedTextProps: {
        text: `Hi, ${scriptedTextMap.customerName}, my name is ${scriptedTextMap.agentName}, and I am calling to discuss ${scriptedTextMap.planName}.\n Are you available right now to talk through some things with me, today?`,
        title: 'Agent Script'
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" isRequired={true}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <RoundedButton
              title="Test Disable"
              onClick={() => setIsModuleDisabled(true)}
            >
              Test Disable
            </RoundedButton>
            <RoundedButton>{`${isModuleDisabled}`}</RoundedButton>
            <SQFormTextarea name="notes" label="Notes" />
          </>
        ),
        title: 'Confirm Info'
      }
    },
    {
      name: 'cancellation',
      title: 'Policy Cancellation Statement',
      subtitles: ['Cancelling policy'],
      isFailedState: isIneligible,
      isDisabled: isModuleDisabled,
      formikProps: {
        initialValues: {
          outcome: '',
          notes: ''
        },
        onSubmit: async (values, _formikBag, context) => {
          console.log(values);
          console.log(context);
        },
        validationSchema: {
          outcome: Yup.string().required('Required'),
          notes: Yup.string()
        }
      },
      scriptedTextProps: {
        text: `Stuff about policy cancellation documents`,
        title: 'Agent Script',
        actionButton: <TextButton tooltip="View">View Doc</TextButton>
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" isRequired={true}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" />
            <RoundedButton
              title="Ineligible"
              onClick={() => setIneligible(true)}
            >
              Ineligible? Click here
            </RoundedButton>
          </>
        ),
        title: 'Confirm Info',
        infoText:
          'Interact with the form to see me change colors based on form state',
        warningText: 'Form needs your attention',
        successText: 'Form is ready to submit',
        errorText: 'Do not pass go, do not collect $200'
      }
    },
    {
      name: 'providers',
      title: isModuleDisabled ? 'Dont Verify Providers' : 'Verify Providers',
      subtitles: [
        'Please verify the providers',
        isModuleDisabled ? 'Disabled' : 'Not Disabled'
      ],
      isDisabled: true,
      formikProps: {
        initialValues: {
          outcome: '',
          notes: ''
        },
        onSubmit: async (values, _formikBag, context) => {
          console.log(values);
          console.log(context);
        },
        validationSchema: {
          outcome: Yup.string().required('Required'),
          notes: Yup.string()
        }
      },
      scriptedTextProps: {
        text:
          'Before proceeding, please verify the list of providers is correct',
        title: 'Agent Script',
        actionButton: <TextButton tooltip="View">View Providers</TextButton>
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" isRequired={true}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" />
          </>
        ),
        title: 'Confirm Info'
      }
    },
    {
      name: 'yetAnother',
      title: 'Yet Another Test',
      subtitles: ['Testing . . .'],
      formikProps: {
        initialValues: {
          outcome: '',
          notes: ''
        },
        onSubmit: async (values, _formikBag, context) => {
          console.log(values);
          console.log(context);
        },
        validationSchema: {
          outcome: Yup.string().required('Required'),
          notes: Yup.string()
        }
      },
      scriptedTextProps: {
        text: 'Scripted Text goes here',
        title: 'Title of the Script'
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" isRequired={true}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" />
          </>
        ),
        title: 'Last Info'
      }
    }
  ];

  return (
    <div style={{width: '90%', height: '95vh'}}>
      <ExpandingCardList>
        <ExpandingCard title="Guided Workflow" name="guidedWorkflow">
          <SQFormGuidedWorkflow
            mainTitle="CCA Guided Workflow"
            mainSubtitle="Please review these Services with you client, then confirm their responses."
            initialCompletedTasks={0}
            isStrictMode={false}
            taskModules={taskModules}
            onError={error => {
              console.error(error);
            }}
          />
        </ExpandingCard>
      </ExpandingCardList>
    </div>
  );
};

export const Default = Template.bind({});

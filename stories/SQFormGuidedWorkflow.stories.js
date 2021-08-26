import React from 'react';
import * as Yup from 'yup';
import {
  ExpandingCardList,
  ExpandingCard,
  RoundedButton,
  TextButton
} from 'scplus-shared-components';
import {
  SQFormGuidedWorkflow,
  SQFormDropdown,
  SQFormTextarea,
  SQFormTextField
} from '../src';

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export default {
  title: 'Forms/SQFormGuidedWorkflow',
  component: SQFormGuidedWorkflow,
  argTypes: {
    onError: {action: 'error', table: {disable: true}},
    taskModules: {table: {disable: true}}
  }
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
            <SQFormTextarea name="notes" label="Notes" />
          </>
        ),
        title: 'Confirm Info'
      }
    },
    {
      name: 'cancellation',
      title: isModuleDisabled
        ? 'Dont Verify Providers'
        : 'Policy Cancellation Statement',
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
      title: 'Verify Providers',
      subtitles: ['Please verify the providers'],
      isDisabled: false,
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

const TestTemplate = args => {
  const {mainTitle, ...rest} = args;

  const taskModules = [
    {
      name: 'firstSection',
      title: 'First Section',
      formikProps: {
        initialValues: {
          firstText: '',
          secondText: ''
        },
        onSubmit: async values => {
          await sleep(1000); // Simulate API call to see loading spinner
          console.log(JSON.stringify(values));
        },
        validationSchema: {
          firstText: Yup.string().required('Required'),
          secondText: Yup.string()
        }
      },
      scriptedTextProps: {
        text: 'This is some text',
        title: 'Script Title'
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormTextField name="firstText" label="First Text" />
            <SQFormTextField name="secondText" label="Second Text" />
          </>
        ),
        title: 'Outcome Test'
      }
    },
    {
      name: 'secondSection',
      title: 'Second Section',
      formikProps: {
        initialValues: {
          testText: '',
          outcome: '',
          notes: ''
        },
        onSubmit: async values => {
          await sleep(1000); // Simulate API call to see loading spinner
          console.log(JSON.stringify(values));
        }
      },
      scriptedTextProps: {
        text: 'This is some more text',
        title: 'Another Script Title'
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormTextField name="testText" label="Test Text" />
            <SQFormTextarea name="notes" label="Notes" />
          </>
        ),
        title: 'Outcome Test'
      }
    }
  ];

  return (
    <div style={{width: '90%', height: '95vh'}}>
      <ExpandingCardList>
        <ExpandingCard title="Guided Workflow Test" name="guidedWorkflowTest">
          <SQFormGuidedWorkflow
            {...rest}
            mainTitle={mainTitle}
            onError={error => {
              console.error(error);
            }}
            taskModules={taskModules}
          />
        </ExpandingCard>
      </ExpandingCardList>
    </div>
  );
};

export const Testing = TestTemplate.bind({});
Testing.args = {
  mainTitle: 'CCA Guided Workflow',
  mainSubtitle:
    'Please review these Services with you client, then confirm their responses.',
  initialCompletedTasks: 0,
  isStrictMode: false
};

import React from 'react';
import * as Yup from 'yup';
import {ExpandingCardList, ExpandingCard} from 'scplus-shared-components';
import {SQFormGuidedWorkflow, SQFormDropdown, SQFormTextarea} from '../src';

export default {
  title: 'Forms/SQFormGuidedWorkflow',
  component: SQFormGuidedWorkflow,
  argTypes: {
    // onSave: {action: 'onSave', table: {disable: true}},
    // children: {table: {disable: true}},
    // validationSchema: {table: {disable: true}}
  }
  // parameters: {
  //   docs: {page: createDocsPage({showStories: false})}
  // }
};

const outcomeDropdownOptions = [
  {label: 'Not Interested', value: 'not-interested'},
  {label: 'Interested', value: 'interested'}
];

const Template = () => {
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
        onSubmit: async values => {
          console.log(JSON.stringify(values));
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
      title: 'Policy Cancellation Statement',
      formikProps: {
        initialValues: {
          outcome: '',
          notes: ''
        },
        onSubmit: async values => {
          console.log(JSON.stringify(values));
        },
        validationSchema: {
          outcome: Yup.string().required('Required'),
          notes: Yup.string()
        }
      },
      scriptedTextProps: {
        text: `Stuff about policy cancellation documents`,
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
    }
  ];

  return (
    <div style={{width: '90%', height: '95vh'}}>
      <ExpandingCardList>
        <ExpandingCard title="Guided Workflow" name="guidedWorkflow">
          <SQFormGuidedWorkflow
            mainTitle="CCA Guided Workflow"
            mainSubtitle="Please review these Services with you client, then confirm their responses."
            completedTasks={0}
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

import * as Yup from 'yup';
import React from 'react';
import {
  ExpandingCardList,
  ExpandingCard,
  RoundedButton,
  TextButton,
} from 'scplus-shared-components';
import {Grid, Typography, Box} from '@mui/material';
import {
  SQFormGuidedWorkflow,
  SQFormDropdown,
  SQFormTextarea,
  SQFormTextField,
} from '../src';
import type {FormikHelpers} from 'formik';
import type {
  SQFormGuidedWorkflowContext,
  SQFormGuidedWorkflowProps,
} from 'components/SQFormGuidedWorkflow/Types';
import type {CustomStory} from '../old_stories/types/storyHelperTypes';

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default {
  title: 'Forms/SQFormGuidedWorkflow',
  component: SQFormGuidedWorkflow,
  argTypes: {
    onError: {action: 'error', table: {disable: true}},
    taskModules: {table: {disable: true}},
  },
};

const outcomeDropdownOptions = [
  {label: 'Not Interested', value: 'not-interested'},
  {label: 'Interested', value: 'interested'},
];

type DefaultInitialValuesType = {
  outcome: string;
  notes: string;
};

const Template: CustomStory<
  SQFormGuidedWorkflowProps<DefaultInitialValuesType>
> = (): React.ReactElement => {
  const [isIneligible, setIneligible] = React.useState(false);
  const [isModuleDisabled, setIsModuleDisabled] = React.useState(false);
  const initialValues = {
    outcome: '',
    notes: '',
  };
  const taskModules = [
    {
      name: 'intro',
      title: 'Introduction',
      formikProps: {
        initialValues,
        onSubmit: async (
          values: typeof initialValues,
          _formikBag: FormikHelpers<typeof initialValues>,
          _context: SQFormGuidedWorkflowContext<typeof initialValues>
        ) => {
          await sleep(3000); // Simulate API call to see loading spinner
          if (values.outcome === 'not-interested') {
            setIsModuleDisabled(true);
          } else {
            setIsModuleDisabled(false);
          }
        },
        validationSchema: Yup.object({
          outcome: Yup.string().required(),
          notes: Yup.string(),
        }),
      },
      additionalInformationSectionProps: {
        Elements: (
          <>
            <Grid container={true}>
              <Grid item={true} sm={4}>
                <Typography variant="body2">Name: Bob Smith</Typography>
              </Grid>
              <Grid item={true} sm={4}>
                <Typography variant="body2">Age: 76</Typography>
              </Grid>
              <Grid item={true} sm={4}>
                <Typography variant="body2">
                  Occupation: Dream Engineer
                </Typography>
              </Grid>
            </Grid>
          </>
        ),
        title: 'Customer Information',
        infoText: 'This is suplmental information for the agent only.',
      },
      scriptedTextProps: {
        text: (
          <>
            <Grid container>
              <Grid item xs={12}>
                Review the following ancillary benefits with the client
              </Grid>
              <Grid item xs={6}>
                <Box component="ul" sx={{marginBottom: 0}}>
                  <li>Dental (Reimbursement / Co-Pay)</li>
                  <li>Transportation</li>
                  <li>Home Health Care</li>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box component="ul" sx={{marginBottom: 0}}>
                  <li>Meals</li>
                  <li>Fitness Membership</li>
                  <li>Part B Giveback</li>
                </Box>
              </Grid>
            </Grid>
          </>
        ),
        title: 'Agent Script',
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" size={4} >
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" size={4} />
          </>
        ),
        title: 'Confirm Info',
      },
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
        initialValues,
        onSubmit: async (
          values: typeof initialValues,
          _formikBag: FormikHelpers<typeof initialValues>,
          context: SQFormGuidedWorkflowContext<typeof initialValues>
        ) => {
          console.log(values);
          console.log(context);
        },
        validationSchema: Yup.object({
          outcome: Yup.string().required(),
          notes: Yup.string(),
        }),
      },
      scriptedTextProps: {
        text: `Stuff about policy cancellation documents`,
        title: 'Agent Script',
        actionButton: <TextButton tooltip="View">View Doc</TextButton>,
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" size={4}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" size={4}/>
            <Grid item={true} sm={4}>
              <RoundedButton
                title="Ineligible"
                onClick={() => setIneligible(true)}
              >
                Ineligible? Click here
              </RoundedButton>
            </Grid>    
          </>
        ),
        title: 'Confirm Info',
        infoText:
          'Interact with the form to see me change colors based on form state',
        warningText: 'Form needs your attention',
        successText: 'Form is ready to submit',
        errorText: 'Do not pass go, do not collect $200',
      },
    },
    {
      name: 'providers',
      title: 'Verify Providers',
      subtitles: ['Please verify the providers'],
      isDisabled: false,
      formikProps: {
        initialValues,
        onSubmit: async (
          values: typeof initialValues,
          _formikBag: FormikHelpers<typeof initialValues>,
          context: SQFormGuidedWorkflowContext<typeof initialValues>
        ) => {
          console.log(values);
          console.log(context);
        },
        validationSchema: Yup.object({
          outcome: Yup.string().required(),
          notes: Yup.string(),
        }),
      },
      additionalInformationSectionProps: {
        Elements: (
          <>
            <ul>
              <li>
                <div>
                  <b>Name</b>: Dr. Cassidy Cole,&nbsp;
                  <b>State</b>: Alaska,&nbsp;
                  <b>Primary</b>: Yes,&nbsp;
                </div>
              </li>
              <li>
                <div>
                  <b>Name</b>: Dr. Ana Amari,&nbsp;
                  <b>State</b>: Hawaii,&nbsp;
                  <b>Primary</b>: No,&nbsp;
                </div>
              </li>
              <li>
                <div>
                  <b>Name</b>: Dr. Hana Song,&nbsp;
                  <b>State</b>: Wisconsin,&nbsp;
                  <b>Primary</b>: No,&nbsp;
                </div>
              </li>
            </ul>
          </>
        ),
        title: 'Providers',
        actions: (
          <TextButton
            tooltip="View"
            onClick={() => window.alert('Awesome list here')}
          >
            View Full Providers List
          </TextButton>
        ),
      },
      scriptedTextProps: {
        text: 'Before proceeding, please verify the list of providers is correct',
        title: 'Agent Script',
        actionButton: <TextButton tooltip="View">View Providers</TextButton>,
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormDropdown name="outcome" label="Outcome" size={4}>
              {outcomeDropdownOptions}
            </SQFormDropdown>
            <SQFormTextarea name="notes" label="Notes" size={4} />
          </>
        ),
        title: 'Confirm Info',
      },
    },
  ];

  return (
    <Box sx={{width: '90%', height: '95vh'}}>
      <ExpandingCardList>
        <ExpandingCard title="Guided Workflow" name="guidedWorkflow">
          <SQFormGuidedWorkflow
            mainTitle="CCA Guided Workflow"
            mainSubtitle="Please review these Services with your client, then confirm their responses."
            initialCompletedTasks={0}
            isStrictMode={false}
            taskModules={taskModules}
            onError={(error) => {
              console.error(error);
            }}
          />
        </ExpandingCard>
      </ExpandingCardList>
    </Box>
  );
};

export const Default = Template.bind({});

const firstSectionInitialValues: FirstSectionInitialValuesType = {
  firstText: '',
  secondText: '',
};

type FirstSectionInitialValuesType = {
  firstText?: string;
  secondText?: string;
};

const secondSectionInitialValues: SecondSectionInitialValues = {
  testText: '',
  outcome: '',
  notes: '',
};

type SecondSectionInitialValues = {
  testText?: string;
  outcome?: string;
  notes?: string;
};

type InitialValuesType =
  | typeof firstSectionInitialValues
  | typeof secondSectionInitialValues;

const TestTemplate: CustomStory<
  SQFormGuidedWorkflowProps<InitialValuesType>
> = (args): React.ReactElement => {
  const {mainTitle, ...rest} = args;

  const taskModules = [
    {
      name: 'firstSection',
      title: 'First Section',
      formikProps: {
        initialValues: firstSectionInitialValues,
        onSubmit: async (values: InitialValuesType) => {
          console.log(JSON.stringify(values));
        },
        validationSchema: Yup.object({
          firstText: Yup.string().required(),
          secondText: Yup.string(),
        }),
      },
      scriptedTextProps: {
        text: 'This is some text',
        title: 'Script Title',
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormTextField name="firstText" label="First Text" size={4} />
            <SQFormTextField name="secondText" label="Second Text" size={4} />
          </>
        ),
        title: 'Outcome Test',
      },
    },
    {
      name: 'secondSection',
      title: 'Second Section',
      formikProps: {
        initialValues: secondSectionInitialValues,
        onSubmit: async (values: InitialValuesType) => {
          console.log(JSON.stringify(values));
        },
      },
      scriptedTextProps: {
        text: 'This is some more text',
        title: 'Another Script Title',
      },
      outcomeProps: {
        FormElements: (
          <>
            <SQFormTextField name="testText" label="Test Text" size={4} />
            <SQFormTextarea name="notes" label="Notes" size={4} />
          </>
        ),
        title: 'Outcome Test',
      },
    },
  ];

  return (
    <Box sx={{width: '90%', height: '95vh'}}>
      <ExpandingCardList>
        <ExpandingCard title="Guided Workflow Test" name="guidedWorkflowTest">
          <SQFormGuidedWorkflow<InitialValuesType>
            {...rest}
            mainTitle={mainTitle}
            onError={(error) => {
              console.error(error);
            }}
            taskModules={taskModules}
          />
        </ExpandingCard>
      </ExpandingCardList>
    </Box>
  );
};

export const Testing = TestTemplate.bind({});
Testing.args = {
  mainTitle: 'CCA Guided Workflow',
  mainSubtitle:
    'Please review these Services with your client, then confirm their responses.',
  isStrictMode: false,
};

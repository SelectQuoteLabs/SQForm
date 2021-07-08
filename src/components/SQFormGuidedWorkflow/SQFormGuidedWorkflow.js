import React from 'react';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {CardActions, CardContent, makeStyles} from '@material-ui/core';
import {
  Accordion,
  Section,
  SectionHeader,
  SectionBody
} from 'scplus-shared-components';
import SQFormButton from '../SQForm/SQFormButton';
import AgentScript from './AgentScript';
import OutcomeForm from './OutcomeForm';
import {GuidedWorkflowProps} from './PropTypes';

const useStyles = makeStyles(() => {
  return {
    panelFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      padding: '16px 24px'
    }
  };
});

const getTaskModuleFormSchema = (validationSchema = {}) => {
  return Yup.object().shape(validationSchema);
};

// Until Formik exposes the validationSchema (again) via Context, the solution has to be handled at the Form declaration level
// There's a few open PR's on this issue, here's one for reference: https://github.com/formium/formik/pull/2933
const getFormikInitialRequiredErrors = (validationSchema = {}) => {
  Object.entries(validationSchema).reduce((acc, [key, value]) => {
    if (value._exclusive?.required) {
      return {...acc, [key]: 'Required'};
    }
    return acc;
  }, {});
};

function SQFormGuidedWorkflow({
  taskModules,
  mainTitle,
  mainSubtitle,
  completedTasks = 0
}) {
  const classes = useStyles();
  const [currentTask, setCurrentTask] = React.useState(completedTasks || 1);

  const transformedTaskModules = taskModules.map((taskModule, index) => {
    const taskNumber = index + 1;
    const validationYupSchema = getTaskModuleFormSchema(
      taskModule.formikProps?.validationSchema
    );
    const initialErrors = getFormikInitialRequiredErrors(
      taskModule.formikProps?.validationSchema
    );
    const handleSubmit = () => {
      setCurrentTask(prevCurrentTask => {
        // Already on final task
        if (prevCurrentTask === taskModules.length) {
          return prevCurrentTask;
        }
        return (prevCurrentTask += 1);
      });
      taskModule.formikProps.onSubmit();
    };

    return {
      ...taskModule,
      isDisabled: taskModule.isDisabled || currentTask < taskNumber,
      isInitiallyExpanded:
        taskModule.isInitiallyExpanded || currentTask === taskNumber,
      body: (
        <Formik
          enableReinitialize={
            taskModule.formikProps?.enableReinitialize ?? false
          }
          initialErrors={initialErrors}
          initialValues={taskModule.formikProps.initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationYupSchema}
          validateOnMount={true}
        >
          {_props => (
            <Form>
              <CardContent>
                <AgentScript {...taskModule.scriptedTextProps} />
                <OutcomeForm {...taskModule.outcomeProps} />
              </CardContent>
              <CardActions className={classes.panelFooter}>
                <SQFormButton type="reset" title="Reset Form">
                  {taskModule?.resetButtonText ?? 'Reset'}
                </SQFormButton>
                <SQFormButton isDisabled={taskModule?.isSubmitButtonDisabled}>
                  {taskModule?.submitButtonText ?? 'Next'}
                </SQFormButton>
              </CardActions>
            </Form>
          )}
        </Formik>
      )
    };
  });

  return (
    <Section style={{padding: '20px'}}>
      <SectionHeader title={mainTitle} informativeHeading={mainSubtitle} />
      <SectionBody>
        <Accordion accordionPanels={transformedTaskModules} />
      </SectionBody>
    </Section>
  );
}

SQFormGuidedWorkflow.propTypes = GuidedWorkflowProps;

export default SQFormGuidedWorkflow;

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
import {useManageTaskModules} from './useManageTaskModules';
import {useGuidedWorkflowContext} from './useGuidedWorkflowContext';

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
  initialCompletedTasks = 0,
  isStrictMode = false,
  onError
}) {
  const classes = useStyles();

  const [
    taskModulesContext,
    updateTaskModuleContextByID
  ] = useGuidedWorkflowContext(taskModules);

  const {
    taskModulesState,
    updateActiveTaskModule,
    enableNextTaskModule
  } = useManageTaskModules(initialCompletedTasks, taskModulesContext);

  const transformedTaskModules = taskModules.map((taskModule, index) => {
    const taskNumber = index + 1;
    const taskName = taskModule.name;
    const validationYupSchema = getTaskModuleFormSchema(
      taskModule.formikProps?.validationSchema
    );
    const initialErrors = getFormikInitialRequiredErrors(
      taskModule.formikProps?.validationSchema
    );
    const isPanelExpanded =
      taskModulesContext[taskModulesState.activeTaskModuleID].name === taskName;
    const getIsDisabled = () => {
      if (isStrictMode && taskModulesState.activeTaskModuleID !== taskNumber) {
        return true;
      }
      if (
        taskModule.isDisabled ||
        taskModulesState.progressTaskModuleID < taskNumber
      ) {
        return true;
      }
      return false;
    };
    const handleSubmit = async (values, formikBag) => {
      try {
        // TODO: Render centered loading spinner
        await taskModule.formikProps.onSubmit(values, formikBag);
        updateTaskModuleContextByID(taskNumber, values);
        enableNextTaskModule();
      } catch (error) {
        onError(error);
      } finally {
        // TODO: cancel loading spinner
      }
    };

    return {
      ...taskModule,
      isDisabled: getIsDisabled(),
      isInitiallyExpanded: taskModule.isInitiallyExpanded || isPanelExpanded,
      expandPanel: () => {}, // Faulty logic in the Accordion SSC requires precense of a function for isPanelExpanded to work
      isPanelExpanded,
      onClick: () => {
        updateActiveTaskModule(taskNumber);
      },
      body: (
        <Formik
          enableReinitialize={true}
          initialErrors={initialErrors}
          initialValues={taskModulesContext[taskNumber].data}
          onSubmit={handleSubmit}
          validationSchema={validationYupSchema}
          validateOnMount={true}
        >
          {({isSubmitting}) => (
            <Form>
              <CardContent>
                <AgentScript {...taskModule.scriptedTextProps} />
                <OutcomeForm {...taskModule.outcomeProps} />
              </CardContent>
              <CardActions className={classes.panelFooter}>
                <SQFormButton type="reset" title="Reset Form">
                  {taskModule?.resetButtonText ?? 'Reset'}
                </SQFormButton>
                <SQFormButton
                  shouldRequireFieldUpdates={true}
                  isDisabled={
                    taskModule?.isSubmitButtonDisabled || isSubmitting
                  }
                >
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

import React from 'react';
import {Formik, Form} from 'formik';
import {CardActions, CardContent} from '@mui/material';
import {
  Accordion,
  ComponentLoadingSpinner,
  Section,
  SectionHeader,
  SectionBody,
} from 'scplus-shared-components';
import SQFormButton from '../buttons/SQFormButton';
import AgentScript from './AgentScript';
import OutcomeForm from './OutcomeForm';
import AdditionalInformationSection from './AdditionalInformationSection';
import {useManageTaskModules} from './useManageTaskModules';
import {useGuidedWorkflowContext} from './useGuidedWorkflowContext';
import {getInitialRequiredErrors} from '../../hooks/useInitialRequiredErrors';
import type {FormikHelpers, FormikValues} from 'formik';
import type {SQFormGuidedWorkflowProps} from './Types';

const classes = {
  sectionBody: {
    '& .MuiCollapse-wrapper .MuiBox-root': {
      padding: '0px',
    },
  },
  panelFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '16px 24px',
  },
};

function SQFormGuidedWorkflow<TValues extends FormikValues>({
  taskModules,
  mainTitle,
  mainSubtitle,
  initialCompletedTasks = 0,
  isStrictMode = false,
  onError,
  containerStyles = {},
}: SQFormGuidedWorkflowProps<TValues>): React.ReactElement {
  const {
    state: taskModulesContext,
    updateDataByID: updateTaskModuleContextByID,
  } = useGuidedWorkflowContext<TValues>(taskModules);

  const {taskModulesState, updateActiveTaskModule, enableNextTaskModule} =
    useManageTaskModules<TValues>(initialCompletedTasks, taskModulesContext);

  const transformedTaskModules = taskModules.map((taskModule, index) => {
    const taskNumber = index + 1;
    const taskName = taskModule.name;
    const validationYupSchema = taskModule.formikProps?.validationSchema;
    const initialErrors = taskModule.formikProps?.validationSchema
      ? getInitialRequiredErrors<TValues>(
          taskModule.formikProps?.validationSchema,
          taskModule.formikProps?.initialValues
        )
      : {};
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

    const handleSubmit = async (
      values: TValues,
      formikBag: FormikHelpers<TValues>
    ) => {
      const context = {
        ...taskModulesContext,
        [taskNumber]: {
          ...taskModulesContext[taskNumber],
          data: values,
        },
      };

      try {
        await taskModule.formikProps.onSubmit(values, formikBag, context);
        updateTaskModuleContextByID(taskNumber, values);
        enableNextTaskModule();
      } catch (error) {
        onError && onError(error as Error);
      }
    };

    const handleReset = async (
      values: TValues,
      formikBag: FormikHelpers<TValues>
    ) => {
      const onReset = taskModule.formikProps?.onReset;
      onReset && onReset(values, formikBag, taskModulesContext);
    };

    return {
      ...taskModule,
      isDisabled: getIsDisabled(),
      isInitiallyExpanded: taskModule.isInitiallyExpanded || isPanelExpanded,
      expandPanel: () => {
        /* do nothing */
      }, // Faulty logic in the Accordion SSC requires precense of a function for isPanelExpanded to work
      isPanelExpanded,
      onClick: () => {
        taskModule?.onClick && taskModule.onClick();
        updateActiveTaskModule(taskNumber);
      },
      body: (
        <Formik
          enableReinitialize={true}
          initialErrors={initialErrors}
          initialValues={taskModulesContext[taskNumber].data}
          onSubmit={handleSubmit}
          onReset={handleReset}
          validationSchema={validationYupSchema}
          validateOnMount={true}
        >
          {({isSubmitting}) => (
            <Form>
              <CardContent>
                {isSubmitting || taskModule.isLoading ? (
                  <div data-testid="loadingSpinner">
                    <ComponentLoadingSpinner
                      message={
                        isSubmitting
                          ? `Saving ${taskModule.title} outcome`
                          : taskModule.isLoadingMessage
                      }
                    />
                  </div>
                ) : (
                  <>
                    {taskModule.additionalInformationSectionProps && (
                      <AdditionalInformationSection
                        {...taskModule.additionalInformationSectionProps}
                        isFailedState={taskModule.isFailedState}
                      />
                    )}
                    <AgentScript
                      {...taskModule.scriptedTextProps}
                      isFailedState={taskModule.isFailedState}
                    />
                    <OutcomeForm
                      {...taskModule.outcomeProps}
                      isFailedState={taskModule.isFailedState}
                    />
                  </>
                )}
              </CardContent>
              <CardActions sx={classes.panelFooter}>
                <SQFormButton type="reset" title="Reset Form">
                  {taskModule?.resetButtonText ?? 'Reset'}
                </SQFormButton>
                <SQFormButton
                  shouldRequireFieldUpdates={true}
                  isDisabled={
                    taskModule.isFailedState ||
                    taskModule?.isSubmitButtonDisabled ||
                    isSubmitting
                  }
                >
                  {taskModule?.submitButtonText ?? 'Next'}
                </SQFormButton>
              </CardActions>
            </Form>
          )}
        </Formik>
      ),
    };
  });

  return (
    <Section sx={{padding: '20px', ...containerStyles}}>
      <SectionHeader title={mainTitle} informativeHeading={mainSubtitle} />
      <SectionBody sx={classes.sectionBody}>
        <Accordion accordionPanels={transformedTaskModules} />
      </SectionBody>
    </Section>
  );
}

export default SQFormGuidedWorkflow;

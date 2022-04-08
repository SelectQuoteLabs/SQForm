import SQFormButton from '../SQForm/SQFormButton';
import AdditionalInformationSection from './AdditionalInformationSection';
import AgentScript from './AgentScript';
import OutcomeForm from './OutcomeForm';
import type {
  SQFormGuidedWorkflowDataProps,
  SQFormGuidedWorkflowProps,
} from './Types';
import {useGuidedWorkflowContext} from './useGuidedWorkflowContext';
import {useManageTaskModules} from './useManageTaskModules';
import {CardActions, CardContent, makeStyles} from '@material-ui/core';
import {Formik, Form} from 'formik';
import type {FormikHelpers, FormikValues} from 'formik';
import React from 'react';
import {
  Accordion,
  ComponentLoadingSpinner,
  Section,
  SectionHeader,
  SectionBody,
} from 'scplus-shared-components';
import * as Yup from 'yup';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: '16px !important' /* material-ui override */,
    },
    panelFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      padding: '16px 24px',
    },
  };
});

function SQFormGuidedWorkflow<TValues extends FormikValues>({
  taskModules,
  mainTitle,
  mainSubtitle,
  initialCompletedTasks = 0,
  isStrictMode = false,
  onError,
  containerStyles = {},
}: SQFormGuidedWorkflowProps<TValues>): React.ReactElement {
  // Until Formik exposes the validationSchema (again) via Context, the solution has to be handled at the Form declaration level
  // There's a few open PR's on this issue, here's one for reference: https://github.com/formium/formik/pull/2933
  const getFormikInitialRequiredErrors = (
    validationSchema?: SQFormGuidedWorkflowDataProps<TValues>['validationSchema']
  ) => {
    if (validationSchema?.fields) {
      const validationFields =
        validationSchema.fields as Yup.ObjectSchema<TValues>;
      return Object.entries(validationFields).reduce((acc, [key, value]) => {
        if (value.tests[0]?.OPTIONS.name === 'required') {
          return {...acc, [key]: 'Required'};
        }
        return acc;
      }, {});
    }

    return {};
  };

  const classes = useStyles();

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
          validationSchema={validationYupSchema}
          validateOnMount={true}
        >
          {({isSubmitting}) => (
            <Form>
              <CardContent className={classes.root}>
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
              <CardActions className={classes.panelFooter}>
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
    <Section style={{padding: '20px', ...containerStyles}}>
      <SectionHeader title={mainTitle} informativeHeading={mainSubtitle} />
      <SectionBody>
        <Accordion accordionPanels={transformedTaskModules} />
      </SectionBody>
    </Section>
  );
}

export default SQFormGuidedWorkflow;

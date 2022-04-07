import React from 'react';
import type {
  SQFormGuidedWorkflowTaskModuleProps,
  SQFormGuidedWorkflowContext,
} from './Types';

type GuidedWorkflowDispatchActionType<TValues> = {
  type: 'UPDATE';
  id: number;
  data: TValues;
};

type UseGuidedWorkflowContextType<TValues> = {
  state: SQFormGuidedWorkflowContext<TValues>;
  updateDataByID: (id: number, data: TValues) => void;
};

export function useGuidedWorkflowContext<TValues>(
  taskModules: Array<SQFormGuidedWorkflowTaskModuleProps<TValues>>
): UseGuidedWorkflowContextType<TValues> {
  const initialData = taskModules.reduce<SQFormGuidedWorkflowContext<TValues>>(
    (acc, taskModule, index) => {
      return {
        ...acc,
        [index + 1]: {
          name: taskModule.name,
          data: taskModule.formikProps.initialValues,
          isDisabled: taskModule.isDisabled || false,
        },
      };
    },
    {}
  );

  const reducer = (
    prevState: SQFormGuidedWorkflowContext<TValues>,
    action: GuidedWorkflowDispatchActionType<TValues>
  ) => {
    switch (action.type) {
      case 'UPDATE':
        return taskModules.reduce<SQFormGuidedWorkflowContext<TValues>>(
          (acc, taskModlue, index) => {
            const taskID = index + 1;
            const prevData = prevState[taskID].data;
            return {
              ...acc,
              [taskID]: {
                name: taskModlue.name,
                data: action.id === taskID ? action.data : prevData,
                isDisabled: taskModlue.isDisabled || false,
              },
            };
          },
          {}
        );
      default:
        throw new Error(
          `The ${action.type} type provided to useGuidedWorkflow is not valid`
        );
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialData);

  const updateDataByID = (id: keyof typeof initialData, data: TValues) => {
    dispatch({type: 'UPDATE', id, data});
  };

  return {state, updateDataByID};
}

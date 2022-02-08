import React from 'react';
import type {
  TaskModuleProps,
  Context,
  GuidedWorkflowDispatchActionType,
  UseGuidedWorkflowContextType,
} from './Types';

export function useGuidedWorkflowContext<TValues>(
  taskModules: Array<TaskModuleProps<TValues>>
): UseGuidedWorkflowContextType<TValues> {
  const initialData = taskModules.reduce<Context<TValues>>(
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
    prevState: Context<TValues>,
    action: GuidedWorkflowDispatchActionType<TValues>
  ) => {
    switch (action.type) {
      case 'UPDATE':
        return taskModules.reduce<Context<TValues>>(
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

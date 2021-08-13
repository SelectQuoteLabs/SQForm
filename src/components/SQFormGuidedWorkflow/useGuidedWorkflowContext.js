import React from 'react';

export function useGuidedWorkflowContext(taskModules) {
  const initialData = taskModules.reduce((acc, taskModule, index) => {
    return {
      ...acc,
      [index + 1]: {
        name: taskModule.name,
        data: taskModule.formikProps.initialValues,
        isDisabled: taskModule.isDisabled || false
      }
    };
  }, {});

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'UPDATE':
        return taskModules.reduce((acc, taskModlue, index) => {
          const taskID = index + 1;
          const prevData = prevState[taskID].data;
          return {
            ...acc,
            [taskID]: {
              name: taskModlue.name,
              data: action.id === taskID ? action.data : prevData,
              isDisabled: taskModlue.isDisabled || false
            }
          };
        }, {});
      default:
        throw new Error(
          `The ${action.type} type provided to useGuidedWorkflow is not valid`
        );
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialData);

  const updateDataByID = (id, data) => {
    dispatch({type: 'UPDATE', id, data});
  };

  return [state, updateDataByID];
}

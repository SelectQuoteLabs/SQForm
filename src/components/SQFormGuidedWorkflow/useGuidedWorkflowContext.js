import React from 'react';

export function useGuidedWorkflowContext(taskModules) {
  const initialData = taskModules.reduce((acc, taskModule, index) => {
    return {
      ...acc,
      [index + 1]: {
        name: taskModule.name,
        data: taskModule.formikProps.initialValues
      }
    };
  }, {});

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {
          ...prevState,
          [action.id]: {
            ...prevState[action.id],
            data: action.data
          }
        };
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

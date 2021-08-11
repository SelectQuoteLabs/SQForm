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
        return {
          ...prevState,
          [action.id]: {
            ...prevState[action.id],
            data: action.data,
            isDisabled: action.isDisabled
          }
        };
      default:
        throw new Error(
          `The ${action.type} type provided to useGuidedWorkflow is not valid`
        );
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialData);

  const updateDataByID = (id, data, isDisabled) => {
    console.log('updateDataByID', id, data, isDisabled);
    dispatch({type: 'UPDATE', id, data, isDisabled});
  };

  return [state, updateDataByID];
}

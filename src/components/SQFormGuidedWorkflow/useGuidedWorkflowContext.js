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
            data: action.data
          }
        };
      case 'UPDATE_MODULES':
        return taskModules.reduce((acc, taskModule, index) => {
          return {
            ...acc,
            [index + 1]: {
              name: taskModule.name,
              data: prevState[index + 1].data,
              isDisabled: taskModule.isDisabled || false
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

  const updateTaskModules = () => {
    dispatch({type: 'UPDATE_MODULES'});
  };

  return [state, updateDataByID, updateTaskModules];
}

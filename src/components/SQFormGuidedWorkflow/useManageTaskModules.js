import React from 'react';

const getInitialTaskModuleID = (initialCompletedTasks, firstTaskModuleID) => {
  if (!!initialCompletedTasks) {
    return initialCompletedTasks + 1;
  }
  return firstTaskModuleID;
};

export function useManageTaskModules(
  initialCompletedTasks,
  taskModulesContext
) {
  const taskModulesLength = Object.keys(taskModulesContext).length;
  const firstTaskModuleID = Number(Object.keys(taskModulesContext)[0]);
  const initialTaskModuleID = getInitialTaskModuleID(
    initialCompletedTasks,
    firstTaskModuleID
  );

  const initialState = {
    // Task Module agent is current viewing
    activeTaskModuleID: initialTaskModuleID,
    // Task Module the agent is progressed to (Agent can go to previous task modules, this tracks the total progress)
    progressTaskModuleID: initialTaskModuleID
  };

  const manageTaskModulesReducer = (prevState, action) => {
    const isTaskIDTheFinalTask = prevTaskID => {
      return prevTaskID === taskModulesLength;
    };

    const isTaskDisabled = taskID => {
      return taskModulesContext[taskID].isDisabled;
    };

    const findNextTask = prevTaskID => {
      if (isTaskIDTheFinalTask(prevTaskID)) {
        return;
      }

      const nextTaskID = prevTaskID + 1;
      //const nextTask = taskModulesContext[nextTaskID];

      if (isTaskDisabled(nextTaskID)) {
        return findNextTask(nextTaskID);
      }

      return nextTaskID;
    };

    const incrementTaskModuleID = prevTaskID => {
      if (isTaskIDTheFinalTask(prevTaskID)) {
        return prevTaskID;
      }

      const nextTaskModuleID = findNextTask(prevTaskID);

      if (nextTaskModuleID) {
        return nextTaskModuleID;
      }

      return prevTaskID;
    };

    const incrementActiveTaskModuleID = () => {
      return incrementTaskModuleID(prevState.activeTaskModuleID);
    };

    const incrementProgressTaskModuleID = () => {
      return incrementTaskModuleID(prevState.progressTaskModuleID);
    };

    const enableNextTaskModule = () => {
      return {
        ...prevState,
        activeTaskModuleID: incrementActiveTaskModuleID(),
        progressTaskModuleID: incrementProgressTaskModuleID()
      };
    };

    const updateActiveTaskModuleID = id => {
      console.log('taskModulesContext', taskModulesContext);
      console.log('isTaskDisabled(id)', isTaskDisabled(id));
      if (isTaskDisabled(id)) {
        console.log('findNextTask(id)', findNextTask(id));
        return {...prevState, activeTaskModuleID: findNextTask(id)};
      }
      return {...prevState, activeTaskModuleID: id};
    };

    switch (action.type) {
      case 'UPDATE_ACTIVE_TASK_MODULE':
        return updateActiveTaskModuleID(action.id);
      case 'ENABLE_NEXT_TASK_MODULE':
        if (prevState.activeTaskModuleID === prevState.progressTaskModuleID) {
          return enableNextTaskModule();
        }

        return updateActiveTaskModuleID(prevState.progressTaskModuleID);
      case 'RESET_TO_INITIAL_STATE':
        return initialState;
      default:
        throw new Error(
          'Invalid Action Type provided to manageTaskModulesReducer'
        );
    }
  };

  const [taskModulesState, updateTaskModulesState] = React.useReducer(
    manageTaskModulesReducer,
    initialState
  );

  const updateActiveTaskModule = taskNumber => {
    if (taskModulesState.activeTaskModuleID !== taskNumber) {
      updateTaskModulesState({
        type: 'UPDATE_ACTIVE_TASK_MODULE',
        id: taskNumber
      });
    }
  };

  const enableNextTaskModule = () => {
    updateTaskModulesState({type: 'ENABLE_NEXT_TASK_MODULE'});
  };

  return {
    taskModulesState,
    updateActiveTaskModule,
    enableNextTaskModule
  };
}

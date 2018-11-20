import * as TYPES from './taskTypes';

const taskActions = {
    UpdateTaskList({
        commit
    }, taskListData) {
        commit(TYPES.UPDATE_TASK_LIST, taskListData);
    },
}

export default taskActions;
import * as TYPES from './taskTypes';

const taskActions = {
    AddTaskList({
        commit
    }, taskListData) {
        commit(TYPES.ADD_TASK_LIST, taskListData);
    },
    UpdateActiveTaskListType({
        commit
    }, type) {
        commit(TYPES.UPDATE_ACTIVE_TASK_LIST_TYPE, type);
    },
    UpdateAllActiveTaskType({
        commit
    }, type) {
        commit(TYPES.UPDATE_ALL_ACTIVE_TASK_TYPE, taskItemData);
    }
}

export default taskActions;
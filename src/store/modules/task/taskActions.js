import * as TYPES from './taskTypes';

const taskActions = {
    AddTaskList({
        commit
    }, taskListArrayData) {
        commit(TYPES.ADD_TASK_LIST, taskListArrayData);
    },
    UpdateActiveTaskListType({
        commit
    }, type) {
        commit(TYPES.UPDATE_ACTIVE_TASK_LIST_TYPE, type);
    },
    UpdateAllActiveTaskType({
        commit
    }, taskItemData) {
        commit(TYPES.UPDATE_ALL_ACTIVE_TASK_TYPE, taskItemData);
    },
    AddTaskItem({
        commit
    }, taskItemArrayData) {
        commit(TYPES.ADD_TASK_ITEM, taskItemArrayData);
    },
}

export default taskActions;
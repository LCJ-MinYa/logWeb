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
    UpdateActiveTaskItemType({
        commit
    }, type) {
        commit(TYPES.UPDATE_ACTIVE_TASK_ITEM_TYPE, type);
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
    UpdateTaskItem({
        commit
    }, taskItemData) {
        commit(TYPES.UPDATE_TASK_ITEM, taskItemData);
    },
    UpdateCompleteTaskItem({
        commit
    }, taskItemArrayData) {
        commit(TYPES.UPDATE_COMPLETE_TASK_ITEM, taskItemArrayData);
    },
    DeleteTaskItem({
        commit
    }, taskItemArrayData){
        commit(TYPES.DELETE_TASK_ITEM, taskItemArrayData);
    }
}

export default taskActions;
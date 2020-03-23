import * as TYPES from './taskTypes';

const taskGetters = {
    taskList(state) {
        return state.taskList;
    },
    taskItem(state) {
        return state.taskItem;
    },
    taskItemData(state) {
        return state.taskItem[state.activeTaskListType];
    },
    activeTaskListType(state) {
        return state.activeTaskListType;
    },
    activeTaskItemType(state) {
        return state.activeTaskItemType;
    },
    editTaskItemData(state) {
        return state.editTaskItemData;
    },
    tagArray(state) {
        return state.tagArray;
    },
    isRequestTaskList(state){
        return state.isRequestTaskList;
    }
}

export default taskGetters;
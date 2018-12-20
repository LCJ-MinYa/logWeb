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
    taskItemArrayData(state) {
        return state.taskItem[state.activeTaskListType][state.activeTaskItemType].data;
    },
    activeTaskListType(state) {
        return state.activeTaskListType;
    },
    activeTaskItemType(state) {
        return state.activeTaskItemType;
    },
    editTaskItemData(state) {
        return state.editTaskItemData;
    }
}

export default taskGetters;
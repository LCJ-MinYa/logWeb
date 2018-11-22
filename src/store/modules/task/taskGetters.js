import * as TYPES from './taskTypes';

const taskGetters = {
    taskList(state) {
        return state.taskList;
    },
    taskItem(state) {
        return state.taskItem;
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
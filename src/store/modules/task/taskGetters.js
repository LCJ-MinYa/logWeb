import * as TYPES from './taskTypes';

const taskGetters = {
    taskList(state) {
        return state.taskList;
    },
    taskItem(state) {
        return state.taskItem;
    },
    activeTaskItem(state) {
        return state.activeTaskItem;
    },
    editTaskItemData(state) {
        return state.editTaskItemData;
    }
}

export default taskGetters;
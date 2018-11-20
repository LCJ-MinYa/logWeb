import * as TYPES from './taskTypes';
import taskActions from './taskActions';
import taskGetters from './taskGetters';

const state = {
    taskList: [{
        icon: 'icon-liebiao',
        text: '任务列表'
    }, {
        icon: 'icon-plus-creat',
        text: '新建任务'
    }],
}

const mutations = {
    [TYPES.UPDATE_TASK_LIST](state, taskListData) {
        for (let i = 0; i < taskListData.length; i++) {
            taskListData[i].icon = 'icon-yuandian';
        }
        state.taskList = state.taskList.concat(taskListData);
    }
}

const task = {
    state: state,
    mutations: mutations,
    actions: taskActions,
    getters: taskGetters
}

export default task;
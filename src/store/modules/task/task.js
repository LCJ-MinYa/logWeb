import * as TYPES from './taskTypes';
import taskActions from './taskActions';
import taskGetters from './taskGetters';

const state = {
    taskList: [{
        _id: 'default',
        icon: 'icon-liebiao',
        text: '任务列表'
    }, {
        _id: 'default',
        icon: 'icon-plus-creat',
        text: '新建任务'
    }],
    taskItem: {
        default: {
            uncomplete: {
                isRequest: false,
                data: []
            },
            complete: {
                isRequest: false,
                data: []
            }
        }
    },
    activeTaskListType: 'default',
    activeTaskItemType: "uncomplete",
    editTaskItemData: {
        index: 0,
        data: {}
    }
}

const mutations = {
    [TYPES.ADD_TASK_LIST](state, taskListData) {
        for (let i = 0; i < taskListData.length; i++) {
            state.taskItem[taskListData[i]._id] = {
                uncomplete: {
                    isRequest: false,
                    data: []
                },
                complete: {
                    isRequest: false,
                    data: []
                }
            }
            if (!taskListData[i].icon) {
                taskListData[i].icon = 'icon-yuandian';
            }
        }
        state.taskList = state.taskList.concat(taskListData);
    },
    [TYPES.UPDATE_ACTIVE_TASK_LIST_TYPE](state, type) {
        state.activeTaskListType = type;
    }
}

const task = {
    state: state,
    mutations: mutations,
    actions: taskActions,
    getters: taskGetters
}

export default task;
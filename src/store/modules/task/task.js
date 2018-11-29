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
                name: 'uncomplete',
                label: '未完成',
                isRequest: false,
                data: []
            },
            complete: {
                name: 'complete',
                label: '已完成',
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
                    name: 'uncomplete',
                    label: '未完成',
                    isRequest: false,
                    data: []
                },
                complete: {
                    name: 'complete',
                    label: '已完成',
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
    },
    [TYPES.UPDATE_ALL_ACTIVE_TASK_TYPE](state, taskItemData) {
        console.log(taskItemData);
        state.activeTaskItemType = taskItemData.isComplete ? 'complete' : 'uncomplete';
        state.activeTaskListType = taskItemData._id;
    }
}

const task = {
    state: state,
    mutations: mutations,
    actions: taskActions,
    getters: taskGetters
}

export default task;
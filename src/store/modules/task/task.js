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
    [TYPES.ADD_TASK_LIST](state, taskListArrayData) {
        for (let i = 0; i < taskListArrayData.length; i++) {
            state.taskItem[taskListArrayData[i]._id] = {
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
            if (!taskListArrayData[i].icon) {
                taskListArrayData[i].icon = 'icon-yuandian';
            }
        }
        state.taskList = state.taskList.concat(taskListArrayData);
    },
    [TYPES.UPDATE_ACTIVE_TASK_LIST_TYPE](state, type) {
        state.activeTaskListType = type;
    },
    [TYPES.UPDATE_ALL_ACTIVE_TASK_TYPE](state, taskItemData) {
        state.activeTaskItemType = taskItemData.isComplete ? 'complete' : 'uncomplete';
        state.activeTaskListType = taskItemData.type;
    },
    [TYPES.ADD_TASK_ITEM](state, taskItemArrayData) {
        let item = state.taskItem[state.activeTaskListType][state.activeTaskItemType];
        item.isRequest = true;
        item.data = taskItemArrayData;
        state.taskItem = JSON.parse(JSON.stringify(state.taskItem));
    }
}

const task = {
    state: state,
    mutations: mutations,
    actions: taskActions,
    getters: taskGetters
}

export default task;
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
    },
    tagArray: [{
        name: '个人',
        _id: 0,
    }, {
        name: '公司',
        _id: 1,
    }, {
        name: '前端',
        _id: 2,
    }, {
        name: '后端',
        _id: 3,
    }, {
        name: 'React Native',
        _id: 4,
    }, {
        name: 'Node',
        _id: 5,
    }, {
        name: 'Vue',
        _id: 6,
    }, {
        name: 'iOS',
        _id: 7,
    }, {
        name: 'Android',
        _id: 8,
    }]
}

const mutations = {
    [TYPES.ADD_TASK_LIST](state, taskListArrayData) {
        for (let i = 0; i < taskListArrayData.length; i++) {
            state.taskItem[taskListArrayData[i]._id] = {
                uncomplete: {
                    name: 'uncomplete',
                    label: '未完成',
                    isRequest: false,
                    data: [],
                    text: taskListArrayData[i].text + 'uncomplete',
                },
                complete: {
                    name: 'complete',
                    label: '已完成',
                    isRequest: false,
                    data: [],
                    text: taskListArrayData[i].text + 'complete',
                }
            }
            if (!taskListArrayData[i].icon) {
                taskListArrayData[i].icon = 'icon-yuandian';
            }
        }
        state.taskItem = JSON.parse(JSON.stringify(state.taskItem));
        state.taskList = state.taskList.concat(taskListArrayData);
    },
    [TYPES.UPDATE_ACTIVE_TASK_LIST_TYPE](state, type) {
        state.activeTaskListType = type;
    },
    [TYPES.UPDATE_ACTIVE_TASK_ITEM_TYPE](state, type) {
        state.activeTaskItemType = type;
    },
    [TYPES.UPDATE_ALL_ACTIVE_TASK_TYPE](state, taskItemData) {
        state.activeTaskItemType = taskItemData.isComplete ? 'complete' : 'uncomplete';
        state.activeTaskListType = taskItemData.type;
    },
    [TYPES.ADD_TASK_ITEM](state, taskItemArrayData) {
        let item = state.taskItem[state.activeTaskListType][state.activeTaskItemType];
        if (Array.isArray(taskItemArrayData)) {
            item.isRequest = true;
            item.data = item.data.concat(taskItemArrayData);
        } else {
            item.data.push(taskItemArrayData);
        }
    },
    [TYPES.UPDATE_TASK_ITEM](state, taskItemData) {
        let item = state.taskItem[state.activeTaskListType][state.activeTaskItemType];
        for (let i = 0; i < item.data.length; i++) {
            if (item.data[i]._id == taskItemData._id) {
                item.data.splice(i, 1, taskItemData);
            }
        }
    },
    [TYPES.UPDATE_COMPLETE_TASK_ITEM](state, taskItemArrayData) {
        let item = state.taskItem[state.activeTaskListType]['complete'];
        item.data = item.data.concat(taskItemArrayData);
    },
    [TYPES.DELETE_TASK_ITEM](state, taskItemArrayData) {
        let item = state.taskItem[state.activeTaskListType][state.activeTaskItemType];
        for (let i = 0; i < item.data.length; i++) {
            for (let j = 0; j < taskItemArrayData.length; j++) {
                if (item.data[i]._id == taskItemArrayData[j]._id) {
                    item.data.splice(i, 1);
                }
            }
        }
    },
    [TYPES.EDIT_TASK_ITEM](state, taskItemData) {
        state.editTaskItemData = taskItemData;
    }
}

const task = {
    state: state,
    mutations: mutations,
    actions: taskActions,
    getters: taskGetters
}

export default task;
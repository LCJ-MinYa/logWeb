import {
    message,
    matchEmail
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import auth from '../assets/js/auth'
import api from '../api/apiPath'

export default {
    getTaskListData(_this) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'GET',
                url: api.TASK_LIST,
                data: {},
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    doAddTaskListData(_this, value) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.ADD_TASK_LIST,
                data: {
                    text: value
                },
                success: (result) => {
                    message(_this, result.errmsg, 'success');
                    resolve(result.data);
                }
            }, _this);
        })
    },
    doCheckOutTaskMsg(_this) {
        if (!_this.taskForm.title) {
            message(_this, '任务名称不能为空!', 'warning');
            return false;
        }
        if (!_this.taskForm.type) {
            message(_this, '所属项目不能为空!', 'warning');
            return false;
        }
        return true;
    },
    packTaskItemData(_this) {
        const {
            taskForm
        } = _this;
        let taskItemData = {
            title: taskForm.title,
            date: taskForm.date,
            time: taskForm.time,
            tag: taskForm.tag,
            isComplete: taskForm.isComplete,
            type: taskForm.type,
            importance: taskForm.importance,
            notes: taskForm.notes
        }
        return taskItemData;
    },
    doCreatTaskItemData(_this) {
        return new Promise((resolve, reject) => {
            let taskItemData = this.packTaskItemData(_this);
            httpRequest({
                method: 'POST',
                url: api.CREAT_TASK_ITEM,
                data: taskItemData,
                success: (result) => {
                    taskItemData._id = result.data._id;
                    taskItemData.beginDate = result.data.beginDate;
                    taskItemData.endDate = result.data.endDate;
                    taskItemData.totalTime = result.data.totalTime;
                    taskItemData.completeDate = result.data.completeDate;
                    message(_this, result.errmsg, 'success');
                    resolve(taskItemData);
                }
            }, _this, '提交中...');
        })
    },
    getTaskItemData(_this) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'GET',
                url: api.TASk_ITEM,
                data: {
                    itemType: _this.activeTaskItemType,
                    listType: _this.activeTaskListType
                },
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    beginTask(_this, taskItemData) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.BEGIN_TASk,
                data: {
                    type: taskItemData.type,
                    isComplete: taskItemData.isComplete,
                    _id: taskItemData._id
                },
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    endTask(_this, taskItemData) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.END_TASk,
                data: {
                    type: taskItemData.type,
                    isComplete: taskItemData.isComplete,
                    _id: taskItemData._id
                },
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    completeTask(_this, taskItemArrayData) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.COMPLETE_TASk,
                data: {
                    completeList: taskItemArrayData
                },
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    deleteTask(_this, taskItemData) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.DELETE_TASk,
                data: {
                    type: taskItemData.type,
                    isComplete: taskItemData.isComplete,
                    _id: taskItemData._id
                },
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    },
    updateTask(_this) {
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'POST',
                url: api.UPDATE_TASk,
                data: _this.taskForm,
                success: (result) => {
                    resolve(result.data);
                }
            }, _this);
        })
    }
}
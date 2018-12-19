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
                    message(_this, result.errmsg, 'success');
                    resolve(taskItemData);
                }
            }, _this, '提交中...');
        })
    },
    getTaskItemData(_this){
        return new Promise((resolve, reject) => {
            httpRequest({
                method: 'GET',
                url: api.TASk_ITEM,
                data: {
                    itemType: _this.activeTaskItemType,
                    listType: _this.activeTaskListType
                },
                success: (result) => {
                    console.log(result);
                    result.type = _this.activeType;
                    resolve(result);
                }
            }, _this);
        })
    }
}
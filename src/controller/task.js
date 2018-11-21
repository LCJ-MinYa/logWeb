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
                method: 'POST',
                url: api.TASK_LIST,
                data: {
                    uid: auth.getAuthUid()
                },
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
                    uid: auth.getAuthUid(),
                    text: value
                },
                success: (result) => {
                    message(_this, result.errmsg, 'success');
                    resolve(result.data);
                }
            }, _this);
        })
    }
}
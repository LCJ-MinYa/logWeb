import {
	message
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import Api from '../api/apiPath'

export default {
	doCheckOutMsg(_this) {
		if (!_this.username) {
			message(_this, '账号信息不能为空!', 'warning');
			return false;
		}
		if (!_this.password) {
			message(_this, '密码信息不能为空!', 'warning');
			return false;
		}
		return true;
	},
	doLogin(_this) {
		httpRequest({
			method: 'GET',
			url: Api.LOGIN,
			data: {
				username: _this.username,
				password: _this.password
			},
			success: (data) => {
				console.log(data);
			},
			error: (error) => {
				console.log(error);
			}
		})
	}
}
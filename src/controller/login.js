import {
	message
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import Api from '../api/apiPath'

export default {
	doCheckOutMsg(_this) {
		if (!_this.email) {
			message(_this, '邮箱地址不能为空!', 'warning');
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
			method: 'POST',
			url: Api.LOGIN,
			data: {
				email: _this.email,
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
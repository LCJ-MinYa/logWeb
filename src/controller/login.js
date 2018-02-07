import {
	message
} from '../assets/utils/utils'
import {
	matchEmail
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import api from '../api/apiPath'
import auth from '../assets/js/auth'

export default {
	doCheckOutMsg(_this) {
		if (!_this.email) {
			message(_this, '邮箱地址不能为空!', 'warning');
			return false;
		}
		if (!matchEmail(_this.email)) {
			message(_this, '请输入正确的邮箱地址!', 'warning');
			return false;
		}
		if (!_this.password) {
			message(_this, '密码信息不能为空!', 'warning');
			return false;
		}
		if (_this.password.length < 6) {
			message(_this, '密码不能小于6位数!', 'warning');
			return false;
		}
		return true;
	},
	doLogin(_this) {
		httpRequest({
			method: 'POST',
			url: api.LOGIN,
			data: {
				email: _this.email,
				password: _this.password
			},
			success: (result) => {
				if (result.errno == 0) {
					auth.setAuthUid(result.data.uid);
					_this.$router.push({
						path: '/index'
					});
				} else {
					message(_this, result.errmsg, 'error');
				}
			},
			error: (error) => {
				message(_this, error, 'error');
			}
		}, _this)
	}
}
import {
	message
} from '../assets/utils/utils'
import {
	matchEmail
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import api from '../api/apiPath'

export default {
	doCheckOutPasswordMsg(_this) {
		if (!_this.name) {
			message(_this, '密码名称不能为空!', 'warning');
			return false;
		}
		if (_this.name.length > 10) {
			message(_this, '密码名称不能超过10个字符!', 'warning');
			return false;
		}
		if (!_this.url) {
			message(_this, '产品网址不能为空!', 'warning');
			return false;
		}
		if (!_this.userName) {
			message(_this, '登陆账号不能为空!', 'warning');
			return false;
		}
		if (!_this.password) {
			message(_this, '登陆密码不能为空!', 'warning');
			return false;
		}
		if (_this.type == '' || _this.type == undefined || _this.type == null) {
			message(_this, '请选择密码分类!', 'warning');
			return false;
		}
		return true;
	},
	doCreatPassword(_this) {
		httpRequest({
			method: 'POST',
			url: api.CREAT_PASSWORD,
			data: {
				email: _this.email,
				password: _this.password
			},
			success: (result) => {
				auth.setAuthUid(result.data.uid);
				_this.$router.push({
					path: '/index'
				});
			}
		}, _this)
	}
}
import {
	message,
	matchEmail
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import auth from '../assets/js/auth'
import api from '../api/apiPath'

export default {
	doCheckOutPasswordMsg(_this) {
		if (!_this.passwordForm.title) {
			message(_this, '密码名称不能为空!', 'warning');
			return false;
		}
		if (_this.passwordForm.title.length > 10) {
			message(_this, '密码名称不能超过10个字符!', 'warning');
			return false;
		}
		if (!_this.passwordForm.url) {
			message(_this, '产品网址不能为空!', 'warning');
			return false;
		}
		if (!_this.passwordForm.userName) {
			message(_this, '登陆账号不能为空!', 'warning');
			return false;
		}
		if (!_this.passwordForm.password) {
			message(_this, '登陆密码不能为空!', 'warning');
			return false;
		}
		if (_this.passwordForm.type == '') {
			message(_this, '请选择密码分类!', 'warning');
			return false;
		}
		if (_this.passwordForm.notes.length > 100) {
			message(_this, '备注信息不能超过100个字符!', 'warning');
			return false;
		}
		return true;
	},
	doCreatPassword(_this) {
		httpRequest({
			method: 'POST',
			url: api.CREAT_PASSWORD,
			data: {
				title: _this.passwordForm.title,
				url: _this.passwordForm.urlProtocol + _this.passwordForm.url + _this.passwordForm.urlDomain,
				userName: _this.passwordForm.userName,
				password: _this.passwordForm.password,
				type: _this.passwordForm.type,
				importance: _this.passwordForm.importance,
				notes: _this.passwordForm.notes,
				uid: auth.getAuthUid()
			},
			success: (result) => {
				console.log(result);
			}
		}, _this)
	}
}
import {
	message,
	matchEmail
} from '../assets/utils/utils'
import httpRequest from '../assets/utils/httpRequest'
import auth from '../assets/js/auth'
import api from '../api/apiPath'

export default {
	doCheckOutPasswordMsg(_this) {
		if (!_this.title) {
			message(_this, '密码名称不能为空!', 'warning');
			return false;
		}
		if (_this.title.length > 10) {
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
		if (_this.type == '') {
			message(_this, '请选择密码分类!', 'warning');
			return false;
		}
		if (_this.notes.length > 100) {
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
				title: _this.title,
				url: _this.urlProtocol + _this.url + _this.urlDomain,
				userName: _this.userName,
				password: _this.password,
				type: _this.type,
				importance: _this.importance,
				notes: _this.notes,
				uid: auth.getAuthUid()
			},
			success: (result) => {
				console.log(result);
			}
		}, _this)
	}
}
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
		if (_this.passwordForm.title.length > 15) {
			message(_this, '密码名称不能超过15个字符!', 'warning');
			return false;
		}
		if (!_this.passwordForm.url) {
			message(_this, '产品网址不能为空!', 'warning');
			return false;
		}
		if ((_this.passwordForm.url).indexOf("://") > -1) {
			message(_this, '产品网址已有http或https前缀!', 'warning');
			return false;
		}
		if (_this.passwordForm.urlDomain !== "") {
			for (let i = 0; i < _this.urlDomainOptions.length; i++) {
				if (_this.urlDomainOptions[i].value === "") {
					continue;
				}
				if (_this.passwordForm.url.indexOf(_this.urlDomainOptions[i].value) > -1) {
					message(_this, '产品网址已有顶级域名' + _this.urlDomainOptions[i].value + '后缀!', 'warning');
					return false;
				}
			}
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
	packPasswordData(_this) {
		let passwordData = {
			title: _this.passwordForm.title,
			url: _this.passwordForm.urlProtocol + _this.passwordForm.url + _this.passwordForm.urlDomain,
			userName: _this.passwordForm.userName,
			password: _this.passwordForm.password,
			type: _this.passwordForm.type,
			importance: _this.passwordForm.importance,
			notes: _this.passwordForm.notes
		}
		return passwordData;
	},
	doCreatPassword(_this) {
		return new Promise((resolve, reject) => {
			let passwordData = this.packPasswordData(_this);
			httpRequest({
				method: 'POST',
				url: api.CREAT_PASSWORD,
				data: passwordData,
				success: (result) => {
					passwordData._id = result.data._id;
					message(_this, result.errmsg, 'success');
					resolve(passwordData);
				}
			}, _this, '提交中...');
		})
	},
	doChangePassword(_this) {
		return new Promise((resolve, reject) => {
			let passwordData = this.packPasswordData(_this);
			passwordData._id = _this.passwordForm._id;
			httpRequest({
				method: 'POST',
				url: api.UPDATE_PASSWORD,
				data: passwordData,
				success: (result) => {
					message(_this, result.errmsg, 'success');
					resolve(passwordData);
				}
			}, _this, '修改中...');
		})
	},
	getPasswordListData(_this) {
		return new Promise((resolve, reject) => {
			httpRequest({
				method: 'POST',
				url: api.PASSWORD_LIST,
				data: {
					type: _this.activeType
				},
				success: (result) => {
					result.type = _this.activeType;
					resolve(result);
				}
			}, _this);
		})
	},
	deletePassword(_this, id) {
		return new Promise((resolve, reject) => {
			httpRequest({
				method: 'POST',
				url: api.DELETE_PASSWORD,
				data: {
					_id: id
				},
				success: (result) => {
					message(_this, result.errmsg, 'success');
					resolve(result);
				}
			}, _this);
		})
	}
}
import config from '../../config/appConfig'
import {
	getCookie
} from './cookie'
import encryp from './sha1'
import {
	message
} from './utils'

/**
 * [ajax 封装ajax]
 * @param  {[object]} options
 * options.url:请求接口地址
 * options.method:请求类型，默认为GET
 * options.data:请求参数
 * options.success:请求成功回调函数
 * options.error:请求失败回调函数
 * _this: vue实例化对象
 * loadingText: 自定义加载文本
 * customError: 自定义请求服务器成功，但是登录失败，参数不正确，不合法等错误情况（不传默认弹窗提示错误）
 * @return {[object]} [JSON Object]
 */
export default function httpRequest(options, _this, loadingText, customError) {
	const loading = _this.$loading({
		lock: true,
		text: loadingText || '加载中',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)'
	});

	var xhr = null;
	options = options || null;
	if (!options) {
		console.error("options is required");
		return false;
	}
	options.method = options.method || "GET";
	options.data = options.data || {};

	options.data.uid = getCookie('uid');
	options.data.timestamp = new Date().getTime();
	options.data.accessToken = encryp.sha1(options.data.uid + options.data.timestamp).substring(3, 10);

	if (options.url.indexOf('http://') === -1 && options.url.indexOf('https://') === -1) {
		options.url = config.API + options.url || null;
	}

	options.success = options.success || function() {};
	options.error = options.error || function() {};
	if (!options.url) {
		console.error("options url is required");
		return false;
	}
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = null;
	}
	var type = options.method.toUpperCase();
	var random = Math.random();
	if (typeof options.data == 'object') {
		var query = '';
		for (var key in options.data) {
			query += key + '=' + options.data[key] + '&';
		}
		options.data = query.replace(/&$/, '');
	}
	if (type == 'GET') {
		if (options.data) {
			xhr.open('GET', options.url + '?' + options.data, true);
		} else {
			xhr.open('GET', options.url + '?t=' + random, true);
		}
		xhr.send();
	} else if (type == 'POST') {
		xhr.open('POST', options.url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(options.data);
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			loading.close();
			if (xhr.status == 200) {
				var resultData = xhr.responseText;
				try {
					resultData = JSON.parse(resultData);
				} catch (e) {
					resultData = resultData;
				}
				if (resultData.errno == 0) {
					options.success(resultData);
				} else {
					if (customError) {
						customError(resultData);
					} else {
						message(_this, resultData.errmsg, 'error');
					}
				}
			} else {
				message(_this, '请求服务器错误，错误代码为: ' + xhr.status, 'error');
				options.error(xhr.status);
			}
		}
	};
}
import config from '../../config/appConfig'
import {
	getCookie
} from './cookie'
import encryp from './sha1'

/**
 * [ajax 封装ajax]
 * @param  {[object]} options
 * options.url:请求接口地址
 * options.method:请求类型，默认为GET
 * options.data:请求参数
 * options.success:请求成功回调函数
 * options.error:请求失败回调函数
 * @return {[object]} [JSON Object]
 */
export default function httpRequest(options) {
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
	console.log(options.data);

	options.url = config.API + options.url || null;
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
			if (xhr.status == 200) {
				var resultData = xhr.responseText;
				try {
					resultData = JSON.parse(resultData);
				} catch (e) {
					resultData = resultData;
				}
				options.success(resultData);
			} else {
				options.error(xhr.status);
			}
		}
	};
}
/**
 * [setCookie 设置cookie]
 * @param {[string]} key   [cookie的name]
 * @param {[string]} value [cookie的值]
 * @param {[object]} options [可选][设置cookie相关的属性，expires：过期小时数，path：路径，domain：域名，secure：是否是安全传输]
 */
export function setCookie(key, value) {
    var options = null;
    if (arguments.length > 2) {
        options = arguments[2];
    } else {
        options = null;
    }
    if (key && value) {
        var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        if (options !== null) {
            if (options.expires) {
                var times = new Date();
                times.setTime(times.getTime() + options.expires * 60 * 60 * 1000);
                cookie += ';expires=' + times.toGMTString();
            }
            if (options.path) {
                cookie += ';path=' + options.path;
            }
            if (options.domain) {
                cookie += ';domain=' + options.domain;
            }
            if (options.secure) {
                cookie += ';secure';
            }
        }
        document.cookie = cookie;
        return cookie;
    } else {
        return "";
    }
};

/**
 * [getCookie 获取cookie]
 * @param  {[string]} name [cookie的name]
 * @return {[sting]}      [cookie的value]
 */
export function getCookie(name) {
    var cookies = parseCookie();
    var current = decodeURIComponent(cookies[name]) || null;
    return current;
};

/**
 * [removeCookie 删除cookie的值]
 * @param  {[string]} name [cookie的关键字]
 * @return {[void]}      [无]
 */
export function removeCookie(name) {
    var cookies = parseCookie();
    if (cookies[name]) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
};

/**
 * [clearCookie 清除全部cookie]
 * @return {[void]} [无]
 */
export function clearCookie() {
    var cookies = parseCookie();
    for (var key in cookies) {
        document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

/**
 * [getAllCookies 获取当前全部cookie]
 * @return {[void]} [无]
 */
export function getAllCookies() {
    var cookies = parseCookie();
    var tmpCookies = {};
    for (var key in cookies) {
        tmpCookies[key] = decodeURIComponent(cookies[key]);
    }
    return tmpCookies;
};

/**
 * [parseCookie 解析cookie，将cookie的字符串解析为Object]
 * @return {[object]} [object的cookie]
 */
function parseCookie() {
    var cookies = {};
    if (document.cookie) {
        var tmpCookies = document.cookie.split(";");
        for (var key in tmpCookies) {
            if (key === '$remove') {
                continue;
            }
            var index = tmpCookies[key].indexOf("=");
            var name = tmpCookies[key].substr(0, index).replace(/\s+/g, "");
            var value = tmpCookies[key].substr(index + 1, tmpCookies[key].length).replace(/\s+/g, "");
            cookies[name] = value;
        }
    }
    return cookies;
};
//定向获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

//邮箱地址正则表达式判断
function matchEmail(string) {
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(string);
}

function message(_this, msg, type) {
    _this.$message({
        showClose: true,
        duration: 1500,
        message: msg,
        type: type
    });
}

/**
 * [parseUrl 解析url各项参数]
 * @param  {[string]} url [url链接]
 * @return {[object]}     [urlProtocol url urlDomain]
 */
function parseUrl(url) {
    let urlObj = {};
    urlObj.urlProtocol = url.split('://')[0] + '://';
    if (url.split('.')[1]) {
        urlObj.urlDomain = '.' + url.split('.')[1];
    } else {
        urlObj.urlDomain = '';
    }
    let splitUrlProtocol = url.split(urlObj.urlProtocol)[1];
    if (urlObj.urlDomain) {
        urlObj.url = splitUrlProtocol.split(urlObj.urlDomain)[0];
    } else {
        urlObj.url = splitUrlProtocol;
    }
    return urlObj;
}

export {
    getQueryString,
    matchEmail,
    message,
    parseUrl
}
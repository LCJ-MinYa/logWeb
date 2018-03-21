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
function parseUrl(url, urlDomainOptions) {
    let urlObj = {};
    //获取http部分
    urlObj.urlProtocol = url.split('://')[0] + '://';
    //获取.com部分
    for (let i = 0; i < urlDomainOptions.length; i++) {
        if (urlDomainOptions[i].value !== "") {
            if (url.indexOf(urlDomainOptions[i].value) <= -1) {
                continue;
            }
            if (url.split(urlDomainOptions[i].value)[1]) {
                urlObj.urlDomain = '';
            } else {
                urlObj.urlDomain = urlDomainOptions[i].value;
            }
        }
    }
    //获取url中间部分
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
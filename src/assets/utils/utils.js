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

export {
    getQueryString,
    matchEmail,
    message
}
var url = window.location.hostname;
var productionUrl = 'http://' + url + ':8084/life';

export default {
    API: process.env.NODE_ENV == 'production' ? productionUrl : 'http://127.0.0.1:8084/life',
}
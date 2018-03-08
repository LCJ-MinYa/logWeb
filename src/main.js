import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/global.css'
import './theme/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})
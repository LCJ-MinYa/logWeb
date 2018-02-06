import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = resolve => require(['../components/index/index'], resolve)
const Login = resolve => require(['../components/login/login'], resolve)

let AppRouter = new Router({
	mode: 'history',
	routes: [{
		path: '/index',
		component: Index
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/*',
		redirect: '/index',
		component: Index
	}]
})

/**
 * [AppRouter 处理路由]
 * @param  {[object]} (to, from, next)
 * @JD [权限验证]
 */
AppRouter.beforeEach((to, from, next) => {
	next()
})

export default AppRouter;
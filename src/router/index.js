import Vue from 'vue'
import Router from 'vue-router'
import auth from '../assets/js/auth'
Vue.use(Router)

const Index = resolve => require(['../components/index/index'], resolve)
const Login = resolve => require(['../components/login/login'], resolve)
const Password = resolve => require(['../components/password/password'], resolve)
const Nav = resolve => require(['../components/nav/nav'], resolve)

let AppRouter = new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: Index
	}, {
		path: '/index',
		redirect: '/',
		component: Index
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/password',
		component: Password,
		meta: {
			auth: true
		}
	}, {
		path: '/nav',
		component: Nav,
	}, {
		path: '/*',
		redirect: '/',
		component: Index
	}]
})

/**
 * [AppRouter 处理路由]
 * @param  {[object]} (to, from, next)
 * @JD [权限验证]
 */
AppRouter.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		if (!auth.checkIsAuth()) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath,
				}
			})
		} else {
			next()
		}
	} else {
		if (auth.checkIsAuth() && to.path == '/login') {
			next({
				replace: true,
				path: '/',
				query: {
					redirect: to.fullPath,
				}
			})
		} else {
			next()
		}
	}
})

export default AppRouter;
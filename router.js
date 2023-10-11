// router.js
import {RouterMount, createRouter} from 'uni-simple-router';
import store from './store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.meta.needLogin && !store.state.userInfo) {	/*拦截条件 1.这个页面需要登录 2.没有用户信息*/
		console.log('重新跳转界面')
		next({
			name:'login',
			NAVTYPE:'push'	//跳转到哦普通的界面，重新开启的界面保留历史记录栈
		})
	} else {
		next()
	}
});

export {
	router, 
	RouterMount
}
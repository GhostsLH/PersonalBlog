// 引入
import App from './App'
import module from 'ajax/api/index.js'
import userRuleMixin from './common/rulesMixin.js'
import commonMixin from './common/commonMixin.js'
import store from 'store/index.js'

/* 引入路由相关组件 */
import {router,RouterMount} from './router.js'		//路径换成自己的
Vue.use(router)


Vue.use(userRuleMixin)
Vue.use(commonMixin)
Vue.prototype.$http = module

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App,
    store,
    
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount();	//为了兼容小程序及app端必须这样写才有效果
// #endif

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
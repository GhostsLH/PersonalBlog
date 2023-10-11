//	内置组件导入
import Vue from 'vue'
import VueX from 'vuex'
//	自制组件导入
import state from './state.js'	
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(VueX)	//	让Vue使用VueX

export default new VueX.Store({	//	导出默认对象
	state,
	mutations,
	actions
})
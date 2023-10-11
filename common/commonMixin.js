import {
	mapState,
	mapMutations
} from 'vuex'

export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {

				}
			},
			methods: {
				checkedisLogin() {
					//	获取用户信息
					return new Promise(resolve => {		//	判断是否登录从而再次判断是否存在用户信息
						if (this.userInfo) {			//	针对userInfo进行判断，如果userInfo存在，那就失败执行
							resolve()					
						} else {						//	反之，那就回退至登录页面
							uni.navigateTo({ //回退界面
								url: '/pages/userInfo/login/login'
							})
						}
					})
				},
				...mapMutations(['updateUserInfo'])	//解构updateUserInfo
			},
			computed:{	// 监控mapState中自定义的userInfo属性
				...mapState(['userInfo'])	//	获取userInfo参数		每个组件都能获得userInfo的参数
			}
		})
	}
}
// 主要用来封装自定义方法用来全局调用使用
// 同步操作、没有就存放，反之就不管
export default {
	//	存放、修改用户信息
	updateUserInfo(state, userInfo) {
		uni.setStorageSync('userInfo', userInfo) //	本地存储的用户信息
		state.userInfo = userInfo //	修改store数据
	},
	// 修改历史记录存储
	setHistory(state, val) {
		console.log(val)
		let list = state.historyList;
		// 当list里面有值时，同时list里面的值
		// findIndex函数会返回符合内部函数条件的第一个，当返回-1时说明没有符合条件的
		if((list.length > 0) && list.findIndex(item => item === val) > -1) return
		// 如果没有符合条件的值那就插入当前val到list里面
		list.unshift(val);			//	unishift将新的一项数据添加到数组头部位置
		uni.setStorageSync('historyList',list)
		// 数组需要重新赋值
		state.historyList = list
	},
	// 清空历史搜索记录
	clearHistory(state){
		uni.removeStorageSync('historyList')	//	清除historyList
		state.historyList = []
	},
	// 设置导航栏选项卡
	setLabelList (state, labelList) {
		// 本地存储
		uni.setStorageSync('labelList', labelList)
		// vuex找到这个值然后把labelList传递进去
		state.labelList = labelList
	}
}
// 主要用来储存数据用来全局反馈使用，以及存储置store之中
//	同步读取user Info，反之传递null
export default {
	userInfo: uni.getStorageSync('userInfo') || null, //	从本地缓存中获取userInfo的信息
	historyList: uni.getStorageSync('historyList') || [],
	labelList: uni.getStorageSync('labelList') || []
}
export default ({name, data = {}})=> {
	// 返回 一个promise对象
	return new Promise((resolve, reject) => {
		console.log(data)
		// 打开我们的一个loading弹窗
		
		const loading = data.isLoading		//	前台传递过来的noLoading为了防止末为加载被渲染
		data.loading && delete data.isLoading		// 防止将此数据传递到后端(脏值)
		!loading && uni.showLoading({
			title:'加载中'
		})
		uni.showLoading({})
		// uniCloud的函数调用，真正的发起数据的请求
		uniCloud.callFunction({
			name,	//云函数的名字
			data,
			success({result}) {		// 成功的状态
				if(result.code === 0) {		// 能够拿到数据值
					resolve(result.data)
				} else {
					uni.showToast({		// 提示框， 一般的是后端没有查询到数据值
						icon:"none",
						title:result.msg
					})
				}
			},
			fail(err) {		// 请求失败， 一般是网络的原因，后端的错误
				reject(err)
			},
			complete() {	//	完成的状态
				!loading && uni.hideLoading()		// 关闭弹窗 (loading)
			}
		})
	})
}
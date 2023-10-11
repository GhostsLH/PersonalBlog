'use strict';
// 获取数据库的应用
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		searchVal
	} = event; //这个写法就是event这个对象里面的classify

	// 数据库操作,对数据进行获取
	const list = await db.collection('article')

		//聚合 数据进行过滤操作，过滤当前不需要展示的内容
		.aggregate() //开启聚合
		.match({
			title: new RegExp(searchVal)
			// 根据匹配条件进行数据返回模糊查询
		}) //匹配指定的分类
		.project({ //然后过滤操作
			content: 0 //不需要的参数给0即可
		})
		.end() //聚合结束

	//返回数据给客户端
	return {
		code: 0,
		msg: '数据获取成功',
		data: {
			articleList: list.data,
		}
	}
};
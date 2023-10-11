'use strict';
// 获取数据库的应用
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {classify, page = 1, pageSize = 10} = event;		//这个写法就是event这个对象里面的classify
	let matchObj = {}
	if(classify !== '全部') {	//判断前端请求的classify是否为全部数据，如果不是那就进行相应的分类传递，反之就是全部数据返回
		matchObj = {classify}	//匹配当前指定分类		//将当前classify当前状态返回给matchObj
	}
	// 数据库操作,对数据进行获取
	const list = await db.collection('article')
	
	//聚合 数据进行过滤操作，过滤当前不需要展示的内容
	.aggregate()	//开启聚合
	.match(matchObj)	//匹配指定的分类
	.project({		//然后过滤操作
		content:0	//不需要的参数给0即可
	})
	.skip(pageSize * (page - 1))	//用于分页过滤，传递条数 * 传递页数 = 返回数据数量
									//第一页数据从0开始
	.limit(pageSize)				//每页展示多少条数据
	.end()			//聚合结束
	
	// 返回当前匹配的选项里的数据总数
	const {total} = await db.collection('article').where(matchObj).count()	//count是计数
		
	//返回数据给客户端
	return {
		code:0,
		msg:'数据获取成功',
		data:{
			articleList: list.data,
			total
		}
	}
};

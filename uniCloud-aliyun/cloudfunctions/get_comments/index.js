'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		articleId,
		pageSize = 10,
		page = 1,
	} = event;
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: articleId
	})
	.unwind('$comments')	//根据所提供关键字来进行拆分，关键字为null或者空默认不展示（根据includeArrayIndex，preserveNullAndEmptyArrays的状态来决定是否展示空以及null），其余的根据关键字进行细致拆分，可参照文档
	.project({
		_id: 0,
		comments: 1
	})
	.replaceRoot({
		newRoot:'$comments'
	})
	.skip(pageSize * (page-1))
	.limit(pageSize)
	.end()
	
	return {
		code: 0,
		msg: '评论内容获取成功',
		data: list.data
	}
};
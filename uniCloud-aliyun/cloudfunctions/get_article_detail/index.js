'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		article_id
	} = event;

	const articleList = await db.collection('article')
		.aggregate()
		.match({
			//	根据前端反馈的文章id进行筛选查询
			_id: article_id
		})
		.project({
			comments: 0
		})
		.end()

	return {
		code: 0,
		msg: '文章获取成功',
		data: articleList.data[0]
	}
};
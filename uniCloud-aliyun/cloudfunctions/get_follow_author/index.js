'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate;		//聚合操作符
exports.main = async (event, context) => {
	const {userId} = event;
	
	let userInfo = await db.collection('user').doc(userId).get()
	let author_likes_ids = userInfo.data[0].author_likes_ids;			//获取收藏的文章的数组
	
	let list = await db.collection('user')
	.aggregate()
	.addFields({
		is_like:$.in(['$id',author_likes_ids])
	})
	.project({
		loginName: false,
		password: false
	})
	.match({
		is_like:true
	})
	.end()

	return {
		code: 0,
		msg:'获取数据成功',
		data: list.data
	}
};

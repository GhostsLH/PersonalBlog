'use strict';
const db = uniCloud.database()
// 指定一个操作符变量
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		userId,
		authorId
	} = event;
	const user = await db.collection('user').doc(userId).get();
	const authorLikeIds = user.data[0].author_likes_ids;
	let returnMsg = ''
	let author_ids = null

	if (authorLikeIds.includes(authorId)) {
		author_ids = dbCmd.pull(authorId)
		returnMsg = '取消关注成功'
	} else {
		returnMsg = '关注成功'
		author_ids = dbCmd.addToSet(authorId)
	}

	await db.collection('user').doc(userId).update({
		author_likes_ids: author_ids
	})
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: returnMsg
		}
	}
};
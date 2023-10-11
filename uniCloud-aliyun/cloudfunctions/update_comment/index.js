'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		userId,
		articleId,
		content,
		comment_id = '',
		reply_id = '',
		is_reply = false
	} = event;

	// 获取用户信息
	let user = await db.collection('user').doc(userId).get();
	user = user.data[0]

	// 获取文章的数据表
	const article = await db.collection('article').doc(articleId).get();
	const comments = article.data[0].comments;

	// 生成一条评论
	let commentObj = {
		comment_id: generatedId(5), //	评论内容的唯一id
		comment_content: content,
		create_time: Date.now(),
		is_reply ,
		replyArr: [],
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professinonal: user.professinonal
		}
	}

	// 把评论插入到对象中
	if(comment_id === '') {
		commentObj = dbCmd.unshift(commentObj)
	} else {
		//获取当前的评论集合，在这个集合里面找到指定的那一条评论，修改它的replayArr属性
		let commentAuthor = null
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		
		if(is_reply) {
			commentAuthor = comments[commentIndex].replyArr.find(item => item.comment_id === reply_id).author.author_name
		} else {
			commentAuthor = comments.find(item => item.comment_id === comment_id).author.author_name
			
		}
		
		commentObj.to = commentAuthor
		commentObj = {
			[commentIndex] : {
				replyArr: dbCmd.unshift(commentObj)
			}
		}
		
	}

	// 将评论添加到数据表的评论数组当中，如果没有当前评论那就加进去，反之如果有那就追加
	await db.collection('article').doc(articleId).update({
		comments: commentObj
	})

	// 生成id的方法
	function generatedId(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36);
	}
	return {
		code: 0,
		data: {
			msg: "添加数据成功"
		}
	}
};
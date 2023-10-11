'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		userId,
		filePath
	} = event;

	const user = await db.collection('user').doc(userId).get();
	const oldUrl = user.data[0].avatar;
	// 判断一下之气那的用户头像是否包含在对象存储里面，如果说有的话，我们给他一个删除的操作
	try {
		// 删除原先的头像
		await uniCloud.deleteFile({
			fileList: [oldUrl]
		})
	} catch (e) {
		// 删除错误打印Error
		console.log(e)
	}

	// 更新用户头像的操作
	await db.collection('user').doc(userId).update({
		avatar: filePath
	})

	// 更新文章里面的作者头像的操作
	const id = user.data[0].id;
	await db.collection('article').where({
		'author.id': id
	}).update({
		'author.avatar': filePath
	})
	return {
		code: 0,
		data: {
			msg: '修改头像成功'
		}
	}
};
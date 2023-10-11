'use strict';
// 获取数据库
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		loginName,
		password,
		phone,
		type
	} = event
	const {
		affectedDocs, //后端返回的状态变量，如果当前变量affectedDocs非0且成立，说明反馈正常，拿到了数据
		data
	} = await db.collection('user')
		// 开启聚合
		.aggregate()
		.match(type === 'account' ? {
			loginName,
			password
		} : {
			phone
		}) //判断当前状态哪种登录状态从而进行相应的聚合操作	//如果是账户登录那就根据用户名密码那么就指定账户分类，反之就是手机分类.
		.end()
	//返回数据给客户端
	return affectedDocs ? { //	判断affectedDocs成立 = 成立 > 0 = 状态正常
		code: 0,
		msg: "获取用户信息成功",
		data: data[0],
	} : { //	判断affectedDocs不成立
		code: 1,
		msg: type === 'account' ? '获取用户信息失败,请检查用户名或密码' : '验证码或手机号码错误,请重新尝试' //	判断当前登录状态反馈相应的查询信息，让前端自查数据格式重试
	}
};
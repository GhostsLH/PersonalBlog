'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const version = await db.collection('version').get()
	//返回数据给客户端
	return {
		code: 0,
		data: {
			version: version.data[0].current_version,
			downLoadLinkUrl:'https://mp-d1288e3e-9157-4710-a59e-8d8e8b8a9751.cdn.bspapp.com/cloudstorage/__UNI__80DE59D_20230919172548.apk'
		}
	}
};

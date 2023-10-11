'use strict';
exports.main = async (event, context) => {
	const {
		phone
	} = event;

	//	创建一个随机数
	const currentNumber = Math.random().toString().substr(2, 6)

	try {
		const res = await uniCloud.sendSms({
			appid: '__UNI__80DE59D',
			smsKey: '696c1355d2c2f18f73ecf31f2bba5913',
			smsSecret: 'cf37c0152aeb92d6bcfe0c694fe00355',
			phone,
			templateId: '18092', // 请替换为自己申请的模板id
			data: {
				code: currentNumber,
				expMinute: '1',
			}
		})

		return {
			code: 0,
			data: {
				msg: '请在手机上注意查收验证码',
				mobileCode: currentNumber
			}
		}
	} catch (err) {
		console.log(err)
		return {
			code: '1',
			msg: `'验证码获取失败，请重新尝试'+ err`,
		}
	}
};
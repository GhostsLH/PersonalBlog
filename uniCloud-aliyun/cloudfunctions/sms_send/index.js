'use strict';

//接口地址
const api_url = "https://api.smsbao.com/sms"
// 短信平台账号
const user = "******"
// 短信平台密码
const password = "******"

/* 以下生成测试的验证码用来发送，仅为了测试
   正式环境中，此处生成的验证码应该入库，以便登录时进行校验
 */
const randomStr = '00000' + Math.floor(Math.random() * 1000000)
const code = randomStr.substring(randomStr.length - 6)

//短信内容模板，请到短信接口后台进行申请
const content = `【XXX平台】您的验证码是${code}。如非本人操作，请忽略本短信。`

exports.main = async (event, context) => {
	try {
		let crypto = require('crypto')
		let querystring = require('querystring')
		let md5 = crypto.createHash('md5')
		md5.update(password)
		let pass = md5.digest('hex')
		let data = {
			'u': user,
			'p': pass,
			'm': event.mobile,
			'c': content
		}
		const res = await uniCloud.httpclient.request(`${api_url}?${querystring.stringify(data)}`, {
			method: 'GET',
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		})
		if (res.data === 0) {
			return {
				code: 0,
				msg: "验证码发送成功"
			}
		}
	} catch (err) {
		return {
			code: -1,
			msg: "验证码发送失败"
		}
	}
	//返回数据给客户端
	return {
		code: -1,
		msg: "验证码发送失败"
	}
};

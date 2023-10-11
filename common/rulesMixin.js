// 全局都可采用的验证规则
export default { //导出对象
	install(Vue) { //传递形参Vue
		Vue.mixin({ //调用Vue下面的mixin方法
			data() {
				return {
					//手机号正则
					MobileReg: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
					userRules: {
						loginName: {
							rules: [{
								required: true, //必选项
								'errorMessage': "账户名不能为空"
							}, {
								validateFunction: this.validateLoginName //自定义方法调用		//自定义验证规则
							}]
						},
						password: {
							rules: [{
								required: true,
								'errorMessage': "密码不能为空"
							}]
						}
					},
					// 负责手机号的校验规则
					loginRules: {
						phone: {
							rules: [{
								required: true,
								'errorMessage': "手机号码不能为空"
							}, {
								validateFunction: this.validatePhone
							}]
						},
						vCode: {
							rules: [{
								required: true,
								'errorMessage': "验证码不能为空"
							}, {
								validateFunction: this.validateMobileCode
							}]
						}
					}
				}
			},
			methods: {
				//	用户名验证函数
				//	验证规则、当前输入的值、获取到的用户的表单集合、针对错误信息而返回的相关错误/没有错误就返回true(错误的一个回调)
				validateLoginName(rule, val, data, callback) {
					switch (true) { //回调正确进入下列
						case val.length < 6: //	当val长度小于6时候
							callback('用户名长度不正确') //	通过回调返回相应回执
							break
						default: //如果第一种情况不采用那就return强制跳出
							return true
					}
				},
				// 验证手机号码
				validatePhone(rule, val, data, callback) {
					switch (true) { //回调正确进入下列
						case !this.MobileReg.test(val): // 调用手机校验正则如果不符合返回false，同时回调手机格式不正确反馈，反之通过	
							callback('手机号码格式不正确') //	通过回调返回相应回执
							break
						default: //如果第一种情况不采用那就return强制跳出
							return true
					}
				},
				// 验证手机验证码
				validateMobileCode(rule, val, data, callback) {
					switch (true) {
						case val !== this.returnCode:
							callback('请输入正确的验证码')
							break;
						default: //如果第一种情况不采用那就return强制跳出
							return true
					}
				}
			}
		})
	}
}
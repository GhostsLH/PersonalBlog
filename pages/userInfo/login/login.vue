<template>
	<view class="login-container">
		<image src="../../../static/img/login_bg.png" mode="scaleToFill" class="banner-bg"></image>
		<!-- 导航 -->
		<view class="login-nav">
			<!-- 三目判断状态决定给哪个添加高亮状态 -->
			<view class="nav-item" @click="changFormType('account')" :class="{'active':type==='account'}">
				账号登录
			</view>
			<view class="nav-item" @click="changFormType('mobile')" :class="{'active':type !=='account'}">
				手机登录
			</view>
		</view>
		<!-- 表单部分 -->
		<!--formData是登录数据，userRules是表单校验数据-->
		<!-- 账号密码板块form体系 -->
		<uni-forms class="form" ref="form" :modelValue="formData" :rules="userRules" v-if="type ==='account'">
			<view class="">
				<uni-forms-item label="账号" name="loginName">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入账号"
						v-model="formData.loginName" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<!-- easyinput可以处理表单处理遗留数据未清空的问题 -->
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password" /></uni-easyinput>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_userLoginSubmit">立即登录</button>
		</uni-forms>

		<!-- 手机号板块form表单体系 -->
		<!-- 针对第二个form表单的校验规则冲突，针对自己进行展示，这样校验规则就不会相互冲突 -->
		<uni-forms class="form" ref="form" :modelValue="formData" :rules="loginRules" v-else>
			<view class="">
				<uni-forms-item label="手机号" name="phone">
					<input placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号"
						v-model="formData.phone" />
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入密码"
						v-model="formData.vCode" />
					<SendCode class="code-component" @getForm="getForm" @setCurrentCode="returnCode=$event"></SendCode>
					<!-- @setCurrentCode方法执行 -> 执行后反馈数据event/e赋值给returnCode中(当前是通过$符号操作将数据存放置returnCode中) -->
					<!-- $event可以理解为方法执行所反馈的e/event -->
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_userLoginSubmit">立即登录</button>
		</uni-forms>
		<view class="footer-select-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'account', //状态值判断登录方式
				formData: {
					loginName: '',
					password: '',
					phone: '',
					vCode: ''
				},
				returnCode: ''
			}
		},
		methods: {
			// 登录板块
			async _userLoginSubmit() {

				const res = await this.$refs.form.validate()
				//	发送数据到后端
				this._sendUserInfo({
					...res,
					type: this.type //	判断当前是什么状态登录是手机号还是账户密码登录
				})
			},
			// 改变当前登录类型
			changFormType(type) {
				this.$refs.form.clearValidate([]) //改变类型后对应的表单验证规则清空
				this.type = type
			},
			// 发送数据到后端
			async _sendUserInfo(data) {
				const res = await this.$http.user_login(data) //	传递给后端
				if (res) { //	判断当前值存在进行相应的状态弹框展示
					// 使用store的形式进行储存	
					this.updateUserInfo(res)
					uni.showToast({ //	弹框展示状态
						title: '用户登录成功',
						icon: 'none'
					})
					setTimeout(() => {
						
						
						uni.reLaunch({
							url: '/pages/index/index'
						})
						// #ifdef H5
						uni.switchTab({
							url: '/pages/index/index'
						})
						// #endif

						// #ifndef H5
						uni.navigateBack()
						// #endif
					}, 1500)
				}
			},
			// 向验证码组件发送form表单
			getForm(cb) {
				cb && cb(this.$refs.form) //cb存在同时cb通过了form表单验证规则
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>

<style lang="scss" scoped>
	@import 'css/login.scss'
</style>
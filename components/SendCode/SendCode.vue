<template>
	<view class="code-container">
		<view class="vCode-btn" @click="getForm">
			{{runTime ? `${time}秒后重新获取`: '获取验证码'}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "SendCode",
		props: {
			form: Object
		},
		data() {
			return {
				timeId: null,
				time: 60, 		//定时器时长
				runTime: false 		//定时器开始状态就变成true
			};
		},
		methods: {
			getForm() {
				if (this.runTime) return //	如果计时器存在的话直接return出去免得多层计时器嵌套
				this.$emit('getForm', this._sendCode)
			},
			async _sendCode(form) {
				// console.log(form)
				// //获取form表单 => phone单独的进行验证
				const {
					phone
				} = await form.validateField(['phone'])
				// 定时器创建
				this.runTime = true
				this.timeRunning()
				//	发送数据请求云函数
				const {
					msg,
					mobileCode
				} = await this.$http.get_code({
					phone
				})
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.$emit('setCurrentCode', mobileCode)
			},
			// 定时器
			timeRunning() {
				this.timeId = setInterval(() => {
					if (this.time === 1) {
						clearInterval(this.timeId) //	清除定时器
						this.timeId = null
						this.runTime = false
						this.time = 60
						return
					}
					this.time--
				}, 1000)
			},
			beforeDestroy() { //	组件销毁前执行的操作
				clearInterval(this.timeId) //	清除定时器
				this.timeId = null
				this.runTime = false
				this.time = 60
			}
		},
	}
</script>

<style lang="scss">
	.code-container {
		flex-shrink: 0;
		margin-right: 20rpx;

		.vCode-btn {
			background-color: $base-color;
			color: #FFFFFF;
			padding: 20rpx;
			border-radius: 10rpx;
			opacity: .8;
		}
	}
</style>
<template>
	<!-- stop的存在是阻止事件冒泡 -->
	<view class="save-incons" @click.stop="_changeSaveStatus">
		<uni-icons color="#ff6600" :type="isSave ? 'heart-filled' : 'heart'" :size="size"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "SaveLikes",
		props: {
			articleId: String,
			size:{
				type:String,
				default:'20'
			}
		},
		data() {
			return {
			};
		},
		methods: {
			async _changeSaveStatus() { //	1.点击收藏按钮触发，判断当前是否登录
				//	TODOS	首先、判断用户是否登录 --> T 改变当前的收藏状态/ F 没有登录	=>界面的跳转=>用户登录的界面
				await this.checkedisLogin() //	promise对象
				const {
					msg,
					newUserInfo
				} = await this.$http.update_save_like({
					articleId: this.articleId,
					userId: this.userInfo._id
				})
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.updateUserInfo({
					...this.userInfo,
					...newUserInfo
				})
				// 取消收藏触发事件,然后事件绑定重新渲染
				uni.$emit('updateArticle')
			}
		},
		computed:{
			isSave(){	//	通过计算属性判断当前用户信息是否存在同时，当前用户信息的收藏例表中是否存在当前选项，如果存在那isSave就成立反之不成立
				return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId)
			}
		}
	}
</script>

<style>

</style>
<template>
	<view>
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
		</view>
		<uni-load-more  :status="loading" :contentText="{
						contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多评论了'
			}"></uni-load-more>

		<!-- 弹窗展示 -->
		<CommentMasker @closePopupMasker="showPopup = $event" :showPopup="showPopup"
			@sendCommentData="_sendCommentData"></CommentMasker>

	</view>
</template>

<script>
	export default {
		onLoad(props) {
			this.articleId = props.id
			this._getCommentList()
		},
		onReachBottom() {
			if (this.loading === 'noMore') return
			this.page++
			this._getCommentList()
		},
		data() {
			return {
				articleId: '',
				pageSize: 5,
				page: 1,
				commentList: [],
				loading: 'loading',
				showPopup: false,
				replyData: {}
			}
		},
		methods: {
			async _getCommentList() {
				const listArr = await this.$http.get_comments({
					articleId: this.articleId,
					pageSize: this.pageSize,
					page: this.page
				})

				if (listArr.length === 0) {
					this.loading = 'noMore'
					return
				}

				let oldList = JSON.parse(JSON.stringify(this.commentList))
				oldList.push(...listArr)
				this.commentList = oldList

				if(listArr.length  < this.pageSize) {
					this.loading = 'noMore'
					return
				}


			},
			async openMaskerComment() {
				await this.checkedisLogin()
				this.showPopup = true
			},
			commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply: data.isReply
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.openMaskerComment()
			},
			async _sendCommentData(content) {
				const {
					msg
				} = await this.$http.update_comment({
					userId: this.userInfo._id,
					articleId: this.articleId,
					content,
					...this.replyData
				}) //当前content是子组件传递过来的$event的值
				uni.showToast({
					title: msg
				})
				this.showPopup = false
				// 修改评论内容成功之后，进行数据(评论列表的更新）
				this.replyData = {}
				this.page = 1
				this.commentList = []
				this.loading = "loading"
				this._getCommentList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-content-container {
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
	}
</style>
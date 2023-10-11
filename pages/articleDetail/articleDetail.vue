<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleData.create_time}}</text>
					<text>{{articleData.browse_count}}浏览</text>
					<text>{{articleData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button" @click="_followAuthor">
				{{isFollowAuthor ? '取消关注' : '关注'}}
			</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse class="markdown-body" :content="content"></u-parse>
			</view>

			<!-- 评论展示组件 -->
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
				</view>
				<view class="no-data" v-if="commentList.length">
					暂无评论
				</view>
			</view>
		</view>

		<!-- 评论输入组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="openMaskerComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box" @click="goCommentPage">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<SaveLikes class="detail-bottom-icon-box" size="22" :item="articleData"></SaveLikes>
				<view class="detail-bottom-icon-box">
					<uni-icons type="hand-up" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 评论组件 -->
		<CommentMasker @closePopupMasker="showPopup = $event" :showPopup="showPopup"
			@sendCommentData="_sendCommentData"></CommentMasker>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import {
		marked
	} from 'marked'
	export default {
		components: {
			uParse
		},
		onLoad(...options) {
			// 因为路径变换所以options位置发生改变，当前位置为直接可以使用资源不用解析
			this.articleData = this.$Router.currentRoute.query || this.$Router.currentRoute; //	初始化时候预渲染
			// 文章详情的获取
			this._getArticleDetail()

			// 初始化获取评论列表
			this._getCommentList()
		},
		data() {
			return {
				articleData: null,
				showPopup: false, //是否打开遮罩层
				commentList: [],
				replyData: {}
			}
		},
		methods: {
			async _getArticleDetail() {
				// 根据item传递过来当前文章id向后台发送请求查询当前id对应的文章详情
				const data = await this.$http.get_article_detail({
					article_id: this.articleData._id
				})
				this.articleData = data
			},
			// 打开弹窗
			async openMaskerComment() {
				await this.checkedisLogin()
				this.showPopup = true
			},
			// 发送评论内容到后端
			async _sendCommentData(content) {
				const {
					msg
				} = await this.$http.update_comment({
					userId: this.userInfo._id,
					articleId: this.articleData._id,
					content,
					...this.replyData
				}) //当前content是子组件传递过来的$event的值
				uni.showToast({
					title: msg
				})
				this.showPopup = false
				// 修改评论内容成功之后，进行数据(评论列表的更新）
				this.replyData = {}
				this._getCommentList()
			},
			// 获取文章评论列表
			async _getCommentList() {
				const listArr = await this.$http.get_comments({
					articleId: this.articleData._id
				})
				this.commentList = listArr
			},
			// 处理回复事件函数
			async commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply: data.isReply
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.openMaskerComment()
			},
			// 改变用户关注作者的状态
			async _followAuthor() {
				// 判断用户登录状态
				await this.checkedisLogin()
				const {
					msg
				} = await this.$http.update_follow_author({
					// 当前id的用户对当前id的文章作者进行关注状态的修改
					authorId: this.articleData.author.id,
					userId: this.userInfo._id
				})
				// 显示弹窗
				uni.showToast({
					title: msg
				})

				// 处理用户存储信息
				let followIds = [...this.userInfo.author_likes_ids]
				if (followIds.includes(this.articleData.author.id)) {
					followIds = followIds.filter(item => item != this.articleData.author.id)
				} else {
					followIds.push(this.articleData.author.id)
				}
				this.updateUserInfo({
					...this.userInfo,
					author_likes_ids: followIds
				})
				uni.$emit('updateFollowAuthor')

				// 改变store里面的用户存储的状态 => 本地存储同样修改
			},
			// 跳转到评论列表页面
			goCommentPage() {
				uni.navigateTo({
					url: `/pages/commentList/commentList?id=${this.articleData._id}`
				})
			}
		},
		computed: {
			content() { //针对微信小程序所做的兼容处理
				try {
					return marked(this.articleData.content)
				} catch (e) {
					return null
				}
			},
			// 是否关注作者
			isFollowAuthor() {
				return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'css/articleDetail.scss'
</style>
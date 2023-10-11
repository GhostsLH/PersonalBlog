<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!commentData.is_reply">
					{{commentData.author.author_name}}
				</view>
				<view class="title" v-else>
					{{commentData.author.author_name}}
					<text class="reply-text">回复</text>
					{{commentData.to}}
				</view>
				<view class="">
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-content">
			<view class="">
				{{commentData.comment_content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment:commentData, isReply})">
					回复
				</view>
			</view>
		</view>
		<!-- 子回复展示区域 -->
		<view class="comment-reply-list" v-for="item in commentData.replyArr" :key="item.comment_id">
			<!-- 针对自身的某一条评论进行的指定回复 -->
			<CommentBox :isReply="true" :commentData="item" @commentReply="commentReply"></CommentBox>
		</view>
	</view>
</template>

<script>
	import CommentBox from '@/components/CommentBox/CommentBox.vue'
	export default {
		name: "CommentBox",
		comments: {
			CommentBox
		},
		props: {
			commentData: Object,
			isReply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 回复事件的处理函数
			commentReply(data) {
				if (data.isReply) {
					data.comment.reply_id = data.comment.comment_id
					data.comment.comment_id = this.commentData.comment_id
				}
				console.log(data)
				// 向articleDetail发送的时候只有一次
				this.$emit('commentReply', data)
			}
		},
	}
</script>

<style lang="scss">
	@import 'css/commentBox.scss'
</style>
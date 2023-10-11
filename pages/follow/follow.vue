<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex = 0">
					文章
				</view>
				<view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex = 1">
					作者
				</view>
			</view>
		</view>

		<!-- 内容区域 -->
		<view class="follow-list-container">
			<swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex = $event.detail.current">
				<swiper-item :class="{'no-data':articleDataNone}">
					{{articleDataNone && '暂无收藏的文章'}}
					<!-- 文章列表组件 -->
					<ListItem :articleList="articleList" :isShowLoading="isShowLoading" v-if="articleList.length"></ListItem>
				</swiper-item>
				<swiper-item>
					<AuthorList :authorList="authorList" v-if="authorList.length"></AuthorList>
					<view class="no-data" v-if="authorDataNone">
						暂无关注作者
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 针对小程序做的路由拦截跳转
			// #ifdef MP-WEIXIN
			this.checkedisLogin()
			console.log('userInfo',this.$store.state.userInfo)
			if (this.$store.state.userInfo === null) { //没有用户信息的话
				uni.redirectTo({ //关闭当前页面跳转到指定页面
					url: '/pages/userInfo/login/login'
				})
			}
			// #endif
			uni.$on('updateArticle', () => { //取消收藏触发当前事件然后执行重新渲染
				console.log('event')
				this._getFollowArticle('noLoading')
			})
			uni.$on('updateFollowAuthor', () => {
				this._getAuthorList('noLoading')
			})
			this._getFollowArticle()
			this._getAuthorList()
		},
		onShow() {
			this.checkedisLogin()
		},
		data() {
			return {
				title: '关注',
				currentIndex: 0,
				articleList: [],
				isShowLoading:false,
				articleDataNone: '',
				authorDataNone: '',
				authorList: []
			}
		},
		methods: {
			// 获取收藏文章
			async _getFollowArticle(isLoading) {
				const list = await this.$http.get_follow_article({
					userId: this.userInfo._id,
					isLoading
				})
				if (!list.length) {
					this.articleDataNone = true
				} else {
					this.articleDataNone = ''
				}
				this.articleList = list
			},
			// 请求关注的作者列表
			async _getAuthorList(isLoading) {
				const list = await this.$http.get_follow_author({
					userId: this.userInfo._id,
					isLoading
				})
				this.authorList = list;
				!list.length && (this.authorDataNone = true)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/follow.scss'
</style>
<template>
	<view class="nav-bar">
		<!-- 导航栏 -->
		<view class="nav-bar-top">
			<view :style="{height: startHeight + 'rpx'}"></view>
			<!-- 当组件应用于使用的时候，展示回退按钮 -->
			<view class="return-icon" :style="{top: startHeight + 'rpx'}" v-if="isSearch" @click="returnArticleList">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>

			<view class="nav-bar-content"
				:style="{marginRight: startRight + 'rpx', marginLeft: isSearch ? '20rpx' : ''}" @click="goSearchPage">
				<uni-icons type="search" color="#999"></uni-icons>
				<view v-if="!isSearch" class="nav-bar-search-txt">
					输入文章标题进行搜索
				</view>
				<input v-else type="text" class="search-input" placeholder="请输入文章标题进行搜索" confirm-type="search"
					@confirm="changeInput" v-model.trim="searchVal" />
			</view>
		</view>

		<!-- 底部的垫片 -->
		<view :style="{height: startHeight + 80 + 'rpx'}">

		</view>
	</view>
</template>

<script>
	export default {
		name: "Navbar",
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			parentVal: {
				type: String
			}
		},
		created() {
			this.getSystemInfo()
		},
		data() {
			return {
				startRight: 0,
				startHeight: 20
			}
		},
		methods: {
			async getSystemInfo() {
				/* 导航栏顶部padding取默认值*/
				const systemInfo = await uni.getSystemInfoSync()
				systemInfo.statusBarHeight && (this.startHeight = systemInfo.statusBarHeight * 2)

				// #ifdef MP-WEIXIN
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				/* 导航栏在小程序中顶部padding取胶囊top值*/
				this.startHeight = menuButtonInfo.top * 2

				menuButtonInfo.width && (this.startRight = menuButtonInfo.width * 2)
				// #endif
			},
			// 跳转到搜索页面
			goSearchPage() {
				if (this.isSearch) return //如果isSearch有值那就return出去，反之那就跳转、、以此判断是否在搜索页面
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// 返回文章列表页面
			returnArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '../../pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			// 通知父组件进行搜索内容的查询
			// 调运用云函数查询
			changeInput() {
				this.$emit('sendSearchData')
			}
		},
		computed: {
			// 监听输入的val
			searchVal: {
				get() {
					// 查看值的时候	parentVal刚开始是空值所以直接从父组件传递过来展示到input中，
					// searchVal数据进行变更时调用set，如果减少或者为空父组件云函数方法进行空搜索，反之增多给父组件传递方法同时把增加的val传递过去并赋值给parentVal
					return this.parentVal
				},
				set(val) {
					// 设置值的时候,把输入的val传递到父组件
					this.$emit('updateVal', val)
					// val为空调用云函数进
					if(!val) {		
						// 空搜索、调用回车搜索
						this.$emit('sendSearchData')
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './css/Navbar.scss'
</style>
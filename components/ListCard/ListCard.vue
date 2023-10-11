<template>
	<view>
		<!-- 基础模式 -->
		<view class="list-card" v-if="item.mode === 'base'" @click="goArticleDetail">
			<view class="list-card-img">
				<image :src="item.cover[0]?item.cover[0]:'/static/systemImg/6.png'" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<SaveLikes :articleId="item._id"></SaveLikes>
				</view>
				<view class="list-card-content-desc">
					<view class="article-type">
						{{item.classify}}
					</view>
					<view class="browse-number">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>

		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode === 'column'" @click="goArticleDetail">
			<view class="list-card-top">
				<text>{{item.title}}</text>
				<SaveLikes :articleId="item._id"></SaveLikes>
			</view>
			<view class="list-card-middle">
				<view class="image-container" v-for="(img, index) in item.cover.slice(0,3)" :key="index">
					<image :src="img" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>

		<!-- 大图模式 -->
		<view class="list-card mode-image" v-if="item.mode === 'image'" @click="goArticleDetail">
			<view class="list-card-top">
				<view class="image-container">
					<image :src="item.cover[0]?item.cover[0]:'/static/systemImg/7.png'" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card-middle">
				<text>{{item.title}}</text>
				<SaveLikes :articleId="item._id"></SaveLikes>
			</view>

			<view class="list-card-content-desc list-card-bottom">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count}}浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ListCard",
		props: {
			item: Object,
		},
		data() {
			return {

			};
		},
		methods: {
			goArticleDetail() {
				// 携带相关信息进行跳转
				// console.log(this.item)
				const {_id, title, author, create_time, thumbs_up_count, browse_count} = this.item		//	1、从item项跳转并携带数据
				const params = {_id, title, author, create_time, thumbs_up_count, browse_count}		//	2、解构出来的数据存放到params中
				
				// 跳转到详情页面
				// uni.navigateTo({
				// 	url:`/pages/articleDetail/articleDetail?params=${JSON.stringify(params)}`		//	3、利用模板字符串，将转换成JSON字符串形式的数据打包跟随跳转传递
				// })
				
				this.$Router.push({
					path:'/pages/articleDetail/articleDetail',
					query:params
				})
				// 发送自定义事件
				this.$emit('saveSearchHistory')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './css/ListCard.scss'
</style>
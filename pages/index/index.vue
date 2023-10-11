<template>
	<view class="home-container">
		<!-- 导航栏组件 -->
		<Navbar></Navbar>
		<!-- 选项卡 -->
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeActiveIndex="changeActiveIndex"></TabBar>
		<!-- 文章列表组件 -->
		<ArticleList class="list-container" :labelList="labelList" :activeIndex="activeIndex"
			@changeActiveIndex="changeActiveIndex"></ArticleList>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// import {get_label_list} from '../../ajax/api/interface/home.js'
	export default {
		onLoad() {
			// 获取数据
			this._initLabelList()
			// console.log(this.$http)
		},
		data() {
			return {
				title: '首页',
				activeIndex: 0
			}
		},
		methods: {
			// 方法调用
			async _initLabelList() {
				if (this.labelList.length) return
				const labelList = await this.$http.get_label_list()
				this.setLabelList([{
					name: '全部'
				}, ...labelList])
				// uniCloud.callFunction({
				// 	name:'get_label_list',
				// 	successr:(res)=> {
				// 		this.labelList = res.result.labellist
				// 	}
				// })
			},
			changeActiveIndex(index) {
				this.activeIndex = index
			},
			// 调用自定义store的方法
			...mapMutations(['setLabelList'])
		},
		// 使用自定义的数据存储容器
		computed: {
			labelList() {
				if (this.userInfo) {
					this.activeIndex = 0; //展示全部
					// 数组合并，前面的是没有登录的时候所展示的数组，然后截取展示第一位就是"全部"，item是labelList的每一项，看看label_ids中是否包含item项，包含就把item项从label_ids中去除然后把剩余的反馈出去
					return [...this.$store.state.labelList.slice(0, 1), ...this.$store.state.labelList.filter(item => this
						.userInfo.label_ids.includes(item._id))]
				} else {
					// 没有登录状态首页面tabBar里面的默认值从state中拿取展示
					return this.$store.state.labelList
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './css/index.scss'
</style>
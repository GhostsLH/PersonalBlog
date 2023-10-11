<template>
	<view class="list-scroll-container">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
			<view>
				<!-- item的存在是接收当前item信息内容用于子组件以及自身进行判断展示 -->
				<ListCard @saveSearchHistory="$emit('saveSearchHistory')" :item="item" v-for="item in articleList" :key="item._id"></ListCard>
			</view>
			<!-- 加载插件 -->
			<!-- 数据容器数量为零或者数据数量大于一屏则说明数据刚开始加载或者已经开始加载所以展示展示加载板块，反之数量小于一屏就没必要展示加载板块 -->
			<uni-load-more v-if="articleList && isShowLoadMore && ( articleList.length === 0 || articleList.length > 7)"
				:status="loadData.loading || 'loading'"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ListItem",
		props: {
			articleList: {
				type: Array,
			},
			loadData: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			},
			isShowLoadMore: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			loadMore() {
				//将到底参数反馈给父页面
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>
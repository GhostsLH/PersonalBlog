<template>
	<!-- 容器组件 -->
	<swiper class="swiper-container" :current="activeIndex" @change="changeCurrentIndex">
		<swiper-item v-for="(item, index) in labelList" :key="item._id">
			<view class="swiper-item uni-bg-red">
				<ListItem :loadData="loadData[index]" :articleList="articleData[index]" @loadMore="loadMoreData">
				</ListItem>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "ArticleList",
		props: {
			labelList: Array,
			activeIndex: Number
		},
		created() {
			// console.log(this.labelList)
			this.labelList.length && this._getArticleList(this.activeIndex)
		},
		watch: { //参数监听	获取完成后监听参数变化
			labelList(newVal, oldVal) {
				// 转换成字符串判断俩是不是相等，相等就干掉
				if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return
				
				this.articleData = {};
				this.loadData = {};
				this._getArticleList(this.activeIndex)
			}
		},
		data() {
			return {
				articleData: {},
				loadData: {},
				pageSize: 6
			};
		},
		methods: {
			//到底加载更多内容事件
			loadMoreData() {
				if (this.loadData[this.activeIndex].total === this.articleData[this.activeIndex].length) {
					this.loadData[this.activeIndex] = {
						...this.loadData[this.activeIndex], //...是loadData这个对象里面每一当前项都进行更改
						...{
							loading: 'noMore'
						}
					}
					this.$forceUpdate() //vue方法强制更改
					return
				}
				this.loadData[this.activeIndex].page++
				this._getArticleList(this.activeIndex)
			},
			changeCurrentIndex(e) {
				console.log(e.detail.current)
				const {
					current
				} = e.detail
				this.$emit('changeActiveIndex', e.detail.current) //传递给父级参数

				//针对前端多次请求数据所造成的缓存压力
				//针对数据存在的时候的夯余操作，当下操作主要针对数据不存在或者当前分类不存在
				if (!this.articleData[current] || !this.articleData[current].length) { //如果分类不存在或者当前分类里面没有数据的话那就进行数据添加操作
					this._getArticleList(e.detail.current)
				}
			},
			// 数据请求函数 
			async _getArticleList(currentIndex) { //currentIndex是每一次请求传递的索引，页数等

				//指定每一个分类里面的页数信息	
				if (!this.loadData[currentIndex]) { //判断当前项是否存在
					this.loadData[currentIndex] = {
						page: 1, //每一项对应的当前页数
						loading: "loading", //每一项对应的当前状态
						total: 0 //每一项当前总条数
					}
				}
				const {
					articleList,
					total
				} = await this.$http.get_article_list({
					classify: this.labelList[currentIndex].name || '全部',
					page: this.loadData[currentIndex].page,
					pageSize: this.pageSize
				})
				let oldList = this.articleData[currentIndex] || [] //追加每一次的请求数据结果
				oldList.push(...articleList) //解构articleList赋值给oldList
				this.$set(this.articleData, currentIndex, oldList) //指引、监听、渲染
				this.loadData[currentIndex].total = total
			},

		}
	}
</script>

<style lang="scss" scoped>
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
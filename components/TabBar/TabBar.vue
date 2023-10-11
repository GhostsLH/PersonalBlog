<template>
	<view class="tab">
		<!-- 滚动区域 -->
		<scroll-view scroll-x="true" class="tab-scroll" :scroll-with-animation="true" :scroll-into-view="currentIndex">
			<view class="tab-scroll-box">
				<view @click="changeActiveIndex(index)" :class="{active : activeIndex === index}" class="tab-scroll-item" v-for="(item, index) in labelList" :key="index" :id="`item${index}`">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

		<!-- 图标部分 -->
		<view class="tab-icon">
			<uni-icons @click="goLabelAdmin" type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		props:{
			// 默认值
			labelList: Array,
			activeIndex: Number
		},
		// 监听
		watch:{
			// 监听activeIndex参数变化，每一次变化给currentIndex赋值模板字符串
			activeIndex(index){
				this.currentIndex = `item${index}`
			}
		},
		data() {
			return {
				currentIndex:'item0'
			};
		},
		methods:{
			changeActiveIndex(index){
				// 传递给父级
				this.$emit('changeActiveIndex', index)
			},
			// 跳转到标签管理界面
			async  goLabelAdmin(){
				// Mixin判断当前是否登录
				await this.checkedisLogin()
				
				uni.navigateTo({
					url:"/pages/labelAdmin/labelAdmin"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'css/TabBar.scss'
</style>
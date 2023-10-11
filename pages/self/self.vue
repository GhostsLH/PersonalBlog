<template>
	<view>
		<view v-if="userInfo" class="my-header">
			<view class="my-header-background">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-logo">
				<view class="my-header-logo-box" @click="changeAvatar">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="user-name">{{userInfo.author_name}}</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-info-title">被关注</text>
					<text>{{userInfo.follow_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">粉丝</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">积分</text>
					<text>{{userInfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>

		<!-- 内容部分 -->
		<view class="my-content">
			<view v-if="!userInfo" class="my-content-list" @click="goLogoPage">
				<view class="my-content-list-title">
					<image class="company-logo" src="../../static/img/logo.jpeg" mode="aspectFill"></image>
					<text>HI,您尚未登陆，请点击登录</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list" @click="goMyArticlepage">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list" @click="goFeedbackPage">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view class="my-content-list" @click="haveNewVersion && _getNewVersion()">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
					<view class="version-container">
						<text>
							当前版本
							<text v-if="haveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
						</text>
						<text class="version">{{currentVersion}}</text>
					</view>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<!-- #endif -->
			<button v-if="userInfo" type="warn" class="sigin-out" @click="siginOut">退出</button>
		</view>
	</view>
</template>

<script>
	import store from "../../store/index.js"
	export default {
		watch: { //参数监听	获取完成后监听参数变化
			userInfo(newVal, oldVal) {
				if (!this.userInfo) {
					console.log('用户数据没了')
					uni.redirectTo({ //关闭当前页面跳转到指定页面
							url: '/pages/index/index'
						})
					}
				}
			},
			onLoad() {
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success: res => {
						if (res.platform == 'android') {
							plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
								this.currentVersion = wgtinfo.version;
								this._checkVersion();
							})
						}
					}
				})
				// #endif
			},
			data() {
				return {
					title: '我的',
					haveNewVersion: true,
					currentVersion: '1.0.0'
				}
			},
			methods: {
				// 用户退出操作
				siginOut() {
					this.$store.commit('updateUserInfo', null)
					console.log('跳转')
					uni.switchTab({
						url: '/pages/index/index'
					});
				},
				// 用户登录操作
				goLogoPage() {
					uni.navigateTo({
						url: '/pages/userInfo/login/login'
					})
				},
				// 检测当前引用的版本
				async _checkVersion() {
					const {
						version,
						downLoadLinkUrl
					} = await this.$http.get_current_version();
					if (version > this.currentVersion) {
						this.haveNewVersion = true;
						this.downLoadLinkUrl = downLoadLinkUrl
					}
				},
				//最新版本的下载
				_getNewVersion() {
					uni.showLoading({
						title: '下载中，请稍后'
					});
					var dtask = plus.downloader.createDownload(this.downLoadLinkUrl, {}, function(d, status) {
						//下载完成
						uni.hideLoading({})
						if (status == 200) {
							plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
								error) {
								uni.showToast({
									title: '安装失败',
									duration: 1500,
									icon: 'none'
								});
							})
						} else {
							uni.showToast({
								title: '更新失败',
								duration: 1500,
								icon: 'none'
							});
						}
					});
					dtask.start();
				},
				// 跳转到我的文章界面
				goMyArticlepage() {
					uni.navigateTo({
						url: '/pages/myArticle/myArticle'
					})
				},
				// 跳转到意见反馈界面
				goFeedbackPage() {
					uni.navigateTo({
						url: '/pages/feedback/feedback'
					})
				},
				// 替换用户头像
				changeAvatar() {
					uni.chooseImage({
						count: 1,
						success: async res => {

							// 解决小程序读取不到name值
							const filePath = await this._uploadFile(res.tempFilePaths[0], res.tempFiles[0]
								.name || Date.now().toString() + res.tempFilePaths[0].substr(res
									.tempFilePaths[0].lastIndexOf('.')))
							await this._updateUserAvatar(filePath)
						}
					})
				},
				// 上传图片
				async _uploadFile(filePath, cloudPath) {
					const {
						fileID
					} = await uniCloud.uploadFile({
						filePath,
						cloudPath
					})
					return fileID;
				},
				// 更改用户及发布文章的头像
				async _updateUserAvatar(filePath) {
					const {
						msg
					} = await this.$http.update_user_avatar({
						userId: this.userInfo._id,
						filePath
					})
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					// 修改我们本地的vuex里面的用户数据
					this.updateUserInfo({
						...this.userInfo,
						avatar: filePath
					})
				}
			}
		}
</script>

<style lang="scss">
	@import './css/self.scss'
</style>
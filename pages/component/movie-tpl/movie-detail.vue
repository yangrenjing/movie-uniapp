<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">《{{movie.vodName}}》详情</block>
		</cu-custom>

		<view class="container fixed cu-bar" :style="[{top:CustomBar + 'px'}]">
			<image class="head-img" :src="movie.vodPic" mode="aspectFill" />
			<view class="head-img-hover">
				<text class="main-title">{{movie.vodName}}</text>
				<text class="sub-title">{{movie.vodArea + " · "+movie.vodYear}}</text>
				<view class="like">
					<text class="highlight-font">
						{{movie.vodHits}}
					</text>
					<text class="plain-font">
						人喜欢
					</text>
				</view>
			</view>
			<image class="movie-img" :src="movie.vodPic" data-src="movie.vodPic" catchtap="viewMoviePostImg" />
			<view class="summary">
				<view class="original-title">
					<text>{{movie.vodName}}</text>
				</view>
				<view class="flex-row">
					<text class="mark">导演</text>
					<text>{{movie.vodDiector==null?'' : movie.vodDiector}}</text>
				</view>
				<view class="flex-row">
					<text class="mark">演员</text>
					<text>{{movie.vodActor}}</text>
				</view>
				<view class="flex-row">
					<text class="mark">类型</text>
					<text>{{movie.typeName}}</text>
				</view>
				<button open-type="share" class="shareBtn">分享好友</button>
			</view>
			<!-- tab栏目 -->
			<scroll-view scroll-x class="bg-green nav text-center">
				<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
					<text class="cuIcon-playfill"></text> 播放
				</view>
				<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
					<text class="cuIcon-edit"></text> 简介
				</view>
				<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
					<text class="cuIcon-down"></text> 下载1
				</view>
				<view class="cu-item" :class="3==TabCur?'text-white cur':''" @tap="tabSelect" data-id="3">
					<text class="cuIcon-down"></text> 下载1
				</view>

			</scroll-view>
			<view style="width: 100%; text-align: center;">
				<scroll-view scroll-y class="scoll-h">
					<!-- 播放页面 -->
					<view v-if="0==TabCur" class="padding margin text-center">
						<view class="grid margin-bottom text-center col-3">
							<view class="item-margin-bottom" v-for="(item,indexs) in movie.downUrls" :key="indexs">
								<button :data-movie="movie" :data-url="item.url" :data-order="item.order" class="cu-btn round shadow lg" :class="item.order==remark? 'bg-red':'bg-green'"
								 @click="playMovie">{{item.order}}</button>
							</view>
						</view>
					</view>
					<!-- 简介 -->
					<view v-if="1==TabCur" class="padding summary-align">
						<view class="summary-content" v-html='movie.vodBlurb'></view>
					</view>
					<!-- 下载1页面 -->
					<view v-if="2==TabCur" class=" padding margin text-center">
						<view class="grid margin-bottom text-center col-3">
							<view class="item-margin-bottom" v-for="(item,indexs) in movie.downUrls" :key="indexs">
								<button :data-url="item.url" class="cu-btn round bg-green shadow lg" @click="copyUrl">{{item.order}}</button>
							</view>
						</view>
					</view>
					<!-- 下载2页面 -->
					<view v-if="3==TabCur" class="padding margin text-center">
						<view class="grid margin-bottom text-center col-3">
							<view class="item-margin-bottom" v-for="(item,indexs) in movie.playUrls" :key="indexs">
								<button :data-url="item.url" class="cu-btn round bg-green shadow lg" @click="copyUrl">{{item.order}}</button>
							</view>
						</view>
					</view>
				</scroll-view>
				<view>
					<uni-fab :pattern="pattern" :content="contents" :direction="direction" @trigger="trigger"></uni-fab>
				</view>
			</view>
		</view>
		<!-- 赞赏模态窗口 -->
		<view class="cu-modal" :class="zanModal?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url(../../../static/zan/zan.jpg);height:300px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>

		<!-- 播放模态窗口 -->
		<view class="cu-modal" :class="playModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{movie.vodName}}[{{remark}}]</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="my-margin">
					<view v-if="showTip">缓冲中······</view>
					<video :title="movie.vodName + '[' + remark + ']'" :src="url" @waiting="showTip = true" @timeupdate="showTip = false"></video>
				</view>
			</view>
		</view>

		<!-- 限制分享窗口 -->
		<view class="cu-modal" :class="shareModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">完成任务</view>
				</view>
				<view class="padding-xl bg-grey">
					分享一下，后续无障碍观看
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" open-type="share" @ShareAppMessage="onShareAppMessage">分享好友</button>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniFab from '../../../components/uni-fab/uni-fab.vue'
	// 请求封装
	import reqeust from '../../../util/request.js'
	export default {
		data() {
			return {
				isShare : false,
				shareModal: false,
				id: null,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				TabCur: 0,
				scrollLeft: 0,
				movie: {},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#d81e06',
					buttonColor: '#d81e06'
				},
				contents: [{
						iconPath: "../../static/fab/home.svg",
						selectedIconPath: "../../static/fab/home-select.svg",
						text: "首页",
						active: true
					},
					{
						iconPath: "../../static/fab/zan.svg",
						selectedIconPath: "../../static/fab/zan-select.svg",
						text: "红包",
						active: true
					},
					/* {
						iconPath: "../../static/fab/quan.svg",
						selectedIconPath: "../../static/fab/quan-select.svg",
						text: "会员券",
						active: true
					} */
				],
				horizontal: 'right',
				vertical: 'top',
				direction: 'horizontal',
				zanModal: false,
				playModal: false,
				url: "",
				remark: "",
				showTip: true
			}
		},
		onLoad: function(option) {
			this.id = option.id
			this.getDetail()
		},
		created: function() {},
		methods: {
			tabSelect: function(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			trigger(e) {
				console.log(e);
				/* 首页 */
				if (e.index == 0) {
					uni.redirectTo({
						url: '/pages/index/index'
					});
					return;
				} else if (e.index == 1) {
					this.zanModal = true
					return;
				}
			},
			hideModal(e) {
				this.zanModal = false
				this.playModal = false
				this.url = ""
			},
			playMovie: function(e) {
				//检验是否已经登陆
				let userInfo = uni.getStorageSync('loginInfo')
				if (userInfo ==null || userInfo == '') {
					uni.navigateTo({
					    url: '/pages/component/login/index'
					});
				}
				
				let playUrl = e.currentTarget.dataset.url
				this.playModal = true
				this.url = playUrl
				this.remark = e.currentTarget.dataset.order
				if (!this.isShare) {
					this.shareModal = true
				}
				
			},
			getDetail: function() {
				let _that = this;
				reqeust.get(reqeust.url.DETAIL + _that.id, null).then(res => {
					_that.movie = res
				})
			},
			copyUrl: function(e) {
				let _that = this
				uni.setClipboardData({
					data: e.currentTarget.dataset.url,
					success: function(res) {
						uni.showToast({
							icon: 'none',
							title: '复制成功请到浏览器打开'
						});
					}
				});
			},
			onShareAppMessage:function() {
				let _that = this;
				this.shareModal = false
				this.isShare = true
				return {
					title: "分享一部好看的电影给你",
					path: '/pages/component/movie-tpl/movie-detail?id=' + this.id,
				}
			}
		},
		components: {
			uniFab
		}
	}
</script>

<style scoped>
	.container {
		/* display: flex; */
		flex-direction: column;
	}

	.head-img {
		width: 100%;
		height: 320rpx;
		-webkit-filter: blur(20px);
	}

	.head-img-hover {
		width: 100%;
		height: 320rpx;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
	}

	.main-title {
		font-size: 19px;
		color: #fff;
		font-weight: bold;
		margin-top: 50rpx;
		margin-left: 40rpx;
		letter-spacing: 2px;
	}

	.sub-title {
		font-size: 28rpx;
		color: #fff;
		margin-left: 40rpx;
		margin-top: 30rpx;
	}

	.like {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}

	.highlight-font {
		color: #f21146;
		font-size: 22rpx;
		margin-right: 10rpx;
	}

	.plain-font {
		color: #666;
		font-size: 22rpx;
		margin-right: 30rpx;
	}


	.movie-img {
		height: 238rpx;
		width: 175rpx;
		position: absolute;
		top: 160rpx;
		right: 30rpx;
	}

	.summary {
		margin-left: 40rpx;
		margin-top: 40rpx;
		color: #777777;
		float: left;
		width: 100%;
	}

	.original-title {
		color: #1f3463;
		font-size: 24rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		margin-bottom: 10rpx;
	}

	.mark {
		margin-right: 30rpx;
		white-space: nowrap;
		color: #999999;
	}

	.hr {
		margin-top: 45rpx;
		height: 1px;
		width: 100%;
		background-color: #d9d9d9;
	}

	.synopsis {
		margin-left: 40rpx;
		/* display:flex; */
		flex-direction: column;
		/* margin-top: 50rpx; */
	}

	.synopsis-font {
		color: #999;
	}

	.summary-content {
		margin-top: 20rpx;
		margin-right: 40rpx;
		line-height: 40rpx;
		letter-spacing: 1px;
	}

	.cast {
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
	}

	.cast-font {
		color: #999;
		margin-bottom: 40rpx;
	}

	.cast-container {
		display: inline-flex;
		flex-direction: column;
		margin-bottom: 50rpx;
		margin-right: 40rpx;
		width: 170rpx;
		text-align: center;
		white-space: normal;
	}

	.cast-imgs {
		white-space: nowrap;
	}

	.cast-img {
		width: 170rpx;
		height: 210rpx;
	}

	.cast-name {
		margin: 10rpx auto 0;
	}

	.main {
		margin: 0 auto;
		width: 90%;
		height: 60rpx;
		background-color: white;
		margin-top: 2%;
		border: 1rpx solid white;
		border-radius: 10rpx;
	}

	/* 后面轮播 */
	/* tab2 */
	.tab-h {
		height: 80rpx;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 80rpx;
		background: #F7F7F7;
		font-size: 16px;
		white-space: nowrap;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.tab-item {
		margin: 0 36rpx;
		display: inline-block;
	}

	.tab-item.active {
		color: #d53e37;
		position: relative;
	}

	.tab-item.active:after {
		content: "";
		display: block;
		height: 8rpx;
		width: 52rpx;
		background: #d53e37;
		position: absolute;
		bottom: 0;
		left: 5rpx;
		border-radius: 16rpx;
	}

	.item-ans {
		width: 100%;
		display: flex;
		flex-grow: row no-wrap;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
		height: 180rpx;
		align-items: center;
		border-bottom: 1px solid #F2F2F2;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		position: relative;
		padding-right: 30rpx;
	}

	.avatar .img {
		width: 100%;
		height: 100%;
	}

	.avatar .doyen {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		bottom: -2px;
		right: 20rpx;
	}

	.expertInfo {
		font-size: 12px;
		flex-grow: 2;
		color: #B0B0B0;
		line-height: 1.5em;
	}

	.expertInfo .name {
		font-size: 16px;
		color: #000;
		margin-bottom: 6px;
	}

	.askBtn {
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 14px;
		border-radius: 60rpx;
		border: 1px solid #4675F9;
		color: #4675F9;
	}

	.tab-content {
		margin-top: 30rpx;
	}

	.scoll-h {
		height: 200px;
	}

	.shareBtn {
		width: 180rpx;
		height: 60rpx;
		font-size: 28rpx;
		color: white;
		background-color: red;
		line-height: 60rpx;
	}

	.myBtn {
		width: 260rpx;
		height: 60rpx;
		font-size: 28rpx;
		color: white;
		background-color: blue;
		line-height: 60rpx;
	}

	.note {
		font-size: 25rpx;
		color: red;
		padding-left: 10rpx;
	}


	/* 遮罩层 */
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 9000;
		opacity: 0.5;
	}

	/* 弹出层 */
	.modalDlg {
		width: 90%;
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		z-index: 9999;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 弹出层里面的图片 */
	.modalDlg image {
		width: 120px;
		height: 120px;
		margin-top: 30px;
	}

	/* 弹出层里面的按钮 */
	.ok {
		width: 80px;
		height: 35px;
		background: #44b549;
		line-height: 35px;
		text-align: center;
		color: #fff;
		font-size: 15px;
		margin: 20px auto;
		border-radius: 100px;
	}


	.popup-title {
		text-align: center;
		margin-bottom: 10px;
		margin-top: 5px;
		font-size: 20px;
	}

	.popup-content {
		font-size: 15px;
		color: #999999;
		padding: 0px 8px;
	}

	.remind {
		font-size: 20rpx;
		color: red;
		padding-left: 10rpx;
	}

	.item-margin-bottom {
		margin-bottom: 10rpx;
	}

	.summary-align {
		text-align: left;
	}

	.my-margin {
		margin: 10rpx;
	}
</style>

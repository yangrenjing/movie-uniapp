<template name="mine">
	<view class="page">
		<view class="me_container bg-gradual-pink">
			<view class="padding" style="width: 100%;text-align: center;">
				<view class="cu-avatar xl round login-button" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<view class="padding flex flex-direction">
					<view v-if="showInfo">{{nickname}}</view>
					<button v-if="!showInfo" class="cu-btn bg-blue margin-tb-sm lg fixed " @click="toLogin">请登陆</button>
				</view>
			</view>
		</view>
		<!-- 文字滚动 -->
		<view class="cu-list menu card-menu margin-top" :class="[menuBorder?'sm-border':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="show=true">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">免责声明</text>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="show?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">免责声明</view>
					<view class="action" @tap="show=false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					&nbsp;&nbsp;本程序的所有资源均来自网络所提供的公开资源，所有的视频和图文版权均归原作者所有。如果有侵权资源，请第一时间告知我们，我们会立即处理。
					<br />联系邮箱：735345044@qq.com
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mine",
		data() {
			return {
				show: false,
				showInfo: false,
				nickname: '',
			}
		},
		mounted: function() {
			let userInfo = uni.getStorageSync('loginInfo')
			if (userInfo !== null && userInfo != '') {
				this.nickname = userInfo.nickName
				this.showInfo = true
			}
		},
		methods: {
			toLogin: function() {
				uni.navigateTo({
					url: '/pages/component/login/index'
				});
			}
		}
	}
</script>

<style>
	.me_container {
		height: 500rpx;
	}

	.page {
		margin-bottom: 180rpx;
	}

	.login-button {
		margin-top: 100rpx;
	}

	.notice {
		height: 400rpx;
		width: 100%;
	}
</style>

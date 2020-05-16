<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<search v-if="PageCur=='search'"></search>
		<mine v-if="PageCur=='mine'"></mine>
		<view class="cu-bar tabbar bg-white foot">
			<view class="action add-action" :class="PageCur=='home'?'text-green' : 'text-gray'" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action add-action" :class="PageCur=='search'?'text-green' : 'text-gray'" @click="NavChange" data-cur="search">
				<button class="cu-btn cuIcon-search shadow" :class="PageCur=='search'?'bg-green' : 'bg-gray'"></button>
				搜索
			</view>
			<view class="action add-action" :class="PageCur=='mine'?'text-green' : 'text-gray'" @click="NavChange" data-cur="mine">
				<view class="cuIcon-my">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		onShow: function() {
			this.PageCur = 'home'
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>

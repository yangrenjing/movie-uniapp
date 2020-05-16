<template name="singleMovie">
	
	<view  @click="detail"  class="movie-container flex-sub bg-white padding-sm margin-xs radius single-movie" :data-id="movieId">
		<image class="movie-img" :src="imgSrc">
			<view class="episode">{{remark}}</view>
		</image>
		<text class="movie-title">{{title}}</text>
	</view>
	
</template>

<script>
	export default {
		name: "singleMovie",
		props: ['movieId', 'imgSrc', 'remark', 'title'],
		methods:{
			detail:function(e) {
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
				    url: '/pages/component/movie-tpl/movie-detail?id=' + id
				});
			}
		}
	}
</script>

<style scoped>
	.single-movie {
		position: relative;
		height: 350rpx;
		/* width: 280rpx; */
		padding: 0 5rpx;
	}
	
	.movie-container {
		display: flex;
		flex-direction: column;
		/* padding: 0 22rpx; */
	}
	
	.movie-img {
		width: 220rpx;
		height: 300rpx;
		padding-bottom: 20rpx;
		position: relative;
	}
	
	.movie-title {
		margin-bottom: 16rpx;
		font-size: 24rpx;
		text-align: center;
	}
	
	.episode {
		position: absolute;
		/* bottom:20rpx; */
		width: 220rpx;
		font-size: 30rpx;
		color: #ffffff;
		background: #000;
		opacity: 0.6;
		text-align: center;
	}
</style>

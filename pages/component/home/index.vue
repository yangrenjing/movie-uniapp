<template name="home">
	<view class="page">
		<!-- 页面头部 -->
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg">
			<block slot="content">首页</block>
		</cu-custom>

		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item" :data-id="item.id" :data-type="item.bannerType" :data-jump="item.jumpUrl" 
				@click="jumpPage" style="background-size:contain;" 
				:style="'background-image:url(' + item.picUrl+')'">
					<view class="padding-xl text-white">
						<view class="padding-xs text-xxl text-bold">
							{{item.bannerName}}
						</view>
						<view class="padding-xs text-lg">
							{{item.bannerSubject}}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 资源列表 -->
		<view>
			<view class="cu-bar bg-cyan solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 大家都在看
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" data-target="gridModal" @click="getMore(0)">更多</button>
				</view>
			</view>
			<view class="bg-white">
				<view class="flex">
					<single-movie v-for="item in movieList" :movieId="item.vodId" :imgSrc='item.vodPic' :remark='item.vodRemarks'
					 :title='item.vodName' :key="item.vodId"></single-movie>
				</view>
			</view>
		</view>

		<view>
			<view class="cu-bar bg-cyan solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 热剧更新
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" data-target="gridModal" @click="getMore(1)">更多</button>
				</view>
			</view>
			<view class="bg-white">
				<view class="flex">
					<single-movie v-for="item in hotList" :movieId="item.vodId" :imgSrc='item.vodPic' :remark='item.vodRemarks'
					 :title='item.vodName' :key="item.vodId"></single-movie>
				</view>
			</view>
		</view>
		
		<!-- 播放模态窗口 -->
		<view class="cu-modal" :class="noticeShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">公告</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-grey">
					你们好啊！！！
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// 单个电影的组件
	import singleMovie from '../movie-tpl/single-movie.vue'
	// 请求封装
	import reqeust from '../../../util/request.js'
	export default {
		name: "home",
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				cardCur: 0,
				noticeShow: false,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				movieList: [],
				hotList: []
			}
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			// 获取【大家都在看的电影】

		},
		created: function() {
			this.getMovicLimit()
			this.getHotList()
			this.getBannerList()
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			getMore: function(type) {
				uni.navigateTo({
					url: '/pages/component/movie-tpl/more-movie?type=' + type
				});
			},
			getMovicLimit: function() {
				let _that = this;
				reqeust.get(reqeust.url.GET_MOVIC_LIMIT, null).then(res => {
					_that.movieList = res;
				})
			},
			getHotList: function() {
				let _that = this;
				reqeust.get(reqeust.url.HOT_List, null).then(res => {
					_that.hotList = res;
				})
			},
			hideModal: function() {
				this.noticeShow = false
			},
			getBannerList: function() {
				let _that = this;
				reqeust.get(reqeust.url.BANNER, null).then(res => {
					_that.swiperList = res;
				})
			},
			jumpPage: function(e) {
				let typeId = e.currentTarget.dataset.type
				if (typeId === 0) {
					uni.navigateTo({
					    url: e.currentTarget.dataset.jump
					});
				}
			}
		},
		components: {
			singleMovie
		}

	}
</script>

<style scoped>
	.page {
		height: 100vh;
		margin-bottom: 300rpx;
	}
</style>

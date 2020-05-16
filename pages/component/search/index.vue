<template name="search">
	<view class="page">
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg">
			<block slot="content">搜索</block>
		</cu-custom>
		<!-- 页面搜索框 -->
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" @focus="history=true" v-model="name"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="searchMovie">搜索</button>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="cu-bar fixed padding-sm" :style="[{top:CustomBar+60 + 'px'}]" v-if="history">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" v-for="(item,index) in historyList" :key="index">
					<view class='cu-tag radius lg' :class="index%2==0?'bg-red':'bg-orange'" :data-title="item" @click="chooseHistory">{{item}}</view>
				</view>
			</view>
			<view v-if="historyList.length > 0" class="action" @tap="clearHitory">
				<text class="cuIcon-close text-red"></text>
			</view>
		</view>

		<!-- 查询列表 -->
		<view class="cu-bar bg-white" v-if="!history" :style="[{top:CustomBar + 'px'}]">
			<view class="grid margin-bottom text-center col-3">
				<single-movie v-for="item in movieList" :movieId="item.vodId" :imgSrc='item.vodPic' :remark='item.vodRemarks'
				 :title='item.vodName' :key="item.vodId"></single-movie>
			</view>
		</view>
	</view>
</template>

<script>
	import singleMovie from '../movie-tpl/single-movie.vue'
	// 上拉获取更多
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	// 请求封装
	import reqeust from '../../../util/request.js'
	export default {
		name: "search",
		data() {
			return {
				name: "",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				history: true,
				movieList: [{
						id: '1',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '2',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '3',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '4',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '5',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '6',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '7',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '8',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '9',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '10',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '11',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					},
					{
						id: '12',
						imgSrc: 'https://img.kuyun88.com/pic/uploadimg/2019-1/201912519593775229.jpg',
						remark: '第六集',
						title: '王国'
					}
				],
				historyList: [],
				page: 1,
				status: 'loading'
			}
		},
		created: function() {
			if (uni.getStorageSync('history') != '') {
				this.historyList = uni.getStorageSync('history');
			}
		},
		methods: {
			/* 找电影 */
			searchMovie: function() {
				// 添加查找历史
				this.history = false;
				this.historyList.unshift(this.name)
				// 去重
				this.historyList = Array.from(new Set(this.historyList))
				if (this.historyList.length > 30) {
					this.historyList.pop()
				}
				uni.setStorageSync('history', this.historyList);

				//找资源
				let data = {
					key: this.name,
					page: this.page,
					pageSize:50
				}
				reqeust.post(reqeust.url.SEARCH, data).then(res => {
					this.movieList = res.list
				})
			},
			chooseHistory: function(e) {
				// 获取有查询的资源
				let choosed = e.currentTarget.dataset.title
				this.name = choosed
				// 查询
				this.searchMovie()
			},
			clearHitory: function() {
				this.historyList = [];
				uni.setStorageSync('history', this.historyList);
			}
		},
		components: {
			singleMovie,
			uniLoadMore
		}

	}
</script>

<style>
	.page {
		margin-bottom: 250rpx;
	}

	.margin_top {
		margin-top: 250rpx;
	}
</style>

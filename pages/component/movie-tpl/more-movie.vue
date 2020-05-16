<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" >{{type == 1 ? '大家都在看' : '热剧更新'}}</block>
		</cu-custom>
		
		<view class="bg-white">
			<view class="grid margin-bottom text-center col-3">
				<single-movie v-for="item in movieList"
				:movieId="item.vodId" 
				:imgSrc='item.vodPic' :remark='item.vodRemarks' :title='item.vodName' :key="item.vodId"></single-movie>
			</view>
		</view>
		
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import singleMovie from './single-movie.vue'
	// 上下拉更新
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	// 请求封装
	import reqeust from '../../../util/request.js'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				type : "",
				movieList: [],
				status: 'loading'
			}
		},
		onLoad:function(option){
			this.type = option.type
			this.getMoreWatch(this.type)
		},
		created:function(){
			
		},
		methods: {
			getMoreWatch: function() {
				let _that = this;
				let data = {
					typeId: _that.type
				}
				reqeust.post(reqeust.url.GET_MORE_WATCH, data).then(res => {
					_that.movieList = res.list;
				})
			}
		},
		components:{
			singleMovie,
			uniLoadMore
		}
	}
</script>

<style>
</style>

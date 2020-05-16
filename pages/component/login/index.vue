<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" >登陆页面</block>
		</cu-custom>
		<view class='main' :style="[{height:phoneHeight-CustomBar + 'px'}]">
			<view class="padding" style="width: 100%;text-align: center;">
				<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			</view>
			
			<view class=" padding-sm">
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue margin-tb-sm lg fixed login-button" open-type="getUserInfo" @click="toLogin">请登陆</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	// 请求封装
	import reqeust from '../../../util/request.js'
	
	export default {
		data(){
			return{
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				phoneHeight: this.phoneHeight
			}
		},
		onLoad:function(){
		},
		methods:{
			toLogin: function() {
				uni.login({
					provider: 'weixin',
					success:function(res){
						uni.getUserInfo({
							provider:'weixin',
							success:function(infoRes){
								let data = {
									code: res.code,
									iv: infoRes.iv,
									encryptedData: infoRes.encryptedData
								}
								reqeust.post(reqeust.url.DO_LOGIN, data).then(loginRes => {
									// 保存登陆结果
									if(loginRes != null) {
										uni.setStorageSync('loginInfo', loginRes)
										uni.setStorageSync('token', loginRes.token)
										// 跳回上一层
										uni.navigateBack({
										    delta: 1
										});
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.main {
	  display: flex;
	  align-items: center;
	  justify-content: center;  
	  width: 100%;
	  flex-wrap:wrap;
	  flex-direction: row;
	}
</style>

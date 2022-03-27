<template>
	<view>
		<view>
			<text>精选模板</text>
		</view>
		<view>
			<scroll-view class="vip-coupon-scroll" :scroll-x="true">
				<view class="item ml5" v-for="(listItem, index) in tempList" :key="index">
					<navigator :url="'/pages/index/update?index='+listItem.id">
						<image style="width: 150px;margin: 10px;" :src="listItem.dragBg.url"></image>
						<view class="mt12 flex center">
							<view class="btn-small" style="color:#000000;width: 190rpx;">{{listItem.name}}</view>
						</view>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import {get} from '../../utils/apiFunc'
export default {
	data() {
		return{
			tempList:[]
		}
	},
	onLoad() {
		this.getPosters();
	},
	methods:{
		async getPosters(){
			let {data} = await get();
			this.tempList = data;
		},
	}
}
</script>

<style>
        .vip-coupon-scroll{
			white-space: nowrap;
			height: 600rpx;
		}
		.vip-coupon-scroll .item{
			
			display: inline-block;
			
			background: #FFFFFF;
			position: relative;
			border-radius: 16rpx;
			overflow: hidden;
		}
		.vip-coupon-scroll .item .top{
			padding: 32rpx 40rpx 24rpx 40rpx;
			border-bottom: 2rpx dashed #FEC675;
		}
		.vip-coupon-scroll .item .y-l,.vip-coupon-scroll .item .y-r{
			width: 20rpx;
			height: 20rpx;
			border-radius: 10rpx;
			background: #F87065;
			position: absolute;
			z-index: 2;
			top: 220rpx;
		}
		.vip-coupon-scroll .item .y-l{
			left: -10rpx;
		}
		.vip-coupon-scroll .item .y-r{
			right: -10rpx;
		}
</style>

<template>
	<view class="qrocde-modal">
		<view  class="modal-bg" :style="{zIndex:zindex}"></view>
		<view class="modal-box animated fast" :style="{zIndex:zindex+1,background:bg}" :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-light ftw600 text-center">素材库</view>
				<view class="tuan-detail-content-tab bd-bottom">
						<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
				</view>
				<view v-if="selectIndex == 0" class="pd16_15">
					<view class="flex wrap mt24">
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/tomato.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								西红柿
							</view>
						</view>
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/tlms.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								提拉米苏
							</view>
						</view>
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/sn.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								酸奶
							</view>
						</view>
					</view>
					<view class="flex wrap mt24">
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/smz.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								三明治
							</view>
						</view>
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/gt.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								罐头
							</view>
						</view>
						<view class="col3">
							<view class="text-center">
								<image class="miniapp-icon" src="../../static/image/pf.png"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								泡芙
							</view>
						</view>
					</view>
				</view>
				<view v-if="selectIndex == 1" class="pd16_15">
					<view class="flex">
						<view style="width: 140rpx;" class="ft14 cl-info2 text-right">有效期：</view>
						<view style="width: calc(100% - 140rpx);" class="ft14 cl-main lh20">2020.6.1 至 2020.7.12 23:59（周末、法定节假日通用）</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export  default{
		props:{
			zindex:{
				type:Number,
				default:401,
			},
			bg:{
				type:String,
				default:'#ffffff',
			},
			
		},
		data(){
			return {
				show:false,
				qrcodeImg:'',
				selectIndex:0,
				tabs:['图片库','文本库'],
			}
		},
		created(){
			this.show = true;
		},
		methods:{
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed');
				},400);
			},
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.qrocde-modal{
		position: relative;
		z-index: 400;
	}
	.qrocde-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.qrocde-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#333333;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.qrocde-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		min-height: 700rpx;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
		background-color: #333333;
	}
	.qrocde-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	.miniapp-icon{
		width: 90rpx;
		height: 90rpx;
		border-radius: 40rpx;
	}
</style>
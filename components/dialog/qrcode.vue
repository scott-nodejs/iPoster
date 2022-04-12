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
						<view class="col3" @click="selectImg(item.content)" v-for="(item,index) in images">
							<view class="text-center">
								<image class="miniapp-icon" :src="item.content"></image>
							</view>
							<view class="text-center ft12 cl-info2 mt8">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view v-if="selectIndex == 1" class="pd16_15">
					<view class="flex wrap mt24">
						<view class="col4" @click="selectText(item.content)" v-for="(item,index) in texts">
								<view>
									<view class="miniapp-text text-center ft14 cl-light pt10">
										{{item.content}}
									</view>
								</view>
								<view class="text-center ft12 cl-info2 mt8">
									{{item.name}}
								</view>
							</view>
						</view>					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getData} from '../../utils/apiFunc'
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
				images:[],
				texts:[]
			}
		},
		created(){
			this.show = true;
			this.getdatas();
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
			},
			selectImg(img) {
			  this.$emit("handle", img)
			},
			selectText(text1){
				this.$emit("txtHandle", {
					text: text1,
					color: "#fff",
					fontWeight: "normal",
					fontSize: "18",
					textDecoration: "",
					textAlign: "left"
				})
			},
			async getdatas(){
				const {data} = await getData();
				console.log(data)
				for(let i = 0; i < data.length; i++){
					if(data[i].type == 0){
						this.images = data[i].data;
					}
					if(data[i].type == 1){
						this.texts = data[i].data;
					}
				}
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
	.miniapp-text{
		height: 100rpx;
		background-color: #555555;
		margin: 8px;
	}

</style>
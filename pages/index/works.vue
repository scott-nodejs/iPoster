<template>
	<view class="my-container">
		<view style="width: 200px;">
				<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
		</view>
		<view v-if="selectIndex == 0" class="pd16_15">
		   <view class="flex wrap mt24" v-if="tempList.length > 0">
					 <view class="template-wrap">
					 	<img class="template-item" @click="tapCard(item)" v-for="(item,i) in tempList" :key="i" :src="item.posterImgUrl" :data-id="item._id" alt="" srcset="">
					 </view>
				 </view>
				 <view class="flex wrap mt24" v-else>
					 <text>暂无作品</text>
				 </view>
		</view>
		
		<view v-if="selectIndex == 1" class="pd16_15">
		   <view class="flex wrap mt24">
					 <text>暂无收藏的作品</text>
				 </view>
		</view>
	</view>
</template>

<script>
import {myWorks} from '../../utils/apiFunc'
export default {
  name: 'my-login',
  data() {
    return {
		selectIndex:0,
		tabs:['作品','收藏'],
		tempList:[]
	};
  },
  created() {
	  this.handleTemDiolag();
  },
  methods:{
	  tapCard(item){
	  	uni.navigateTo({
	  		url: '/pages/index/update?index='+item.id+'&type=my'
	  	})
	  },
	
	  changeIndex(index){
	  	this.selectIndex = index;
	  },
	  async handleTemDiolag(){
	  	let {data} = await myWorks()
	  	
	  	this.tempList = data
	  },
  }
}
</script>

<style lang="scss" scoped>
.my-container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 5%;
	  
	  .template-wrap{
	  	height:1200rpx;
	  	overflow: scroll;
	  	.template-item{
	  		width: 280rpx;
	  		margin: 30rpx;
	  	}
	  }
}	
</style>

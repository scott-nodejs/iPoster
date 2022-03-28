<!--
 * @Description: 
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-11 10:57:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-01 23:32:36
-->
<template>
	<view>
		<view class="head-top">
			<view class="text-button" @click="handleCanvasCancel">清空重做</view>
			<view class="text-button" @click="handleMenu('save')">下载保存</view>
		</view>
		<view class="content">
			<img class="bg-img" v-if="dragBg.url" :src="dragBg.url" alt="" srcset="">
			<view class="drag-wrap" v-for="(item,i) in dragList" :key="item.id">
				<!-- 拖拽元素 -->
				<!-- 图片 -->
				<view v-if="item.type==='img'">
					<img
					@touchstart.stop='handleTouchStart'  
					@touchmove.stop="handleTouchMove" 
					:data-id='item.id' 
					:style="{top:item.top+'px',left:item.left+'px',width:item.width+'px',height:item.height+'px',transform:'rotate('+item.rotate+'deg)',borderRadius:item.radius}"
					class="drag-item" :class="{'active':item.active}"
					:src="item.url" alt="" srcset="">
				</view>
				<!-- 文本 -->
				<view v-if="item.type==='text'">
					<text class="drag-item"
					@touchstart.stop='handleTouchStart'
					 @touchmove.stop="handleTouchMove"
					:data-id='item.id'
				 :class="{'active':item.active}"
				 :style="{top:item.top+'px',left:item.left+'px',width:item.width+'px',height:item.height+'px',transform:'rotate('+item.rotate+'deg)',
				 		color: item.color,
						fontSize: item.fontSize +'px',
						textDecoration: item.textDecoration,
						textAlign: item.textAlign,
						fontWeight: item.fontWeight
				 }" 
				 >{{item.text}}</text>
				</view>
				<!-- 编辑 -->
				<img class="scale-icon"
				v-if="item.active&&item.type==='text'"  
				@click='handleEdit(item,i)'  
				:data-id='item.id' 
				:style="{top:item.top-10+'px',left:item.left-10+'px'}"
				src="/static/hch-poster/edit.png" alt="" srcset="">
				<!-- 缩放 -->
				<img class="scale-icon"
				v-if="item.active"  
				@touchstart.stop='handleScaleStart'  
				@touchmove.stop="handleScaleMove"
				:data-id='item.id' 
				:style="{top:item.height+item.top-5+'px',left:item.width+item.left-5+'px'}"
				src="/static/hch-poster/scale_icon.png" alt="" srcset="">
				<!-- 删除 -->
				<img class="scale-icon"
				v-if="item.active"
				@click="handleDel(i)"
				:data-id='item.id' 
				:style="{top:item.top-10+'px',left:item.width+item.left-5+'px'}"
				src="/static/hch-poster/del_1.png" alt="" srcset="">
			</view>
			<!-- 海报 -->
			<canvas class="canvas" v-show="canvasShow" canvas-id="myCanvas" id='myCanvas'></canvas>
		</view>
		<!-- 菜单 -->
		<view class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15 flex alcenter space">
					<view class="flex alcenter space">
						<view class="form-footer-item text-center" @click="handleMenu('bg')">
							<!-- <view class="iconfont iconicon_bottom_home ft22"></view> -->
							<image class="image-item" src="../../static/hch-menu/model.png"></image>
							<view class="ft12 mt8">设置背景</view>
						</view>
						
						<view class="form-footer-item text-center" @click="handleMenu('text')">
							<image class="image-item" src="../../static/hch-menu/font.png"></image>
							<view class="ft12 mt8">添加文字</view>
						</view>
					
						<view class="form-footer-item text-center " @click="handleMenu('pic')">
							<image class="image-item" src="../../static/hch-menu/dsc.png"></image>
							<view class="ft12 mt8">添加素材</view>
						</view>
						
						<view class="form-footer-item text-center ">
							<image class="image-item" src="../../static/hch-menu/sc.png"></image>
							<view class="ft12 mt8">素材库</view>
						</view>
						
					</view>	
				</view>
			</view>
		</view>
		<!-- <hch-menu @clickMenu="handleMenu"></hch-menu> -->
		<hch-dialog class="dialog-wrap" :show-modal="showDiolag" modal-title="选择" @cancel="showDiolag=false">
			<view class="choose-wrap">
				<view class="choose-item" @click="handleTemDiolag">
					<img class="img" src="/static/hch-poster/template.png" alt="" srcset="">
					模板选择
				</view>
				<view class="choose-item" @click="handleChoose('bg')">
					<img class="img" src="/static/hch-poster/pic.png" alt="" srcset="">
					背景图选择
				</view>
			</view>
		</hch-dialog>
		<hch-dialog class="dialog-wrap template-dialog" :showModal="showTempDiolag" modal-title="模板选择" @cancel="showTempDiolag=false">
			<view class="template-wrap">
				<img class="template-item" @click="chooseTemp(i)" v-for="(item,i) in tempList" :key="i" :src="item.dragBg.url" :data-id="item._id" alt="" srcset="">
			</view>
		</hch-dialog>
		<hch-font :is-show="fontShow" :fontData='font' @cancel="fontShow = false" @confirm="handleFontConfirm"/>
	</view>
</template>

<script>
import HchMenu from '../../components/hch-menu/hch-menu.vue'
import HchDialog from '../../components/hch-dialog/hch-dialog.vue'
import HchFont from '../../components/hch-font/hch-font.vue'
import {upload,chooseImgUpload,add,get,one} from '../../utils/apiFunc'
import {chooseImage,drawSquarePic,drawTextReturnH,getSystem} from '../../utils'
	export default {
		components: {
			HchMenu,
			HchDialog,
			HchFont
		},
		data() {
			return {
				font:{},
				fontSize:10,
				fontShow:false,
				textValue:"",//输入文本
				tempList:[],//模板数据
				showDiolag:false,//背景图选择弹窗
				showTempDiolag:false,//模板选择弹窗
				showTextDiolag:false,//文本输入框弹窗
				index:0,
				canvasShow:false,
				dragBg:{
					url:'',
					width:0,
					height:0,
					top:0,
					left:0,
					radius:0,
				},
				dragList:[
				]

			}
		},
		computed: {
		},
		onLoad(options){
		this.system = getSystem()
		let index = options.index;
		this.getOne(index)
		},
		onReady(){
		},
		methods: {
			/**
			* @description: 拖拽对象开始接触移动前
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleTouchStart(e){
				var self = this;
				for (let i = 0; i < this.dragList.length; i++) { // 找到点击的
					this.dragList[i].active = false;
					if (e.currentTarget.dataset.id == this.dragList[i].id) {
						this.index = i // 下标索引
						this.dragList[this.index].active = true; // 当前选中
					}
				}
				// 移动前点击的位置
				this.beforeMove = {
					x : e.touches[0].clientX, 
    			    y :e.touches[0].clientY
				}
			},
			/**
			* @description: 拖拽对象接触移动时
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleTouchMove(e){
				//移动时
				this.afterMove = {
						x : e.touches[0].clientX, 
					y :e.touches[0].clientY
				}
				//改动值赋值给当前原生属性
				this.dragList[this.index].left += this.afterMove.x - this.beforeMove.x; // x方向
				this.dragList[this.index].top += this.afterMove.y - this.beforeMove.y; // y方向

				// 新的位置复制为移动前的位置
				this.beforeMove = {
					x : e.touches[0].clientX, 
    			y :e.touches[0].clientY
				}
			},
			/**
			* @description: 缩放按钮开始接触移动前
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleScaleStart(e){
				var self = this;
				for (let i = 0; i < this.dragList.length; i++) { // 找到点击的
					this.dragList[i].active = false;
					if (e.currentTarget.dataset.id == this.dragList[i].id) {
						this.index = i // 下标索引
						this.dragList[this.index].active = true; // 当前选中
					}
				}
				// 移动前点击的位置
				this.beforeMove = {
					x : e.touches[0].clientX, 
    			y :e.touches[0].clientY
				}
			},
			/**
			* @description: 缩放按钮接触移动时
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleScaleMove(e){
				//移动时
				this.afterMove = {
					x : e.touches[0].clientX, 
					y :e.touches[0].clientY
				}
				//改动值赋值给当前原生属性
				this.dragList[this.index].width += this.afterMove.x - this.beforeMove.x; // x方向
				this.dragList[this.index].height += this.afterMove.y - this.beforeMove.y; // y方向

				// 新的位置复制为移动前的位置
				this.beforeMove = {
					x : e.touches[0].clientX, 
					y :e.touches[0].clientY
				}
			},
			/**
			* @description: 删除拖拽元素
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleDel(i){
				this.dragList.splice(i,1)
			},
			/**
			* @description: 编辑文本
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleEdit(item,i){
				this.currentIndex = i
				this.fontShow = true
				this.font = item
			},
			/**
			* @description: 获取角度
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			countDeg(cx, cy, pointer_x, pointer_y) {
				var ox = pointer_x - cx;
				var oy = pointer_y - cy;
				var to = Math.abs(ox / oy);
				var angle = Math.atan(to) / (2 * Math.PI) * 360; //鼠标相对于旋转中心的角度
				if (ox < 0 && oy < 0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
				{
					angle = -angle;
				} else if (ox <= 0 && oy >= 0) //左下角,3象限  
				{
					angle = -(180 - angle)
				} else if (ox > 0 && oy < 0) //右上角，1象限  
				{
					angle = angle;
				} else if (ox > 0 && oy > 0) //右下角，2象限  
				{
					angle = 180 - angle;
				}
				return angle;
			},
			/**
     * @description: 生成海报
     * @author: hch
     */
			async creatPoster(){
				this.canvasShow = true
				wx.showLoading({
					title: "生成海报中..."
				})
				const ctx = wx.createCanvasContext("myCanvas",this)
				ctx.draw()//清空之前的海报
				// 根据设备屏幕大小和距离屏幕上下左右距离，及圆角绘制背景
				if (this.dragBg.url){
					this.dragBg.width = this.system.w
					this.dragBg.height = this.system.h
					let dragBg = this.dragBg
					await drawSquarePic(ctx,dragBg.left,dragBg.top, dragBg.width,dragBg.height,dragBg.radius,dragBg.url)
				}else{
						await drawSquarePic(ctx,0,0,this.system.w,this.system.h,0,'','pink')
				}
				for (let i = 0; i < this.dragList.length; i++) {
					const element = this.dragList[i];
					if(element.type==='img'){
						await drawSquarePic(ctx,element.left,element.top, element.width,element.height,element.radius,element.url)
					}
					if(element.type==='text'){
						console.log("creatPoster -> element", element)
						await drawTextReturnH(ctx,element.text,element.left,element.top,element.width,element.fontSize,element.color,element.textAlign,element.fontWeight)
					}
				}
				setTimeout(()=>{
					this.handleSaveCanvasImage()
				},500)
				wx.hideLoading()
			},
			
			/**
     * @description: 保存到系统相册
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    handleSaveCanvasImage() {
      uni.showLoading({
        title: "保存中..."
      })
      let _this = this
      // 把画布转化成临时文件
      // #ifndef MP-ALIPAY
      // 支付宝小程序外，其他都是用这个方法 canvasToTempFilePath
        uni.canvasToTempFilePath({
          x: 0,
		  y: 0,
		  width: this.system.w, // 画布的宽
		  height: this.system.h, // 画布的高
		  destWidth: this.system.w * 5,
		  destHeight: this.system.h * 5,
		  canvasId: "myCanvas",
          canvasId: "myCanvas",
          success:async function(res) {
			// 上传海报
			let {fileID} = await upload(res.tempFilePath)
			// 存储数据
			await add({
				createTime: Date.now(),
				dragBg:_this.dragBg,
				dragList:_this.dragList,
				posterImgUrl:fileID
			})			
            //保存图片至相册
            // #ifndef H5
            // 除了h5以外的其他端
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                uni.hideLoading()
                uni.showToast({
                  title: "图片保存成功，可以去分享啦~",
                  duration: 2000,
                  icon: "none"
                })
                _this.handleCanvasCancel()
              },
              fail() {
                uni.showToast({
                  title: "保存失败，稍后再试",
                  duration: 2000,
                  icon: "none"
                })
                uni.hideLoading()
              }
            })
            // #endif

            // #ifdef H5
            // h5的时候
            uni.showToast({
              title: "请长按保存",
              duration: 3000,
              icon: "none"
            })
						_this.handleCanvasCancel()
						// 预览图片
						uni.previewImage({
							urls: [res.tempFilePath]
						})
            // #endif
          },
          fail(res) {
            console.log("fail -> res", res)
            uni.showToast({
              title: "保存失败，稍后再试",
              duration: 2000,
              icon: "none"
            })
            uni.hideLoading()
          }
        },this)
      // #endif
      // #ifdef MP-ALIPAY
      // 支付宝小程序条件下 toTempFilePath
      this.ctx.toTempFilePath({
        x: this.poster.x,
        y: this.poster.y,
        width: this.poster.w, // 画布的宽
        height: this.poster.h, // 画布的高
        destWidth: this.poster.w * 5,
        destHeight: this.poster.h * 5,
        success(res) {
          //保存图片至相册
            my.saveImage({
            url: res.apFilePath,
            showActionSheet: true,
            success(res) {
              uni.hideLoading()
              uni.showToast({
                title: "图片保存成功，可以去分享啦~",
                duration: 2000,
                icon: "none"
              })
              _this.handleCanvasCancel()
            },
            fail() {
              uni.showToast({
                title: "保存失败，稍后再试",
                duration: 2000,
                icon: "none"
              })
              uni.hideLoading()
            }
          })
        },
        fail(res) {
          console.log("fail -> res", res)
          uni.showToast({
            title: "保存失败，稍后再试",
            duration: 2000,
            icon: "none"
          })
          uni.hideLoading()
        }
      },this)
      // #endif
    },
			/**
			 * @description: 取消海报
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			handleCanvasCancel() {
				this.canvasShow = false
				this.dragList=[]
				this.dragBg.url=""
			},
			/**
			* @description: 点击选择模板
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			async handleTemDiolag(){
				let {data} = await get()
				
				this.tempList = data
				this.showDiolag = false
				this.showTempDiolag = true
			},
			async getOne(index){
				let {data} = await one(index)
				
				this.dragList = data.dragList
				this.dragBg = data.dragBg
			},
			/**
			* @description: 点击菜单
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleMenu(type){
				this.currentIndex = ''
				switch (type) {
					case 'bg':
						this.showDiolag = true
						break;
					case 'pic':
						this.handleChoose(type)
						break;
					case 'text':
						this.fontShow = true
						this.font={}
						break;
					case 'save':
						this.creatPoster()
						break;
				
					default:
						break;
				}
			},
			/**
			* @description: 选择文件
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			async handleChoose(type){
				let res = await chooseImgUpload()
				let item = {
						id:this.dragList.length,
						type:'img',
						url:res.msg,
						width:100,
						height:100,
						active:false,
						top:40,
						left:40,
						radius:0,
						rotate:0,
					}
				switch (type) {
					case 'pic':
						this.dragList.push(item)
						break;
					case 'bg':
						this.dragBg.url = res.msg
						break;
				
					default:
						break;
				}
				this.showDiolag = false
			},
			/**
			* @description: 确定文本字体
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleFontConfirm(font){
				this.fontShow = false
				this.font = font
				let item = {
						id:this.dragList.length,
						type:'text',
						text:font.text,
						color: font.color,
						fontSize: font.fontSize,
						textDecoration: font.textDecoration,
						textAlign: font.textAlign,
						fontWeight: font.fontWeight,
						width:200,
						height:50,
						active:false,
						top:40,
						left:40,
						radius:0,
						rotate:0,
					}
					if(this.currentIndex !==''){
						this.dragList.splice(this.currentIndex,1)
					}
					this.dragList.push(item)
			},
			/**
			* @description: 字体大小
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			handleFontSize(type){
				if(type==='add'){
					this.fontSize ++ 
				}else{
					if(this.fontSize>10){
						this.fontSize -- 
					}
				}
			},
			/**
			* @description: 选择模板
			* @param {type} 
			* @return {type} 
			* @author: hch
			*/
			chooseTemp(i){
				this.dragList = this.tempList[i].dragList
				this.dragBg = this.tempList[i].dragBg
				this.showTempDiolag = false
			}
		}
	}
</script>

<style lang="scss">
page{
  position: absolute;
  background-color: #555555;
  padding:0;
  margin: 0;
  box-sizing: border-box;
  height:100%;
  width: 100%;
}
.flex{display: flex;}
.flex.space{justify-content: space-around;}
.ft12{font-size: 12px;}
.mt8{margin-top: 8rpx;}
.image-item{width: 40rpx;height: 40rpx;}
.form-footer-h{
	height: 10%;
	height: calc(140rpx + constant(safe-area-inset-bottom));
	height: calc(140rpx + env(safe-area-inset-bottom));
}
.form-footer{
	width: 100%;
	position: fixed;
	z-index: 10;
	left: 0;
	bottom: 0;
	background: #333333;
	box-shadow:0rpx -4rpx 16rpx 0rpx rgba(0,0,0,0.04);
}
.form-footer-main{
	width: 100%;
	height: 140rpx;
}
.form-footer-item{
	// width: 100%;
	padding: 15px 15px 10px 15px;
	margin: 0 auto;
	background: #333333;
	color:#FFFFFF;
}
.text-center {
	text-align: center;
}
.text-button{
	width: 150rpx;
	height: 40%;
	padding: 5px;
	text-align: center;
	margin-top: 5px;
	margin-right:10px;
	background-color: #007AFF;
	border-radius: 10px;
	color: #FFFFFF;
	font-size: 7rpx;		
}
.head-top{
	width: 100%;
	height:40px;
	position:relative;
	background-color: #333333;
	z-index: 10;
	display: flex;
	justify-content: flex-end;
}
	.content {
		display: block;
		width: 100%;
		height: 100%;
		background: #555555;
		.del-icon{
			width: 60rpx;
			height: 60rpx;
		}
		.bg-img{
			width: 100%;
			height: 85%;
			position: absolute;
		}
		.drag-wrap{
			position: relative;
			.scale-icon{
				position: absolute;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.drag-item{
			position: absolute;
			display: block;
			overflow: hidden;
			word-break:break-all;
			line-height: 1;
			&.active{
				border: 7rpx dashed #fff;
			}
		}
		.canvas{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	.dialog-wrap{
		.choose-wrap{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
		.choose-item{
			display: flex;
			align-items: center;
    	flex-direction: column;
			font-size: 28rpx;
			.img{
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}
		}
		textarea{
			width: 100%;
		}
		.template-wrap{
			height:500rpx;
			overflow: scroll;
			.template-item{
				width: 200rpx;
				margin: 30rpx;
			}
		}
		.editor-wrap{
			.color-wrap{
				display: flex;
				justify-items: center;
				line-height: 1;
				align-items: center;
				margin-bottom: 20rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				.color-btn{
					width: 30px;
					height: 30px;
					margin-right: 20rpx;
					border: 1rpx solid $uni-border-color;
				}
			}
		}
	}

</style>

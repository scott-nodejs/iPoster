<!--
 * @Description: 生成海报组件
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-07 14:48:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-31 18:11:35
 * 保存海报按钮和关闭按钮 在html代码中写出来 绑定点击方法然后透明 再用canvas 覆盖
-->

<template>
  <view
    class="canvas-content"
    v-show="canvasShow"
    :style="'width:' + system.w + 'px; height:' + system.h + 'px;'"
  >
    <!-- 遮罩层 -->
    <view class="canvas-mask"></view>
    <!-- 海报 -->
    <!-- :width="system.w" :height="system.h" 支付宝必须要这样设置宽高才有效果 -->
    <canvas
      class="canvas"
      canvas-id="myCanvas"
      id="myCanvas"
      :style="'width:' + system.w + 'px; height:' + system.h + 'px;'"
      :width="system.w"
      :height="system.h"
    ></canvas>
    <view class="button-wrapper">
      <!-- 保存海报按钮 -->
      <!-- #ifndef MP-QQ -->
      <!-- cover-view 标签qq小程序有问题 -->
      <cover-view class="save-btn" @tap="handleSaveCanvasImage">保存海报</cover-view>
      <cover-view class="save-btn cancel-btn" @tap="handleCanvasCancel">取消</cover-view>
      <!-- #endif -->
      <!-- #ifdef MP-QQ -->
      <view class="save-btn" @tap="handleSaveCanvasImage">保存海报</view>
      <view class="save-btn cancel-btn" @tap="handleCanvasCancel">取消</view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
  import { drawSquarePic, drawTextReturnH, getSystem } from './utils'
  import {upload,add} from '../../utils/apiFunc'
  export default {
    data() {
      return {
        system: {},
        canvasShow: false
      }
    },
    props: {
      posterData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      /**
       * @description: 计算海报背景数据
       * @param {*}
       * @return {*}
       * @author: hch
       */
      poster() {
        let data = this.posterData
        let system = this.system
		console.log(system)
        let posterBg = {
          url: data.dragBg.url,
          r: 10 * system.scale,
          w: data.dragBg.width * system.scale,
          h: data.dragBg.height * system.scale,
          x: (system.w - data.dragBg.width * system.scale) / 2,
          y: (system.h - data.dragBg.height * system.scale) / 2,
          p: 20 * system.scale
        }
        return posterBg
      }
    },
    created() {
      // 获取设备信息
      this.system = getSystem()
    },
    methods: {
      /**
       * @description: 展示海报
       * @param {type}
       * @return {type}
       * @author: hch
       */
      posterShow() {
        this.canvasShow = true
        this.creatPoster()
      },
      /**
       * @description: 生成海报
       * @author: hch
       */
      async creatPoster() {
        uni.showLoading({
          title: '生成海报中...'
        })
        const ctx = uni.createCanvasContext('myCanvas', this)
        this.ctx = ctx
        ctx.clearRect(0, 0, this.system.w, this.system.h) //清空之前的海报
        ctx.draw() //清空之前的海报
        // 根据设备屏幕大小和距离屏幕上下左右距离，及圆角绘制背景
        let poster = this.poster
        // let mainImg = this.mainImg
        // let codeImg = this.codeImg
        // let title = this.title
        await drawSquarePic(ctx, poster.x, poster.y, poster.w, poster.h, poster.r, poster.url)
        // 小程序的名称
        // 长按/扫描识别查看商品
        let y = 0
		let mt = 20;
		let system = this.system
        this.posterData.tips.forEach((element, i) => {
		  if(element.type == 'text'){
			  y = drawTextReturnH(
			    ctx,
			    element.text,
			    element.left*system.scale + this.poster.x,
			    element.top*system.scale + this.poster.y,
			    element.width,
			    element.fontSize ,
			    element.color,
			    10,
			    element.textAlign
			  )
		  }else{
			  drawSquarePic(ctx, element.left*system.scale + this.poster.x, element.top*system.scale+this.poster.y, element.width*system.scale, element.height*system.scale, element.radius, element.url)
		  }
          
        })
        uni.hideLoading()
      },
      /**
       * @description: 保存到系统相册
       * @param {type}
       * @return {type}
       * @author: hch
       */
      handleSaveCanvasImage() {
        uni.showLoading({
          title: '保存中...'
        })
        let _this = this
        // 把画布转化成临时文件
        // #ifndef MP-ALIPAY
        // 支付宝小程序外，其他都是用这个方法 canvasToTempFilePath
        uni.canvasToTempFilePath(
          {
            x: this.poster.x,
            y: this.poster.y,
            width: this.poster.w, // 画布的宽
            height: this.poster.h, // 画布的高
            destWidth: this.poster.w * 5,
            destHeight: this.poster.h * 5,
            canvasId: 'myCanvas',
            success: async function(res) {
              //保存图片至相册
			  // 上传海报
			  let {fileID} = await upload(res.tempFilePath)
			  //存储数据
			  await add({
			  	createTime: Date.now(),
			  	dragBg:_this.posterData.dragBg,
			  	dragList:_this.posterData.tips,
			  	posterImgUrl:fileID
			  })
              // #ifndef H5
              // 除了h5以外的其他端
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                  uni.hideLoading()
                  uni.showToast({
                    title: '图片保存成功，可以去分享啦~',
                    duration: 2000,
                    icon: 'none'
                  })
                  _this.handleCanvasCancel()
                },
                fail() {
                  uni.showToast({
                    title: '保存失败，稍后再试',
                    duration: 2000,
                    icon: 'none'
                  })
                  uni.hideLoading()
                }
              })
              // #endif

              // #ifdef H5
              // h5的时候
              uni.showToast({
                title: '请长按保存',
                duration: 3000,
                icon: 'none'
              })
              _this.handleCanvasCancel()
              _this.$emit('previewImage', res.tempFilePath)
              // #endif
            },
            fail(res) {
              console.log('fail -> res', res)
              uni.showToast({
                title: '保存失败，稍后再试',
                duration: 2000,
                icon: 'none'
              })
              uni.hideLoading()
            }
          },
          this
        )
        // #endif
        // #ifdef MP-ALIPAY
        // 支付宝小程序条件下 toTempFilePath
        this.ctx.toTempFilePath(
          {
            x: this.poster.x,
            y: this.poster.y,
            width: 200, // 画布的宽
            height: 200, // 画布的高
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
                    title: '图片保存成功，可以去分享啦~',
                    duration: 2000,
                    icon: 'none'
                  })
                  _this.handleCanvasCancel()
                },
                fail() {
                  uni.showToast({
                    title: '保存失败，稍后再试',
                    duration: 2000,
                    icon: 'none'
                  })
                  uni.hideLoading()
                }
              })
            },
            fail(res) {
              console.log('fail -> res', res)
              uni.showToast({
                title: '保存失败，稍后再试',
                duration: 2000,
                icon: 'none'
              })
              uni.hideLoading()
            }
          },
          this
        )
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
        this.$emit('cancel', true)
      }
    }
  }
</script>

<style lang="scss">
  .content {
    height: 100%;
    text-align: center;
  }

  .canvas-content {
    position: absolute;
    top: 0;

    .canvas-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .canvas {
      z-index: 12;
    }

    .button-wrapper {
      position: fixed;
      bottom: 140rpx;
      z-index: 16;
      display: flex;
      width: 100%;
      height: 72rpx;
      justify-content: space-around;
    }

    .save-btn {
      z-index: 16;
      width: 30%;
      height: 100%;
      font-size: 30rpx;
      line-height: 72rpx;
      color: #fff;
      text-align: center;
      background: $uni-btn-color;
      border-radius: 45rpx;
      border-radius: 36rpx;
    }

    .cancel-btn {
      color: $uni-btn-color;
      background: #fff;
    }

    .canvas-close-btn {
      position: fixed;
      top: 30rpx;
      right: 0;
      z-index: 12;
      width: 60rpx;
      height: 60rpx;
      padding: 20rpx;
    }
  }
</style>

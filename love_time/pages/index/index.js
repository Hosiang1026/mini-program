// index.js
// 获取应用实例
const app = getApp()
const bgMusic=wx.createInnerAudioContext();
Page({
  data: {
    animationData: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    bgMusic.src="/static/music/love.mp3";
    bgMusic.loop = true;
    this.player();
  },
  onShow(){
  },
   /**
   * 用户点击右上角转发
   */
  onShareAppMessage() {
  },
/**
 * 用户点击右上角分享到朋友圈
 * @param {*} item 
 */
  onShareTimeline() {
  },
  flag:true,
  player(){//背景音乐播放
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin: "50% 0 0"
    })
    
    this.animation = animation
    if (this.flag) {
      bgMusic.play()
      this.flag=false
      animation.rotate(17).step()
     
    } else {
      bgMusic.pause()
      this.flag=true
      animation.rotate(0).step()
    }
    this.setData({
      animationData:animation.export()
    })
  },
  //联系电话
  call(e){
    console.log("新人的联系电话")
    wx.makePhoneCall({
      phoneNumber: '10086',
      success:function(e){
        console.log("成功拨打新郎电话")
      },
      fail:function(e){
        console.log(e)
      },
      
    })
  },
})

// app.js
App({
  onLaunch() {
    this.initAudeo();
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    innerAudioContext: "",
    audioSrcArr: ["/static/music/chunxuqu.mp3","/static/music/newyear.mp3"], // 音频地址
  },
    // 初始化音频信息
    initAudeo() {
      var audioSrc = "";
      if (Math.floor(Math.random() * 10) % 2 == 0) {
        audioSrc = this.globalData.audioSrcArr[0];
      }else{
        audioSrc = this.globalData.audioSrcArr[1];
      }
      this.globalData.innerAudioContext = wx.createInnerAudioContext();
      this.globalData.innerAudioContext.autoplay = true;
      this.globalData.innerAudioContext.src = audioSrc;
      this.globalData.innerAudioContext.loop = true;
    },
    // 播放事件
    audioPlay() {
      this.globalData.innerAudioContext.play();
    },
    // 暂停事件
    audioPause() {
      this.globalData.innerAudioContext.pause();
    },
    // 停止事件
    audioStop() {
      this.globalData.innerAudioContext.stop();
      //销毁该实例
      this.globalData.innerAudioContext.destroy()
    },
    // 结束事件
    audioEnded() {
      this.globalData.innerAudioContext.onEnded();
    }
})
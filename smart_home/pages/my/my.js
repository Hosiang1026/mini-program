// pages/my/my.js
const app = getApp()

const defaultAvatarUrl = ''

Page({
  /**
   * 页面的初始数据
   */
  data: {
    version: '',
    system: '',
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          version: res.version,
          system: res.system,
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
 
})
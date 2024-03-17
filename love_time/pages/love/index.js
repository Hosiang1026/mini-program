
const calendar = require('../../utils/calendar.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperItemList: [
    {
        src: '/static/image/H008.png',
        id: 0
        },
      {
        src: '/static/image/H001.png',
        id: 1
      }
    ],

    // 消息是否点赞
    isStar: false,
    days:0,
    loveDays:0
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.handleLoveDate();
  },

  // 点击‘+’号， 跳转到消息发布界面
  handleOpenPulish() {
    wx.navigateTo({
      url: '/pages/publish_msg/publish_msg'
    })
  },

  // 点击首页的纪念日，跳转到纪念日页面
  handleToAnniversary() {
    wx.switchTab({
      url: '/pages/anniversary/anniversary'
    })
  },

  // 点击图片 进行预览
  handlePreviewImg(e) {
    // 获取到消息区中的所有图片的数组
    const msgImgs = this.data.msgItemList.map(v => v.msg_img);
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: msgImgs
    })
  },

  handleLoveDate: function () {
    //把今日日期转为YYYY-MM-DD的格式 第一天
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDate = date.getDate();
    let nowDate = `${currentYear}-${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${(currentDate) < 10 ? '0' + (currentDate) : (currentDate)}`;

    let loveDate = '2019-03-27';
    //计算差值 下次
    let targetArr = loveDate.split('-');
    let loveMonth = targetArr[1];
    let loveDay = targetArr[2];
    let nextLoveDate = currentYear+'-'+ loveMonth +'-'+loveDay;

    //如果当前日期大于今年纪念日期，则获取下一年的纪念日期
    if (new Date(nowDate) > new Date(nextLoveDate) && new Date(currentYear+1+'-01-01') > new Date(nextLoveDate)){
        nextLoveDate = currentYear+1+'-'+ loveMonth+'-'+loveDay;
    }

    let loveDays = calendar.sumTimeToNow(loveDate, nowDate);
    let days = calendar.diffTimeToDaily(nowDate, nextLoveDate);
    this.setData({
        days:days,
        loveDays: loveDays
      })
  }
})
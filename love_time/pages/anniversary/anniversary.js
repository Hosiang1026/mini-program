// pages/anniversary/anniversary.js
const calendar = require('../../utils/calendar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纪念日数据
    //type: 0 为累计周年(阳历)
    //type: 1 为倒计周年(阳历)
    //type: 2 为倒计周年(阴历)
    //type: 3 为倒计天数(阴历)
    anniversaryList: [
      {
        name: '领证纪念日',
        date: '2021-07-14',
        content: "",
        type: 1
      },
      {
        name: '订婚纪念日',
        date: '2021-12-28',
        content: "",
        type: 2
      },
      {
        name: 'Dad生日',
        date: '1970-02-14',
        content: "",
        type: 3
      },
      {
        name: 'Mon生日',
        date: '1972-01-12',
        content: "",
        type: 3
      },
      {
        name: 'Father生日',
        date: '1969-11-23',
        content: "",
        type: 3
      },
      {
        name: 'Mother生日',
        date: '1971-02-03',
        content: "",
        type: 3
      },
      {
        name: 'Lover生日',
        date: '1995-10-01',
        content: "",
        type: 3
      },
      {
        name: 'Howe生日',
        date: '1992-09-18',
        content: "",
        type: 3
      },
      {
        name: 'Brother生日',
        date: '2000-12-15',
        content: "",
        type: 3
     }
    ]
  },

  // 跳转到添加纪念日的页面
  handleToAddAnniversary() {
    wx.navigateTo({
      url: '/pages/add_anniversary/add_anniversary'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.handleAnniversaryDate();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleAnniversaryDate: function () {
    //把今日日期转为YYYY-MM-DD的格式 第一天
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDate = date.getDate();
    let nowDate = `${currentYear}-${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${(currentDate) < 10 ? '0' + (currentDate) : (currentDate)}`;

    //纪念日/生日
    let anniversaryArr = this.data.anniversaryList;
    if(anniversaryArr.length > 0){
        for (let i = 0; i < anniversaryArr.length; i++) {
            const element = anniversaryArr[i];
            let anniversaryName = element.name;
            let anniversaryDate = element.date;
            let anniversaryType = element.type;
            //计算差值 下次
            let targetArr = anniversaryDate.split('-');
            let anniversaryYear = targetArr[0];
            let anniversaryMonth = targetArr[1];
            let anniversaryDay = targetArr[2];
            let nextAnniversaryDate = currentYear+'-'+ anniversaryMonth+'-'+anniversaryDay;
            //阴历转阳历
            if (anniversaryType == 2 || anniversaryType == 3) {
                nextAnniversaryDate = calendar.conversion(nextAnniversaryDate);
            }
            //如果当前日期大于今年纪念日期，则获取下一年的纪念日期
            if (new Date(nowDate) > new Date(nextAnniversaryDate) && new Date(currentYear+1+'-01-01') > new Date(nextAnniversaryDate)){
                nextAnniversaryDate = currentYear+1+'-'+ anniversaryMonth+'-'+anniversaryDay;
                //阴历转阳历
                if (anniversaryType == 2 || anniversaryType == 3) {
                    nextAnniversaryDate = calendar.conversion(nextAnniversaryDate);
                }
            }

            if (nowDate == nextAnniversaryDate) {
                if (anniversaryType == 0 ||anniversaryType == 1 ||anniversaryType == 2) {
                    let diffYear = currentYear - anniversaryYear;
                    let todayContent = ' ' + diffYear+'周年';
                    element.content = '今天是' + anniversaryName+ todayContent;
                }
                if (anniversaryType == 3) {
                    //获取生日星座
                    let anniversaryAstro = lunarDate.astro;
                    let todayDate = '<'+anniversaryDate.split('-').join('.')+'>';
                    let todayAge = currentYear - anniversaryYear;
                    let todayContent = todayAge + '岁' + anniversaryAstro + todayDate;
                    element.content = '今天是' + anniversaryName + todayContent;
                }
            }

            let diffTime = calendar.diffTimeToDaily(nowDate, nextAnniversaryDate);
            if (anniversaryType == 1||anniversaryType == 2) {
                element.content = '距离最近的纪念日还有' + diffTime+ '天';
            }
            
            if (anniversaryType == 3) {
                element.content = '距离最近的生日还有' + diffTime+ '天';
            }
        }
        this.setData({
          anniversaryList: anniversaryArr
        })
    }
  }
})
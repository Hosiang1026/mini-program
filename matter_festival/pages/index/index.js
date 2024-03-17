// index.js
// 引用全局公共js
const app = getApp(); 
const daily = require('../../utils/daily.js')
const calendar = require('../../utils/calendar.js')

/**
 * 页面的初始数据
 */
Page({
  data: {
    items:[],
    client: {},
    todaySolar: "", //当天阴历日期
    todayLunar: "", //当天阳历日期
    yearDiffTime: "", //今年农历天数
    todayFestival: "今天是除夕", //今天的节日
    legalDate: "", //法定节假日
    sFtvDate: "", //阳历节日
    lFtvDate: "", //阴历节日
    termDate: "",       // 二十四节气列表
    specialDate: "",      // 特殊节日列表
    text: "💘今宵是除夕，明日又新年。爆竹惊残梦，寒镫照独眠。风霜催腊尽，梅柳得春先。抚景情无限，那能不怅然。",
    // 轮播图数据
    swiperItemList: [
      {
          src: '/static/images/newyear.jpg',
          id: 0
          },
        {
          src: '/static/images/guoqing.jpg',
          id: 1
        }
      ],
    marqueePace: 1,//滚动速度
    marqueeDistance: 10,//初始滚动距离
    marquee_margin: 30,
    size:15,
    interval: 60 // 时间间隔
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    this.scrolltxt();// 第一个字消失后立即从右边出现

    this.handleTimeList();
    // 播放事件
    app.audioPlay();
  },
  onShow: function () {
  },
 
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth){
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else{
      that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
    } 
  },
  //阴历春节
  handleSpringFestivalDate: function (nowDate, pre2FullYear, preFullYear, nextFullYear) {
    var that = this;
    let FinlFtvSolarDate = new Date();
    let ReslFtvSolarDate = new Date();

    //往前推两年的春节2022
    let lFtvYearPre2Date = pre2FullYear + '-' + '12-30';
    let lFtvSolarPre2Date = calendar.conversion(lFtvYearPre2Date);

    //上一年的春节2023
    let lFtvYearPreDate = preFullYear + '-' + '12-30';
    let lFtvSolarPreDate = calendar.conversion(lFtvYearPreDate);

    //本年的春节2024
    let date = new Date(nowDate);
    let lFtvYearDate = date.getFullYear() + '-' + '12-30';
    let lFtvSolarDate = calendar.conversion(lFtvYearDate);

    //下一年的春节2025
    let lFtvYearNextDate = nextFullYear + '-' + '12-30';
    let lFtvSolarNextDate = calendar.conversion(lFtvYearNextDate);

    //当前时间小于等于往前推两年的春节
    if(date <= new Date(lFtvSolarPre2Date)){
      ReslFtvSolarDate = lFtvSolarPre2Date;
    }
    //当前时间>往前推两年的春节 并且 <=上一年的春节
    if(date > new Date(lFtvSolarPre2Date)&&date <= new Date(lFtvSolarPreDate)){
      //获取刚过完的春节
      FinlFtvSolarDate = lFtvSolarPre2Date;
       //获取即将到来的春节
      ReslFtvSolarDate = lFtvSolarPreDate;
    }
    //当前时间>上一年的春节 并且 <=本年的春节
    if(date > new Date(lFtvSolarPreDate)&&date <= new Date(lFtvSolarDate)){
      //获取刚过完的春节
      FinlFtvSolarDate = lFtvSolarPreDate;
      //获取即将到来的春节
      ReslFtvSolarDate = lFtvSolarDate;
    }
    //当前时间>本年的春节 并且 <=下一年的春节
    if(date > new Date(lFtvSolarDate)&&date <= new Date(lFtvSolarNextDate)){
      //获取刚过完的春节
      FinlFtvSolarDate = lFtvSolarDate;
      //获取即将到来的春节
      ReslFtvSolarDate = lFtvSolarNextDate;
    }

    //计算差值
    let yearDiffTime = calendar.diffTimeToDaily(nowDate, FinlFtvSolarDate);
    let diffTime = calendar.diffTimeToDaily(nowDate, ReslFtvSolarDate);

    if (diffTime > 0) {
      var todayFestivalStr = `距离除夕还有${diffTime}天`;
    }

    that.setData({
      yearDiffTime: yearDiffTime,
      todayFestival: todayFestivalStr
    })
  }, 
  //特殊节日
  handleSpecialDate: function (nowDate) {
    var that = this;
    let date = new Date();
    let currentYear = date.getFullYear();
    let specialArr = daily.special;
    if(specialArr.length > 0){
        let tempName = '';
        let tempTime = 0;
        for (let i = 0; i < specialArr.length; i++) {
            const element = specialArr[i];
            let specialName = element.name;
            let specialDate = element.date;
            let targetArr = specialDate.split('/');
            let specialMonth = targetArr[0];
            let specialWeek = targetArr[1];
            let specialNums = targetArr[2];
            let specialSolarDate = calendar.conversionParentDate(currentYear, specialMonth, specialWeek, specialNums);
            let nextSpecialSolarDate = specialSolarDate;
            if (new Date(nowDate) > new Date(nextSpecialSolarDate)){
                nextSpecialSolarDate = calendar.conversionParentDate(currentYear+1, specialMonth, specialWeek, specialNums);
            }
            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, nextSpecialSolarDate);
            if (nowDate == nextSpecialSolarDate) {
                var todayFestivalStr = `今天是${specialName}🎉`;
                that.setData({
                  todayFestival: todayFestivalStr
                })
            }else{
                if (tempTime == 0){
                    tempName = specialName;
                    tempTime = diffTime;
                }else if (diffTime < tempTime){
                    tempName = specialName;
                    tempTime = diffTime;
                }
            }
        }
        var specialDateStr = `${tempName}: 还有${tempTime}天`;
        return specialDateStr;
    }
  },
  //二十四节气
  handleTermDate: function (preNowDate, nowDate) {
    var that = this;
    let tempName = '';
    let tempTime = 0;
    let tempSort = 0;
    let termArr = daily.term;
    if(termArr.length > 0){
      //上一年
       let date = new Date(preNowDate);
       let currentYear = date.getFullYear();
       let currentMonth = date.getMonth();
        for (let i = 0; i < termArr.length; i++) {
            const element = termArr[i];
            let termSort = element.sort;
            let termName = element.name;
            let termMonth = element.month;
            let termSolarDate = calendar.conversionTerm(currentYear, termMonth, termSort+2);
            if(termSort == 23 || termSort == 24){
              if(currentMonth == 0||currentMonth == 11||currentMonth == 12){
                termSolarDate = calendar.conversionTerm(currentYear+1, termMonth, termSort);
              }
            }
            let nextTermSolarDate = termSolarDate;
            if (new Date(nowDate) < new Date(nextTermSolarDate)){
            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, nextTermSolarDate);
            if (diffTime == 0) {
                var todayFestivalStr = `今天是${termName}🎉`;
                that.setData({
                  todayFestival: todayFestivalStr
                })
            }else{
                if (tempTime == 0){
                    tempSort = termSort;
                    tempName = termName;
                    tempTime = diffTime;
                }else if (diffTime < tempTime){
                    tempSort = termSort;
                    tempName = termName;
                    tempTime = diffTime;
                }
            }
          }
        }
        //本年
        date = new Date();
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
        for (let i = 0; i < termArr.length; i++) {
          const element = termArr[i];
          let termSort = element.sort;
          let termName = element.name;
          let termMonth = element.month;
          let termSolarDate = calendar.conversionTerm(currentYear, termMonth, termSort+2);
          if(termSort == 23 || termSort == 24){
            if(currentMonth == 0||currentMonth == 11||currentMonth == 12){
              termSolarDate = calendar.conversionTerm(currentYear+1, termMonth, termSort);
            }
          }
          let nextTermSolarDate = termSolarDate;
          if (new Date(nowDate) > new Date(nextTermSolarDate)){
              nextTermSolarDate = calendar.conversionTerm(currentYear+1, termMonth, termSort);
          }
          //计算差值
          let diffTime = calendar.diffTimeToDaily(nowDate, nextTermSolarDate);
          if (diffTime == 0) {
              var todayFestivalStr = `今天是${termName}🎉`;
              that.setData({
                todayFestival: todayFestivalStr
              })
          }else{
              if (tempTime == 0){
                  tempSort = termSort;
                  tempName = termName;
                  tempTime = diffTime;
              }else if (diffTime < tempTime){
                  tempSort = termSort;
                  tempName = termName;
                  tempTime = diffTime;
              }
          }
      }

        tempName = '第'+tempSort+'个节气'+tempName;
        var termDateStr = `${tempName}: 还有${tempTime}天`;
        return termDateStr;
    }
  },
  //阴历节日
  handlelFtvDate: function (nowDate, preFullYear, nextFullYear) {
    var that = this;
    let lFtvArr = daily.lFtv;
    if(lFtvArr.length > 0){
        let tempName = '';
        let tempTime = 0;
        //上一年
        for (let i = 0; i < lFtvArr.length; i++) {
            const element = lFtvArr[i];
            let lFtvName = element.name;
            let lFtvDate = element.date;
            let lFtvYearDate = preFullYear + '-' + lFtvDate;
            let lFtvSolarDate = calendar.conversion(lFtvYearDate);
            let nextlFtvSolarDate = lFtvSolarDate;

            if (new Date(nowDate) < new Date(nextlFtvSolarDate)){
              //计算差值
              let diffTime = calendar.diffTimeToDaily(nowDate, nextlFtvSolarDate);
              if (diffTime == 0) {
                  var todayFestivalStr = `今天是${lFtvName}🎉`;
                  that.setData({
                    todayFestival: todayFestivalStr
                  })
              }else{
                  if (tempTime == 0){
                      tempName = lFtvName;
                      tempTime = diffTime;
                  }else if (diffTime < tempTime){
                      tempName = lFtvName;
                      tempTime = diffTime;
                  }
              }
          }
        }
        //本年
        let date = new Date(nowDate);
        let currentYear = date.getFullYear();
        for (let i = 0; i < lFtvArr.length; i++) {
          const element = lFtvArr[i];
          let lFtvName = element.name;
          let lFtvDate = element.date;
          let lFtvYearDate = currentYear + '-' + lFtvDate;
          let lFtvSolarDate = calendar.conversion(lFtvYearDate);
          let targetArr = lFtvSolarDate.split('-');
          let nextlFtvSolarDate = lFtvSolarDate;
          if (new Date(nowDate) > new Date(nextlFtvSolarDate)){
              nextlFtvSolarDate = currentYear + 1+'-'+ targetArr[1]+'-'+targetArr[2];
          }
          //计算差值
          let diffTime = calendar.diffTimeToDaily(nowDate, nextlFtvSolarDate);
          if (diffTime == 0) {
              var todayFestivalStr = `今天是${lFtvName}🎉`;
              that.setData({
                todayFestival: todayFestivalStr
              })
          }else{
              if (tempTime == 0){
                  tempName = lFtvName;
                  tempTime = diffTime;
              }else if (diffTime < tempTime){
                  tempName = lFtvName;
                  tempTime = diffTime;
              }
          }
      }

      //下一年
      for (let i = 0; i < lFtvArr.length; i++) {
        const element = lFtvArr[i];
        let lFtvName = element.name;
        let lFtvDate = element.date;
        let lFtvYearDate = nextFullYear + '-' + lFtvDate;
        let lFtvSolarDate = calendar.conversion(lFtvYearDate);
        let targetArr = lFtvSolarDate.split('-');
        let nextlFtvSolarDate = lFtvSolarDate;
        if (new Date(nowDate) > new Date(nextlFtvSolarDate)){
            nextlFtvSolarDate = nextFullYear + 1+'-'+ targetArr[1]+'-'+targetArr[2];
        }
        //计算差值
        let diffTime = calendar.diffTimeToDaily(nowDate, nextlFtvSolarDate);
        if (diffTime == 0) {
            var todayFestivalStr = `今天是${lFtvName}🎉`;
            that.setData({
              todayFestival: todayFestivalStr
            })
        }else{
            if (tempTime == 0){
                tempName = lFtvName;
                tempTime = diffTime;
            }else if (diffTime < tempTime){
                tempName = lFtvName;
                tempTime = diffTime;
            }
        }
    }
        var lFtvDateStr = `${tempName}: 还有${tempTime}天`;
        return lFtvDateStr;
    }
  },
  //阳历节日
  handlesFtvDate: function (nowDate) {
    var that = this;
    let tempName = '';
    let tempTime = 0;
    let date = new Date(nowDate);
    let currentYear = date.getFullYear();
    let sFtvArr = daily.sFtv;
    if(sFtvArr.length > 0){
        for (let i = 0; i < sFtvArr.length; i++) {
            const element = sFtvArr[i];
            let sFtvName = element.name;
            let sFtvDate = element.date;
            let targetArr = sFtvDate.split('-');
            let nextSFtvDate = currentYear+'-'+ targetArr[0]+'-'+targetArr[1];
            if (new Date(nowDate) > new Date(nextSFtvDate)){
                nextSFtvDate = currentYear+1+'-'+ targetArr[0]+'-'+targetArr[1];
            }
            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, nextSFtvDate);
            if (nowDate == nextSFtvDate) {
                var todayFestivalStr = `今天是${sFtvName}🎉`;
                that.setData({
                  todayFestival: todayFestivalStr
                })
            }else{
                if (tempTime == 0){
                    tempName = sFtvName;
                    tempTime = diffTime;
                }else if (diffTime < tempTime){
                    tempName = sFtvName;
                    tempTime = diffTime;
                }
            }
        }
        var sFtvDateStr = `${tempName}: 还有${tempTime}天`;
        return sFtvDateStr;
    }
  },

  //法定节假日
  handleLegalDate: function (nowDate) {
    var that = this;
    let tempName = '';
    let tempTime = 0;
    let tipContentStr = "";
      let legalArr = daily.legal;
      if(legalArr.length > 0){
        let date = new Date(nowDate);
        let currentYear = date.getFullYear();
        for (let i = 0; i < legalArr.length; i++) {
            const element = legalArr[i];
            let legalName = element.name;
            let legalDate = element.date;
            let legalHoliday = element.holiday;
            let legalRepair = element.repair;
            //计算差值
            let targetArr = legalDate.split('-');
            let currentYearBar = currentYear + '-';
            let nextLegalDate = currentYearBar + targetArr[0] + '-' + targetArr[1];
            if (new Date(nowDate) > new Date(nextLegalDate)) {
                nextLegalDate = currentYear + 1 + '-' + targetArr[0] + '-' + targetArr[1];
            }
            let diffTime = calendar.diffTimeToDaily(nowDate, nextLegalDate);
            if (diffTime == 0) {
                var todayFestivalStr = `今天是${legalName}🎉`;
                that.setData({
                  todayFestival: todayFestivalStr
                })
            } else {
                if (tempTime == 0) {
                    tempName = legalName;
                    tempTime = diffTime;
                } else if (diffTime < tempTime&&diffTime > 14) {
                    tempName = legalName;
                    tempTime = diffTime;
                }
            }
            let startYearLegalDate = nowDate;
            let endYearLegalDate = nowDate;
            let startLegalHoliday = legalHoliday[0];
            let endLegalHoliday = legalHoliday[legalHoliday.length - 1];
            let legalHolidayNum = legalHoliday.length;
            
            //放假中
            if (diffTime < legalHolidayNum) {
              tipContentStr = tipContentStr +`祝大家${legalName}假期愉快！ `;
              tipContentStr = tipContentStr +`（ `;
              let legalHolidayNum = legalHoliday.length;
              if (legalHolidayNum > 2){
                tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
              }else{
                tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
              }
              if (legalRepair != 0) {
                let legalRepairNum = legalRepair.length;
                tipContentStr = tipContentStr +`📟补班${legalRepairNum}天：${legalRepair.join('、')} `;
            }
              tipContentStr = tipContentStr +`）`;
            }
            //放假前的15天内
            if (diffTime > legalHolidayNum && diffTime < 15) {
                //放假天数为1
                if (legalHolidayNum == 1) {
                    startYearLegalDate = currentYearBar + startLegalHoliday;
                    if (legalRepair != 0) {
                        let legalRepairNum = legalRepair.length;
                        tipContentStr = tipContentStr + `📟补班${legalRepairNum}天：${legalRepair.join('、')}`;
                    }

                    if (legalHolidayNum > 2){
                      tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                    }else{
                      tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                    }
                } else {
                    startYearLegalDate = currentYearBar + startLegalHoliday;
                    endYearLegalDate = currentYearBar + endLegalHoliday;
                      let startDiffTime = calendar.diffTimeToDaily(nowDate, startYearLegalDate);
                      if (startDiffTime > 0){
                        tipContentStr = tipContentStr +`⏳距离${legalName}开始放假：还有${startDiffTime}天 `;
                        tipContentStr = tipContentStr +`（ `;
                          if (legalRepair != 0) {
                              let legalRepairNum = legalRepair.length;
                              tipContentStr = tipContentStr +`📟补班${legalRepairNum}天：${legalRepair.join('、')} `;
                          }
                          let legalHolidayNum = legalHoliday.length;
                          if (legalHolidayNum > 2){
                            tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                          }else{
                            tipContentStr = tipContentStr +`⛱假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                          }
                          tipContentStr = tipContentStr +`）`;
                      }
                }
            }
        }

          if(tipContentStr.length>0){
            tipContentStr =  ` 温馨提示：` + tipContentStr;
            that.setData({
              text: tipContentStr
            })
          }
          var legalDateStr = `${tempName}: 还有${tempTime}天`;
          return legalDateStr;
        }
  },
  handleTimeList: function () {
      var resultArr = [];
      //内容数组
      var that = this;
      //把今日日期转为YYYY-MM-DD的格式
      let date = new Date();
      let currentYear = date.getFullYear();
      let currentMonth = date.getMonth();
      let currentDate = date.getDate();
      let nowDate = `${currentYear}-${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${(currentDate) < 10 ? '0' + (currentDate) : (currentDate)}`;

      let preNowDate = `${currentYear -1}-${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${(currentDate) < 10 ? '0' + (currentDate) : (currentDate)}`;

      let lunarDate = calendar.solar2lunar(currentYear, currentMonth, currentDate);
      let solarDateStr = `${nowDate} ${lunarDate.ncWeek} ${lunarDate.astro} \n`

      //解决跨年问题，往过去推两年
      let pre2FullYear = `${currentYear - 2}`;

      //解决跨年问题，往过去推一年
      let preFullYear = `${currentYear - 1}`;

      //解决跨年问题，下一年
      let nextFullYear = `${currentYear + 1}`;

      //阴历春节
      this.handleSpringFestivalDate(nowDate, pre2FullYear, preFullYear, nextFullYear);

      let yearDiffTime = that.data.yearDiffTime;
      let lunarDateStr = lunarDate.Animal +'年' +'•'+ lunarDate.gzYear +'年'+ lunarDate.IMonthCn + lunarDate.IDayCn + ' 第' + yearDiffTime + '天';

      //法定节假日
      var legalDateStr = this.handleLegalDate(nowDate);
      //阳历节日
      var sFtvDateStr = this.handlesFtvDate(nowDate);
      //阴历节日
      var lFtvDateStr  = this.handlelFtvDate(nowDate, preFullYear, nextFullYear); 
      //二十四节气
      var termDateStr  = this.handleTermDate(preNowDate, nowDate); 
      //特殊节日
      var specialDateStr  = this.handleSpecialDate(nowDate); 
      
      //法定节假日
      resultArr.push(legalDateStr); 
      //阳历节日
      resultArr.push(sFtvDateStr);
      //阴历节日
      resultArr.push(lFtvDateStr);
      //二十四节气
      resultArr.push(termDateStr);
      //特殊节日
      resultArr.push(specialDateStr);
      //数组排序
      resultArr.sort((a, b) => a.length - b.length);

      that.setData({
        items: resultArr,
        todaySolar: solarDateStr,    //当天阴历日期
        todayLunar: lunarDateStr     //当天阳历日期
      })

  }
})

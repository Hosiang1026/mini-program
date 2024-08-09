// index.js
// 引用全局公共js
const app = getApp(); 
const util = require('../../utils/util.js')
const daily = require('../../utils/daily.js')
const calendar = require('../../utils/calendar.js')
var todayFestivalTemp = ""; 
/**juli
 * 页面的初始数据
 */
Page({
  data: {
    items:[],
    client: {},
    todaySolar: "", //当天阴历日期
    todayLunar: "", //当天阳历日期
    yearDiffTime: "", //今年农历天数
    diffTime: "", //距离除夕天数
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
    this.handleTimeList();
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    this.scrolltxt();// 第一个字消失后立即从右边出现
    // 播放事件
    app.audioPlay();
    //定时刷新
    setInterval(function() {
      that.onShow();
    }, 5000);
  },

  //页面显示数据更新
  onShow: function () {
    //每日凌晨刷新页面
    var date=new Date();
    //获取当前时分
    var now_time=date.getHours()+":"+(date.getMinutes()<9?'0'+date.getMinutes():date.getMinutes());
    var end_time = '00:02';
    var now_time_s = now_time.split(":");
    var end_time_s = end_time.split(":");
    //当前时间小于指定时间
    if(date.setHours(now_time_s [0],now_time_s [1])<date.setHours(end_time_s [0],end_time_s [1])){
      this.handleTimeList();
    }
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
  //周末提示
  handWeekTipDate: function (lunarDate) {
    var that = this;
    if(lunarDate.ncWeek == '星期六'||lunarDate.ncWeek == '星期日'){
      var tipContentStr =  ` 🎈今日限定开心，祝大家周末愉快！`;
      let tipText = that.data.text;
      if(tipText.length > 0 ){
        if (tipText.includes('放假第')||tipText.includes('努力工作')) {
            return;
        }
        // 检查字符串是否包含 '温馨提示：'
        if (tipText.includes('温馨提示：')) {
          // 移除 '温馨提示：' 前缀
          let newTipText = tipText.replace('温馨提示：', '');
          tipContentStr =  ` 温馨提示：` + tipContentStr +  `  ` + newTipText;
        }
      }else{
        tipContentStr =  ` 温馨提示：` + tipContentStr;
      }
      that.setData({
        text: tipContentStr
      })
    }
  },
  //阴历春节
  handleSpringFestivalDate: function (nowDate) {
    var that = this;
    let date = new Date(nowDate);
    let currentYear = date.getFullYear();
    let festivalDate = '01-01';

    //N-2年
    let pre2FestivalDate = (currentYear-2) + '-' + festivalDate;
    let pre2FestivalSolarDate = calendar.conversion(pre2FestivalDate);
    let newlFtvYearDate = pre2FestivalSolarDate;
    let yearCount = calendar.lYearDays(currentYear-2);

    //N-1年
    let preFestivalDate = (currentYear-1) + '-' + festivalDate;
    let preFestivalSolarDate = calendar.conversion(preFestivalDate);
    if (new Date(nowDate) >= new Date(preFestivalSolarDate)){
      newlFtvYearDate = preFestivalSolarDate;
      yearCount = calendar.lYearDays(currentYear-1);
    }

    //N年
    let curFestivalDate = currentYear + '-' + festivalDate;
    let curFestivalSolarDate = calendar.conversion(curFestivalDate);
    if (new Date(nowDate) >= new Date(curFestivalSolarDate)){
      newlFtvYearDate = curFestivalSolarDate;
      yearCount = calendar.lYearDays(currentYear);
    }

    //N+1年
    let nextFestivalDate = (currentYear+1) + '-' + festivalDate;
    let nextFestivalSolarDate = calendar.conversion(nextFestivalDate);
    if (new Date(nowDate) >= new Date(nextFestivalSolarDate)){
      newlFtvYearDate = nextFestivalSolarDate;
      yearCount = calendar.lYearDays(currentYear+1);
    }

    //N+2年
    let next2FestivalDate = (currentYear+2) + '-' + festivalDate;
    let next2FestivalSolarDate = calendar.conversion(next2FestivalDate);
    if (new Date(nowDate) >= new Date(next2FestivalSolarDate)){
      newlFtvYearDate = next2FestivalSolarDate;
      yearCount = calendar.lYearDays(currentYear+2);
    }

    //当前天数
    let yearDiffTime = calendar.diffTimeToDaily(nowDate, newlFtvYearDate)+1;
    //除夕天数 = 年总天数 - 当前天数
    let diffTime = yearCount - yearDiffTime;

    if (diffTime > 0) {
      var todayFestivalStr = `距离除夕${diffTime}天`;
    }else{
      var tipContentStr =  ` 温馨提示：💘在这辞旧迎新的夜晚，万家灯火通明，喜悦满怀，家人团圆，其乐融融，共享温馨时光，除夕快乐，阖家幸福，愿您新年如意，梦想成真！`;
      that.setData({
         text: tipContentStr
      })
    }

    that.setData({
      diffTime: diffTime,
      yearDiffTime: yearDiffTime,
      todayFestival: todayFestivalStr
    })
  }, 
  //特殊节日
  handleSpecialDate: function (nowDate) {
    var that = this;
    let date = new Date(nowDate);
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
              if(todayFestivalTemp == ""){
                todayFestivalTemp = `今天是${specialName}`;
              }else{
                todayFestivalTemp = todayFestivalTemp + `和${specialName}`
              }
                that.setData({
                  todayFestival: todayFestivalTemp+ `🎉`
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
  handleTermDate: function (nowDate) {
    var that = this;
    let tempName = '';
    let tempTime = 0;
    let tempSort = 0;
    let termArr = daily.term;
    if(termArr.length > 0){
       let date = new Date(nowDate);
       let currentYear = date.getFullYear();
       //let currentMonth = date.getMonth();
       let tipContentStr = "";
       let preTermDescribe = "";
        for (let i = 0; i < termArr.length; i++) {
            const element = termArr[i];
            let termSort = element.sort;
            let termName = element.name;
            let termMonth = element.month;
            if (i > 0) {
              preTermDescribe = termArr[i - 1].describe;
            } else {
              preTermDescribe = termArr[termArr.length - 1].describe;
            }

            //特殊处理
            let termSortStr;
            if(termSort <= 22){
              termSortStr = termSort + 2;
            }else{
              termSortStr = termSort - 22;
            }

            //if(termSort == 21 || termSort == 22){
              //if(currentMonth == 0||currentMonth == 11||currentMonth == 12){
               //termSortStr = termSort;
              //}
           //}
            
            //N+1年
            let nextTermSolarDate = calendar.conversionTerm(currentYear+1, termMonth, termSortStr);
            let resTermSolarDate = nextTermSolarDate;

            //N年
            let curTermSolarDate = calendar.conversionTerm(currentYear, termMonth, termSortStr);
            if (new Date(nowDate) <= new Date(curTermSolarDate)){
                resTermSolarDate = curTermSolarDate;
            }

            //N-1年
            let preTermSolarDate = calendar.conversionTerm(currentYear-1, termMonth, termSortStr);
            if (new Date(nowDate) <= new Date(preTermSolarDate)){
                resTermSolarDate = preTermSolarDate;
            }

            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, resTermSolarDate);
            if (diffTime == 0) {
              if(todayFestivalTemp == ""){
                todayFestivalTemp = `今天是${termName}`;
              }else{
                todayFestivalTemp = todayFestivalTemp + `和${termName}`
              }
              that.setData({
                todayFestival: todayFestivalTemp + `🎉`
              })
            }else{
                if (tempTime == 0){
                    tempSort = termSort;
                    tempName = termName;
                    tempTime = diffTime;
                    tipContentStr = preTermDescribe;
                }else if (diffTime < tempTime){
                    tempSort = termSort;
                    tempName = termName;
                    tempTime = diffTime;
                    tipContentStr = preTermDescribe;
                }
            }
        }

        tempName = '第'+tempSort+'个节气'+tempName;
        var termDateStr = `${tempName}: 还有${tempTime}天`;
        if(tipContentStr.length>0){
          tipContentStr =  ` 温馨提示：` + tipContentStr;
          that.setData({
             text: tipContentStr
          })
        }
        return termDateStr;
    }
  },
  //阴历节日
  handlelFtvDate: function (nowDate) {
    var that = this;
    let lFtvArr = daily.lFtv;
    if(lFtvArr.length > 0){
        let tempName = '';
        let tempTime = 0;
        let date = new Date(nowDate);
        let currentYear = date.getFullYear();
        for (let i = 0; i < lFtvArr.length; i++) {
            const element = lFtvArr[i];
            let lFtvName = element.name;
            let lFtvDate = element.date;

            //N+1年
            let nextlFtvYearDate = (currentYear+1) + '-' + lFtvDate;
            let nextlFtvSolarDate = calendar.conversion(nextlFtvYearDate);
            let reslFtvSolarDate = nextlFtvSolarDate;

            //N年
            let curlFtvYearDate = currentYear + '-' + lFtvDate;
            let curlFtvSolarDate = calendar.conversion(curlFtvYearDate);
            if (new Date(nowDate) <= new Date(curlFtvSolarDate)){
                reslFtvSolarDate = curlFtvSolarDate;
            }

            //N-1年
            let prelFtvYearDate = (currentYear-1) + '-' + lFtvDate;
            let prelFtvSolarDate = calendar.conversion(prelFtvYearDate);
            if (new Date(nowDate) <= new Date(prelFtvSolarDate)){
                reslFtvSolarDate = prelFtvSolarDate;
            }

            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, reslFtvSolarDate);
            if (diffTime == 0) {
                if(todayFestivalTemp == ""){
                  todayFestivalTemp = `今天是${lFtvName}`;
                }else{
                  todayFestivalTemp = todayFestivalTemp + `和${lFtvName}`
                }
                that.setData({
                  todayFestival: todayFestivalTemp + `🎉`
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
                if(todayFestivalTemp == ""){
                  todayFestivalTemp = `今天是${sFtvName}`;
                }else{
                  todayFestivalTemp = todayFestivalTemp + `和${sFtvName}`
                }
                that.setData({
                  todayFestival: todayFestivalTemp + `🎉`
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
  handleLegalDate: function (nowDate, currentMDDate) {
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
            //补班或放假提示
            var existHoliday = false;
            if(legalHoliday != 0){
              existHoliday = legalHoliday.includes(currentMDDate);
              if(existHoliday){
                let holidayFrist =currentYear + '-'+ legalHoliday[0];
                let holidayDiff = calendar.sumTimeToNow(holidayFrist, nowDate);
                tipContentStr = tipContentStr +`⛱${legalName}放假第${holidayDiff+1}天，祝大家假期愉快！ `;
              }
            }
            if(legalRepair != 0){
              let existRepair = legalRepair.includes(currentMDDate);
              if(existRepair){
              tipContentStr = tipContentStr +`📟今天${legalName}补班，努力工作！ `;
              }
            }

            //计算差值
            let targetArr = legalDate.split('-');
            let currentYearBar = currentYear + '-';
            let nextLegalDate = currentYearBar + targetArr[0] + '-' + targetArr[1];
            if (new Date(nowDate) > new Date(nextLegalDate)) {
                nextLegalDate = currentYear + 1 + '-' + targetArr[0] + '-' + targetArr[1];
            }
            let diffTime = calendar.diffTimeToDaily(nowDate, nextLegalDate);
            if (diffTime == 0) {
              if(todayFestivalTemp == ""){
                todayFestivalTemp = `今天是${legalName}`;
              }else{
                todayFestivalTemp = todayFestivalTemp + `和${legalName}`
              }
              that.setData({
                todayFestival: todayFestivalTemp + `🎉`
              })
            } else {
                if (tempTime == 0) {
                    tempName = legalName;
                    tempTime = diffTime;
                } else if (diffTime < tempTime&&diffTime > 0) {
                    tempName = legalName;
                    tempTime = diffTime;
                }
            }
            let startYearLegalDate = nowDate;
            let endYearLegalDate = nowDate;
            let startLegalHoliday = legalHoliday[0];
            let endLegalHoliday = legalHoliday[legalHoliday.length - 1];
            let legalHolidayNum = legalHoliday.length;
            //放假前的15天内
            if (diffTime+legalHolidayNum < 15) {
                //放假天数为1
                if (legalHolidayNum == 1) {
                    startYearLegalDate = currentYearBar + startLegalHoliday;
                    if (legalRepair != 0) {
                        let legalRepairNum = legalRepair.length;
                        tipContentStr = tipContentStr + `补班${legalRepairNum}天：${legalRepair.join('、')}`;
                    }

                    if (legalHolidayNum > 2){
                      tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                    }else{
                      tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                    }
                } else if(!existHoliday){
                    startYearLegalDate = currentYearBar + startLegalHoliday;
                    endYearLegalDate = currentYearBar + endLegalHoliday;
                      let startDiffTime = calendar.diffTimeToDaily(nowDate, startYearLegalDate);
                      if (startDiffTime > 0){
                        tipContentStr = tipContentStr +`⏳距离${legalName}放假还有${startDiffTime}天 `;
                        tipContentStr = tipContentStr +`（ `;
                          if (legalRepair != 0) {
                              let legalRepairNum = legalRepair.length;
                              tipContentStr = tipContentStr +`补班${legalRepairNum}天：${legalRepair.join('、')} `;
                          }
                          let legalHolidayNum = legalHoliday.length;
                          if (legalHolidayNum > 2){
                            tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                          }else{
                            tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                          }
                          tipContentStr = tipContentStr +`）`;
                      }
                }
            }
        }

          if(tipContentStr.length>0){
            let tipText = that.data.text;
            if(tipText.length > 0 ){
              // 检查字符串是否包含 '温馨提示：'
              if (tipText.includes('温馨提示：')) {
                // 移除 '温馨提示：' 前缀
                let newTipText = tipText.replace('温馨提示：', '');
                tipContentStr =  ` 温馨提示：` + tipContentStr +  `  ` + newTipText;
              }
            }else{
              tipContentStr =  ` 温馨提示：` + tipContentStr;
            }
            that.setData({
              text: tipContentStr
            })
          }
          var legalDateStr = `${tempName}: 还有${tempTime}天`;
          return legalDateStr;
        }
  },
  //梅雨季
  handleMeiYuDate: function (nowDate) {
    var that = this;
    var date = new Date(nowDate);
    var currentYear = date.getFullYear();

    //芒种日期
    var mangZhongDate = calendar.conversionTerm(currentYear, "06", 11);
    //小暑日期
    var xiaoshuDate = calendar.conversionTerm(currentYear, "07", 13);
    //计算梅雨季的开始日期、结束日期和持续天数
    var meiYuSeason = calendar.calculateMeiYuSeason(currentYear, new Date(mangZhongDate), new Date(xiaoshuDate));

    if (meiYuSeason) {
        let tipContentStr = "";
        var meiYuStartDateStr = util.formatDate(meiYuSeason.startDate);
        var meiYuEndDateStr = util.formatDate(meiYuSeason.endDate);
        let diffTime = calendar.diffTimeToDaily(nowDate, meiYuStartDateStr);

        if(date >= meiYuSeason.startDate&& date <= meiYuSeason.endDate){
          let meiYudays = calendar.sumTimeToNow(meiYuStartDateStr, nowDate);
          let meiYuEndDays = calendar.sumTimeToNow(meiYuEndDateStr, nowDate);
          tipContentStr = `🌧进入梅雨季第${meiYudays+1}天，阴雨持续连绵，高温高湿，距离出梅还有${meiYuEndDays+1}天。`;
        }else if(diffTime > 0 && diffTime < 8){
          tipContentStr = tipContentStr + "⏳距离梅雨季还有" + diffTime + "天（ 持续"+ meiYuSeason.duration +"天：" + util.formatMMDate(meiYuSeason.startDate) + " ~ " + util.formatMMDate(meiYuSeason.endDate) +"）";
        }

        if(tipContentStr.length>0){
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示：')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示：', '');
              tipContentStr =  ` 温馨提示：` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示：` + tipContentStr;
          }
          that.setData({
            text: tipContentStr
          })
        }
    }
  },
  //夏季三伏天
  handleSanFuDate: function (nowDate) {
    var that = this;
    var date = new Date(nowDate);
    var currentYear = date.getFullYear();
    //计算夏季三伏天的开始日期、结束日期和持续天数
    var sanFuDates = calendar.calculateSanFuDates(currentYear);
    if (sanFuDates) {
        let tipContentStr = "";
          sanFuDates.forEach(function (sanFuDate) {
            var sanFuStartDateStr = util.formatDate(sanFuDate.startDate);
            let diffTime = calendar.diffTimeToDaily(nowDate, sanFuStartDateStr);
            //接近三伏天
            if(date >= sanFuDate.startDate&& date <= sanFuDate.endDate){
              let sanFudays = calendar.sumTimeToNow(sanFuStartDateStr, nowDate);
              tipContentStr = `🌞进入夏季三伏天-${sanFuDate.name}第${sanFudays+1}天，请大家注意避暑。`;
            }else if(tipContentStr == "" && diffTime > 0 && diffTime < 8){
              tipContentStr = tipContentStr + "⏳距离夏季三伏天-"+sanFuDate.name+"还有" + diffTime + "天（ 持续"+sanFuDate.days+"天：" + util.formatMMDate(sanFuDate.startDate) + " ~ " + util.formatMMDate(sanFuDate.endDate) +" ）"
            }
        });

        if(tipContentStr.length>0){
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示：')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示：', '');
              tipContentStr =  ` 温馨提示：` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示：` + tipContentStr;
          }
          that.setData({
            text: tipContentStr
          })
        }
    }
  },

  //冬季四九天
  handleSiJiuDate: function (nowDate) {
    var that = this;
    var date = new Date(nowDate);
    var currentYear = date.getFullYear();
    
    // 获取今年和去年的冬至日期
    var dongzhiDateThisYear = calendar.conversionTerm(currentYear, "12", 24);
    var dongzhiDateLastYear = calendar.conversionTerm(currentYear - 1, "12", 24);
    
    // 计算今年和去年的冬季四九天的开始日期、结束日期
    var sijiuDatesThisYear = calendar.calculateSanjiuSeason(currentYear, new Date(dongzhiDateThisYear));
    var sijiuDatesLastYear = calendar.calculateSanjiuSeason(currentYear - 1, new Date(dongzhiDateLastYear));

    var allSijiuDates = sijiuDatesLastYear.concat(sijiuDatesThisYear);

    if (allSijiuDates) {
        let tipContentStr = "";
        allSijiuDates.forEach(function (sijiuDate) {
            var sijiuStartDate = util.formatMMDate(sijiuDate.startDate);
            var sijiuEndDate = util.formatMMDate(sijiuDate.endDate);

            // 跨年处理
            let sijiuStartDateStr = sijiuDate.startDate.getFullYear() + '-' + sijiuStartDate;
            let sijiuEndDateStr = sijiuDate.endDate.getFullYear() + '-' + sijiuEndDate;

            let diffTime = calendar.diffTimeToDaily(nowDate, sijiuStartDateStr);

            // 接近四九天
            if (tipContentStr == "" && diffTime > 0 && diffTime < 8) {
                tipContentStr = tipContentStr + "⏳距离冬季四九天-" + sijiuDate.name + "还有" + diffTime + "天（ 持续9天：" + sijiuStartDateStr + " ~ " + sijiuEndDateStr + " ）";
            } else if (date >= new Date(sijiuStartDateStr) && date <= new Date(sijiuEndDateStr)) {
                let sijiudays = calendar.sumTimeToNow(sijiuStartDateStr, nowDate);
                tipContentStr = `❄进入冬季四九天-${sijiuDate.name}第${sijiudays + 1}天，请大家注意保暖。`;
            }
        });

        if (tipContentStr.length > 0) {
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示：')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示：', '');
              tipContentStr =  ` 温馨提示：` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示：` + tipContentStr;
          }
            that.setData({
                text: tipContentStr
            });
        }
    }
},

  handleTimeList: function () {
      todayFestivalTemp = ""; 
      var resultArr = [];
      //内容数组
      var that = this;
      //把今日日期转为YYYY-MM-DD的格式
      let date = new Date();
      let currentYear = date.getFullYear();
      let currentMonth = date.getMonth();
      let currentDate = date.getDate();
      let currentMDDate = `${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${(currentDate) < 10 ? '0' + (currentDate) : (currentDate)}`;

      let nowDate = `${currentYear}-${currentMDDate}`;
      let lunarDate = calendar.solar2lunar(currentYear, currentMonth, currentDate);
      let solarDateStr = `${nowDate} ${lunarDate.ncWeek} ${lunarDate.astro} \n`

      //阴历春节
      this.handleSpringFestivalDate(nowDate);

      let yearDiffTime = that.data.yearDiffTime;
      let lunarDateStr = lunarDate.gzYear + lunarDate.Animal + '年'+ lunarDate.IMonthCn + lunarDate.IDayCn + ' 第' + yearDiffTime + '天';

      //阳历节日
      var sFtvDateStr = this.handlesFtvDate(nowDate);
      //阴历节日
      var lFtvDateStr  = this.handlelFtvDate(nowDate); 
      //特殊节日
      var specialDateStr  = this.handleSpecialDate(nowDate); 

    //提示优先级：24节气前面加梅雨、三伏、四九
    //不是法定节假日或补班，周末提示追加

      //二十四节气
      var termDateStr  = this.handleTermDate(nowDate); 
      //梅雨季
      this.handleMeiYuDate(nowDate);
      //夏季三伏天
      this.handleSanFuDate(nowDate);
      //冬季四九天
      this.handleSiJiuDate(nowDate);

      //法定节假日
      var legalDateStr = this.handleLegalDate(nowDate, currentMDDate);
      //周末提示
      this.handWeekTipDate(lunarDate);

      //除夕提示文案
      let diffTime = this.data.diffTime;
      if (diffTime == 0) {
        var tipContentStr =  ` 温馨提示：💘大年三十除夕夜，在这辞旧迎新的夜晚，万家灯火通明，喜悦满怀，家人团圆，其乐融融，共享温馨时光，除夕快乐，阖家幸福，愿您新年如意，梦想成真！`;
        that.setData({
           text: tipContentStr
        })
      }

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
        todaySolar: solarDateStr,    //当天阳历日期
        todayLunar: lunarDateStr     //当天阴历日期
      })

  }
})

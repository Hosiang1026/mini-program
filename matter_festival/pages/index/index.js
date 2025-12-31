// index.js
// 引用全局公共js
const app = getApp(); 
const util = require('../../utils/util.js')
const daily = require('../../utils/daily.js')
const calendar = require('../../utils/calendar.js')
var todayFestivalTemp = "";

const hefengKey = "fb82f0603a4642fea2673acff1187750"; //  和风天气Web api的key 我自己的
const hefengFreeApi = "https://devapi.qweather.com/v7"; //  和风天气免费API前缀
const hefengWeather = `${hefengFreeApi}/weather/now?`; //  和风天气实时天气api
const hefengAir = `${hefengFreeApi}/air/now?`; //  和风天气空气质量api
const todaylifeindex = "https://api.qweather.com/v7/indices/1d?"//当天天气生活指数
const geoApi = "https://geoapi.qweather.com/v2/city/lookup?" //  地理位置api（用来获取经纬度对应的城市/城区名字）

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
    diffTime: "", //距离除夕天数
    titleName: "重要节日", //小程序标题
    todayFestival: "今天是除夕", //今天的节日
    isScroll: false, // 控制是否滚动的标志
    scrollAnimation: "", // 滚动动画样式
    legalDate: "", //法定节假日
    sFtvDate: "", //阳历节日
    lFtvDate: "", //阴历节日
    termDate: "",       // 二十四节气列表
    specialDate: "",      // 特殊节日列表
    text: "💘今宵是除夕，明日又新年。爆竹惊残梦，寒镫照独眠。风霜催腊尽，梅柳得春先。抚景情无限，那能不怅然。",
    country: "", //国家
    province: "", //省份
    area: "", //城区
    city: "", //城市
    airText: "", //空气优良
    airValue: 0, //空气指数
    weather: "", //天气
    todaylifeadvice: "", // 体感温度
    pm2p5: "", //日期
    FAT: "", // 体感温度
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
  
  // 检查是否需要滚动显示
  checkScroll: function() {
    const { todayFestival } = this.data;
    const shouldScroll = todayFestival && todayFestival.length > 14;
    
    this.setData({
      isScroll: shouldScroll,
      // 使用横向滚动动画
      scrollAnimation: shouldScroll ? "marqueeHorizontal 15s linear infinite" : ""
    });
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
    // 节日是否需要滚动
    this.checkScroll();
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
    var length = that.data.text.length * that.data.size;//滚动文字的宽度
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
      var tipContentStr =  ``;
      that.setData({ titleName:"周末愉快"});
      let tipText = that.data.text;
      if(tipText.length > 0 ){
        if (tipText.includes('🎈放假第')||tipText.includes('坚持工作')) {
            return;
        }
        // 检查字符串是否包含 '温馨提示：'
        if (tipText.includes('温馨提示🗣 ')) {
          // 移除 '温馨提示：' 前缀
          let newTipText = tipText.replace('温馨提示🗣 ', '');
          tipContentStr =  ` 温馨提示🗣 ` + tipContentStr +  `  ` + newTipText;
        }
      }else{
        tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
      }
      that.setData({
        text: tipContentStr
      })
    }
  },
  //获取月相变化
  getMoonPhase: function (lunarDay) {
    switch (true) {
      case lunarDay === '初一':
        return ' 新月';
      case ['初二', '初三', '初四', '初五', '初六', '初七', '初八'].includes(lunarDay):
        return ' 蛾眉月';
      case ['初九'].includes(lunarDay):
        return ' 上弦月';
      case ['初十', '十一', '十二', '十三', '十四'].includes(lunarDay):
        return ' 盈凸月';
      case ['十五'].includes(lunarDay):
        return ' 满月';
      case ['十六', '十七', '十八', '十九', '二十', '廿一'].includes(lunarDay):
        return ' 亏凸月';
      case ['廿二'].includes(lunarDay):
        return ' 下弦月';
      case ['廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'].includes(lunarDay):
        return ' 残月';
      default:
        return '';
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
      var tipContentStr =  ` 新年祝福：💘在这辞旧迎新的夜晚，万家灯火通明，喜悦满怀，家人团圆，其乐融融，共享温馨时光，除夕快乐，阖家幸福，愿您新年如意，梦想成真！`;
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
  
  //国际节日
  handleInternationDate: function (nowDate) {
    var that = this;
    let tempName = '';
    let tempTime = 0;
    let date = new Date(nowDate);
    let currentYear = date.getFullYear();
    let intArr = daily.internation;
    if(intArr.length > 0){
        for (let i = 0; i < intArr.length; i++) {
            const element = intArr[i];
            let intName = element.name;
            let intDate = element.date;
            let targetArr = intDate.split('-');
            let nextIntDate = currentYear+'-'+ targetArr[0]+'-'+targetArr[1];
            if (new Date(nowDate) > new Date(nextIntDate)){
              nextIntDate = currentYear+1+'-'+ targetArr[0]+'-'+targetArr[1];
            }
            //计算差值
            let diffTime = calendar.diffTimeToDaily(nowDate, nextIntDate);
            if (nowDate == nextIntDate) {
                if(todayFestivalTemp == ""){
                  todayFestivalTemp = `今天是${intName}`;
                }else{
                  todayFestivalTemp = todayFestivalTemp + `和${intName}`
                }
                that.setData({
                  todayFestival: todayFestivalTemp + `🎉`
                })
            }else{
                if (tempTime == 0){
                    tempName = intName;
                    tempTime = diffTime;
                }else if (diffTime < tempTime){
                    tempName = intName;
                    tempTime = diffTime;
                }
            }
        }
        return `${tempName}: ${tempTime}天`;
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
        var termDateStr = `${tempName}: ${tempTime}天`;
        if(tipContentStr.length>0){
          tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
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
        return `${tempName}: ${tempTime}天`;
    }
  },
  //阳历节日和特殊节日合并
  handleSFtvSpecDate: function (nowDate) {
    var easterDateObj = this.handleEasterDate(nowDate);
    var specialDateObj = this.handleSpecialDate(nowDate);
    var sFtvDateObj = this.handlesFtvDate(nowDate);
    // 判断三个节日哪个 tempTime 更小，并返回对应的节日对象
    let finalObj = {};
    if (specialDateObj && sFtvDateObj && easterDateObj) {
      if (specialDateObj.tempTime <= sFtvDateObj.tempTime && specialDateObj.tempTime <= easterDateObj.tempTime) {
        finalObj = specialDateObj;
      } else if (sFtvDateObj.tempTime <= easterDateObj.tempTime) {
        finalObj = sFtvDateObj;
      } else {
        finalObj = easterDateObj;
      }
    } else if (specialDateObj && sFtvDateObj) {
      finalObj = specialDateObj.tempTime <= sFtvDateObj.tempTime ? specialDateObj : sFtvDateObj;
    } else if (specialDateObj && easterDateObj) {
      finalObj = specialDateObj.tempTime <= easterDateObj.tempTime ? specialDateObj : easterDateObj;
    } else if (sFtvDateObj && easterDateObj) {
      finalObj = sFtvDateObj.tempTime <= easterDateObj.tempTime ? sFtvDateObj : easterDateObj;
    } else {
      finalObj = specialDateObj || sFtvDateObj || easterDateObj || {};
    }
  
    // 最终返回节日名称和距离的天数
    return `${finalObj.name}: ${finalObj.tempTime}天`;
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
        return { name: tempName, tempTime: tempTime };
    }
  },
  //获取复活节日期
  getEasterDate: function (year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    let easterDates = new Date(year, month - 1, day); // 注意：月份是 0 索引，3 表示 4 月
    let easterYear = easterDates.getFullYear();
    let easterMonth = easterDates.getMonth();
    let easterDate = easterDates.getDate();
    let easterDateStr = `${easterYear}-` + `${(easterMonth + 1) < 10 ? '0' + (easterMonth + 1) : (easterMonth + 1)}-${(easterDate) < 10 ? '0' + (easterDate) : (easterDate)}`;
    return easterDateStr;
},
//处理复活节
handleEasterDate: function (nowDate) {
    var that = this;
    let date = new Date(nowDate);
    let currentYear = date.getFullYear();

    //N+1年
    let nextEasterDate = that.getEasterDate(currentYear+1);
    let resEasterDate = nextEasterDate;

    //N年
    let curEasterDate = that.getEasterDate(currentYear);
    if (new Date(nowDate) <= new Date(curEasterDate)){
        resEasterDate = curEasterDate;
    }

    //N-1年
    let preEasterDate = that.getEasterDate(currentYear-1);
    if (new Date(nowDate) <= new Date(preEasterDate)){
        resEasterDate = preEasterDate;
    }

    //计算差值
    let diffTime = calendar.diffTimeToDaily(nowDate, resEasterDate);
    if (diffTime == 0) {
        if(todayFestivalTemp == ""){
          todayFestivalTemp = `今天是复活节`;
        }else{
          todayFestivalTemp = todayFestivalTemp + `和复活节`
        }
        that.setData({
          todayFestival: todayFestivalTemp + `🎉`
        })
    }else{
      return { name: `复活节`, tempTime: diffTime };
    }
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
        return { name: tempName, tempTime: tempTime };
    }
  },

  // 法定节假日 - 修复版
handleLegalDate: function (nowDate, currentMDDate) {
  var that = this;
  let tempName = '';
  let tempTime = 0;
  let tipContentStr = "";
  let legalArr = daily.legal;
  if (legalArr.length > 0) {
      let date = new Date(nowDate);
      let currentYear = date.getFullYear();
      for (let i = 0; i < legalArr.length; i++) {
          const element = legalArr[i];
          let legalName = element.name;
          let legalDate = element.date;
          let legalFreeway = element.freeway;
          let legalHoliday = element.holiday;
          let legalRepair = element.repair;

          // 补班或放假提示
          var existHoliday = false;
          if (legalHoliday != 0) {
              existHoliday = legalHoliday.includes(currentMDDate);
              if (existHoliday) {
                  let holidayFrist = currentYear + '-' + legalHoliday[0];
                  let holidayDiff = calendar.sumTimeToNow(holidayFrist, nowDate);
                  tipContentStr = tipContentStr + `⛱${legalName}放假第${holidayDiff + 1}天`;
                  if (legalFreeway == 1) {
                      tipContentStr = tipContentStr + `，7座及以下小客车全国高速免费通行，以车辆驶离收费车道为准。`;
                  } else {
                      tipContentStr = tipContentStr + `，全国高速收费通行，祝大家假期愉快！`;
                  }
              }
          }
          if (legalRepair != 0) {
              let existRepair = legalRepair.includes(currentMDDate);
              if (existRepair) {
                  tipContentStr = tipContentStr + `📟今天${legalName}补班，坚持工作！ `;
              }
          }

          // 计算差值 - 修复跨年问题
          let targetArr = legalDate.split('-');
          let month = targetArr[0];
          let day = targetArr[1];
          
          // 创建当前年份的日期
          let curYearDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
          let now = new Date(nowDate);
          
          // 计算下一个节假日日期
          let nextLegalDate;
          if (curYearDate >= now) {
              // 如果今年的节假日还没过，就是今年的
              nextLegalDate = `${currentYear}-${month}-${day}`;
          } else {
              // 如果今年的节假日已经过了，就是明年的
              nextLegalDate = `${currentYear + 1}-${month}-${day}`;
          }
          
          // 计算天数差
          let diffTime = calendar.diffTimeToDaily(nowDate, nextLegalDate);
          
          // 确保diffTime是非负数
          diffTime = Math.max(0, diffTime);
          
          if (diffTime == 0) {
              if (todayFestivalTemp == "") {
                  todayFestivalTemp = `今天是${legalName}`;
              } else {
                  todayFestivalTemp = todayFestivalTemp + `和${legalName}`
              }
              that.setData({
                  todayFestival: todayFestivalTemp + `🎉`
              })
          } else {
              if (tempTime == 0) {
                  tempName = legalName;
                  tempTime = diffTime;
              } else if (diffTime < tempTime && diffTime > 0) {
                  tempName = legalName;
                  tempTime = diffTime;
              }
          }
          
          let startYearLegalDate = nowDate;
          let endYearLegalDate = nowDate;
          let startLegalHoliday = legalHoliday[0];
          let endLegalHoliday = legalHoliday[legalHoliday.length - 1];
          let legalHolidayNum = legalHoliday.length;
          
          // 放假前的15天内
          if (diffTime + legalHolidayNum < 15) {
              // 放假天数为1
              if (legalHolidayNum == 1) {
                  tipContentStr = tipContentStr + `⏳距离${legalName}放假还有${diffTime}天 `;
                  tipContentStr = tipContentStr + `（ `;
                  startYearLegalDate = currentYear + '-' + startLegalHoliday;
                  
                  // 判断开始日期是否已经过去，如果过去则用下一年
                  let startDate = new Date(startYearLegalDate);
                  if (startDate < now) {
                      startYearLegalDate = (currentYear + 1) + '-' + startLegalHoliday;
                  }
                  
                  if (legalRepair != 0) {
                      let legalRepairNum = legalRepair.length;
                      tipContentStr = tipContentStr + `补班${legalRepairNum}天：${legalRepair.join('、')}`;
                  }

                  if (legalHolidayNum > 2) {
                      tipContentStr = tipContentStr + `假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                  } else {
                      tipContentStr = tipContentStr + `假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                  }
                  if (legalFreeway == 1) {
                      tipContentStr = tipContentStr + ` 高速通行：免费 `;
                  } else {
                      tipContentStr = tipContentStr + ` 高速通行：收费 `;
                  }
                  tipContentStr = tipContentStr + ` ）`;
              } else if (!existHoliday) {
                  startYearLegalDate = currentYear + '-' + startLegalHoliday;
                  endYearLegalDate = currentYear + '-' + endLegalHoliday;
                  
                  // 判断开始日期是否已经过去，如果过去则用下一年
                  let startDate = new Date(startYearLegalDate);
                  let startDiffTime;
                  if (startDate < now) {
                      startYearLegalDate = (currentYear + 1) + '-' + startLegalHoliday;
                      startDiffTime = calendar.diffTimeToDaily(nowDate, startYearLegalDate);
                  } else {
                      startDiffTime = calendar.diffTimeToDaily(nowDate, startYearLegalDate);
                  }
                  
                  startDiffTime = Math.max(0, startDiffTime);
                  
                  if (startDiffTime > 0) {
                      tipContentStr = tipContentStr + `⏳距离${legalName}放假还有${startDiffTime}天 `;
                      tipContentStr = tipContentStr + `（ `;
                      if (legalRepair != 0) {
                          let legalRepairNum = legalRepair.length;
                          tipContentStr = tipContentStr + `补班${legalRepairNum}天：${legalRepair.join('、')} `;
                      }
                      let legalHolidayNum = legalHoliday.length;
                      if (legalHolidayNum > 2) {
                          tipContentStr = tipContentStr + `假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
                      } else {
                          tipContentStr = tipContentStr + `假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
                      }

                      if (legalFreeway == 1) {
                          tipContentStr = tipContentStr + ` 高速通行：免费`;
                      } else {
                          tipContentStr = tipContentStr + ` 高速通行：收费`;
                      }

                      tipContentStr = tipContentStr + ` ）`;
                  }
              }
          }
      }

      if (tipContentStr.length > 0) {
          let tipText = that.data.text;
          if (tipText.length > 0) {
              // 检查字符串是否包含 '温馨提示：'
              if (tipText.includes('温馨提示🗣 ')) {
                  // 移除 '温馨提示：' 前缀
                  let newTipText = tipText.replace('温馨提示🗣 ', '');
                  tipContentStr = ` 温馨提示🗣 ` + tipContentStr + `  ` + newTipText;
              }
          } else {
              tipContentStr = ` 温馨提示🗣 ` + tipContentStr;
          }
          that.setData({
              text: tipContentStr
          })
      }
      var legalDateStr = `${tempName}: ${tempTime}天`;
      return legalDateStr;
  }
},
  //法定节假日
  // handleLegalDate: function (nowDate, currentMDDate) {
  //   var that = this;
  //   let tempName = '';
  //   let tempTime = 0;
  //   let tipContentStr = "";
  //   let legalArr = daily.legal;
  //     if(legalArr.length > 0){
  //       let date = new Date(nowDate);
  //       let currentYear = date.getFullYear();
  //       for (let i = 0; i < legalArr.length; i++) {
  //           const element = legalArr[i];
  //           let legalName = element.name;
  //           let legalDate = element.date;
  //           let legalFreeway = element.freeway;
  //           let legalHoliday = element.holiday;
  //           let legalRepair = element.repair;

  //           //补班或放假提示
  //           var existHoliday = false;
  //           if(legalHoliday != 0){
  //             existHoliday = legalHoliday.includes(currentMDDate);
  //             if(existHoliday){
  //               let holidayFrist =currentYear + '-'+ legalHoliday[0];
  //               let holidayDiff = calendar.sumTimeToNow(holidayFrist, nowDate);
  //               tipContentStr = tipContentStr + `⛱${legalName}放假第${holidayDiff+1}天`;
  //               if(legalFreeway == 1){
  //                 tipContentStr = tipContentStr + `，7座及以下小客车全国高速免费通行，以车辆驶离收费车道为准。`;
  //               }else{
  //                 tipContentStr = tipContentStr + `，全国高速收费通行，祝大家假期愉快！`;
  //               }
  //             }
  //           }
  //           if(legalRepair != 0){
  //             let existRepair = legalRepair.includes(currentMDDate);
  //             if(existRepair){
  //             tipContentStr = tipContentStr +`📟今天${legalName}补班，坚持工作！ `;
  //             }
  //           }

  //           //计算差值
  //           let targetArr = legalDate.split('-');
  //           let currentYearBar = currentYear + '-';
  //           let nextLegalDate = currentYearBar + targetArr[0] + '-' + targetArr[1];
  //           if (new Date(nowDate) > new Date(nextLegalDate)) {
  //               nextLegalDate = currentYear + 1 + '-' + targetArr[0] + '-' + targetArr[1];
  //           }
  //           let diffTime = calendar.diffTimeToDaily(nowDate, nextLegalDate);
  //           if (diffTime == 0) {
  //             if(todayFestivalTemp == ""){
  //               todayFestivalTemp = `今天是${legalName}`;
  //             }else{
  //               todayFestivalTemp = todayFestivalTemp + `和${legalName}`
  //             }
  //             that.setData({
  //               todayFestival: todayFestivalTemp + `🎉`
  //             })
  //           } else {
  //               if (tempTime == 0) {
  //                   tempName = legalName;
  //                   tempTime = diffTime;
  //               } else if (diffTime < tempTime&&diffTime > 0) {
  //                   tempName = legalName;
  //                   tempTime = diffTime;
  //               }
  //           }
  //           let startYearLegalDate = nowDate;
  //           let endYearLegalDate = nowDate;
  //           let startLegalHoliday = legalHoliday[0];
  //           let endLegalHoliday = legalHoliday[legalHoliday.length - 1];
  //           let legalHolidayNum = legalHoliday.length;
  //           //放假前的15天内
  //           if (diffTime+legalHolidayNum < 15) {
  //               //放假天数为1
  //               if (legalHolidayNum == 1) {
  //                 tipContentStr = tipContentStr +`⏳距离${legalName}放假还有${diffTime}天 `;
  //                 tipContentStr = tipContentStr +`（ `;
  //                   startYearLegalDate = currentYearBar + startLegalHoliday;
  //                   if (legalRepair != 0) {
  //                       let legalRepairNum = legalRepair.length;
  //                       tipContentStr = tipContentStr + `补班${legalRepairNum}天：${legalRepair.join('、')}`;
  //                   }

  //                   if (legalHolidayNum > 2){
  //                     tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
  //                   }else{
  //                     tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
  //                   }
  //                   if(legalFreeway == 1){
  //                     tipContentStr = tipContentStr + ` 高速通行：免费 `;
  //                   }else{
  //                     tipContentStr = tipContentStr + ` 高速通行：收费 `;
  //                   }
  //                   tipContentStr = tipContentStr +` ）`;
  //               } else if(!existHoliday){
  //                   startYearLegalDate = currentYearBar + startLegalHoliday;
  //                   endYearLegalDate = currentYearBar + endLegalHoliday;
  //                     let startDiffTime = calendar.diffTimeToDaily(nowDate, startYearLegalDate);
  //                     if (startDiffTime > 0){
  //                       tipContentStr = tipContentStr +`⏳距离${legalName}放假还有${startDiffTime}天 `;
  //                       tipContentStr = tipContentStr +`（ `;
  //                         if (legalRepair != 0) {
  //                             let legalRepairNum = legalRepair.length;
  //                             tipContentStr = tipContentStr +`补班${legalRepairNum}天：${legalRepair.join('、')} `;
  //                         }
  //                         let legalHolidayNum = legalHoliday.length;
  //                         if (legalHolidayNum > 2){
  //                           tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${startLegalHoliday} ~ ${endLegalHoliday}`;
  //                         }else{
  //                           tipContentStr = tipContentStr +`假期${legalHolidayNum}天：${legalHoliday.join('、')}`;
  //                         }

  //                         if(legalFreeway == 1){
  //                           tipContentStr = tipContentStr + ` 高速通行：免费`;
  //                         }else{
  //                           tipContentStr = tipContentStr + ` 高速通行：收费`;
  //                         }

  //                         tipContentStr = tipContentStr +` ）`;
  //                     }
  //               }
  //           }
  //       }

  //         if(tipContentStr.length>0){
  //           let tipText = that.data.text;
  //           if(tipText.length > 0 ){
  //             // 检查字符串是否包含 '温馨提示：'
  //             if (tipText.includes('温馨提示🗣 ')) {
  //               // 移除 '温馨提示：' 前缀
  //               let newTipText = tipText.replace('温馨提示🗣 ', '');
  //               tipContentStr =  ` 温馨提示🗣 ` + tipContentStr +  `  ` + newTipText;
  //             }
  //           }else{
  //             tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
  //           }
  //           that.setData({
  //             text: tipContentStr
  //           })
  //         }
  //         var legalDateStr = `${tempName}: ${tempTime}天`;
  //         return legalDateStr;
  //       }
  // },
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
        date.setHours(0, 0, 0, 0);
        if(date >= meiYuSeason.startDate&& date <= meiYuSeason.endDate){
          let meiYudays = calendar.sumTimeToNow(meiYuStartDateStr, nowDate);
          let meiYuEndDays = calendar.sumTimeToNow(meiYuEndDateStr, nowDate);
          tipContentStr = `🌧梅雨季第${meiYudays+1}天，阴雨持续连绵，高温高湿，距离出梅还有${meiYuEndDays+1}天。`;
        }else if(diffTime > 0 && diffTime < 8){
          tipContentStr = tipContentStr + "⏳距离梅雨季还有" + diffTime + "天（ 持续"+ meiYuSeason.duration +"天：" + util.formatMMDate(meiYuSeason.startDate) + " ~ " + util.formatMMDate(meiYuSeason.endDate) +"）";
        }

        if(tipContentStr.length>0){
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示🗣 ')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示🗣 ', '');
              tipContentStr =  ` 温馨提示🗣 ` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
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
            date.setHours(0, 0, 0, 0);
            if(date >= sanFuDate.startDate&& date <= sanFuDate.endDate){
              let sanFudays = calendar.sumTimeToNow(sanFuStartDateStr, nowDate);
              tipContentStr = `🔅夏季三伏天-${sanFuDate.name}第${sanFudays+1}天，请大家注意避暑。`;
            }else if(tipContentStr == "" && diffTime > 0 && diffTime < 8){
              tipContentStr = tipContentStr + "⏳距离夏季三伏天-"+sanFuDate.name+"还有" + diffTime + "天（ 持续"+sanFuDate.days+"天：" + util.formatMMDate(sanFuDate.startDate) + " ~ " + util.formatMMDate(sanFuDate.endDate) +" ）"
            }
        });

        if(tipContentStr.length>0){
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示🗣 ')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示🗣 ', '');
              tipContentStr =  ` 温馨提示🗣 ` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
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
            date.setHours(0, 0, 0, 0);
            var sijiuStartDate = new Date(sijiuStartDateStr).setHours(0, 0, 0, 0);
            var sijiuEndDate = new Date(sijiuEndDateStr).setHours(0, 0, 0, 0);
            if (date >= sijiuStartDate && date <= sijiuEndDate) {
                let sijiudays = calendar.sumTimeToNow(sijiuStartDateStr, nowDate);
                tipContentStr = `❄冬季四九天-${sijiuDate.name}第${sijiudays + 1}天，一九二九不出手，三九四九冰上走，请大家注意保暖。`;
            }else if (tipContentStr == "" && diffTime > 0 && diffTime < 8) {
                  tipContentStr = tipContentStr + "⏳距离冬季四九天-" + sijiuDate.name + "还有" + diffTime + "天（ 持续9天：" + sijiuStartDateStr + " ~ " + sijiuEndDateStr + " ）";
            }  
        });

        if (tipContentStr.length > 0) {
          let tipText = that.data.text;
          if(tipText.length > 0 ){
            // 检查字符串是否包含 '温馨提示：'
            if (tipText.includes('温馨提示🗣 ')) {
              // 移除 '温馨提示：' 前缀
              let newTipText = tipText.replace('温馨提示🗣 ', '');
              tipContentStr =  ` 温馨提示🗣 ` + tipContentStr +  `  ` + newTipText;
            }
          }else{
            tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
          }
            that.setData({
                text: tipContentStr
            });
        }
    }
},

// 获取天气相关数据
handleWeather: function () {
  var that = this;
  //获取地理位置
  wx.getLocation({
    type: "wgs84",
    success(res) {
      const latitude = res.latitude;
      const longitude = res.longitude;
      const key = hefengKey;
      wx.request({
        url: `${geoApi}location=${longitude},${latitude}&key=${key}`, //获取地理位置
        success(res) {
          console.log(res.data);
          if (res.data.code == "401") {
            console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
            return;
          }
          try {
            const {
              location
            } = res.data;
            var countryStr = '';
            var provinceStr = '';
            var cityStr = '';
            var areaStr = '';
            if (daily && location.length > 0) {
                for (var i = 0; i < location.length; i++) {
                    countryStr = location[i].country;
                    provinceStr = location[i].adm1;
                    cityStr = location[i].adm2;
                    areaStr = location[i].name;
                }
            }
            that.setData({
              country: countryStr, //城市
              province: provinceStr, //城市
              city: cityStr, //城市
              area: areaStr //城区
            })
          } catch (error) {
            console.error(error);
          }
        },
      });
      wx.request({
        url: `${hefengWeather}location=${longitude},${latitude}&key=${key}`, //获取实时天气数据
        success(res) {
          console.log(res.data);
          if (res.data.code == "401") {
            console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
            return;
          }
          try {
            const {
              now
            } = res.data;
            that.setData({
              weather: now.text, // 天气
              FAT: now.feelsLike //体感温度
            })
          } catch (error) {
            console.error(error);
          }

        },
      });
      // wx.request({
      //   url: `${hefengAir}location=${longitude},${latitude}&key=${key}`, //获取空气数据
      //   success(res) {
      //     console.log(res.data);
      //     if (res.data.code == "401") {
      //       console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
      //       return;
      //     }
      //     try {
      //       const {
      //         now
      //       } = res.data;
      //       that.setData({
      //         airText: now.category, //空气质量
      //         pm2p5: now.pm2p5, //PM2.5浓度
      //         airValue: now.aqi //空气指数
      //       })
      //     } catch (error) {
      //       console.error(error);
      //     }

      //   },
      // });

      wx.request({
        url: `https://devapi.qweather.com/v7/indices/1d?type=1,2&location=${longitude},${latitude}&key=${key}`, //获取实时天气数据
        success(res) {
          console.log(res.data);
          if (res.data.code == "401") {
            console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
            return;
          }
          try {
            const {
              daily
            } = res.data;
            var advice = '';
            if (daily && daily.length > 0) {
                for (var i = 0; i < daily.length; i++) {
                    advice += daily[i].text;
                }
            }
            that.setData({
              todaylifeadvice: advice // 天气建议
            })
          } catch (error) {
            console.error(error);
          }

        },
      });
    },
  });
},

//获取天气提示
handleWeatherTip: function () {
    var that = this;
    const intervalId = setInterval(function() {
      let tipContentStr = "";
      let tipAdviceStr = "";
      //if(that.data.country != ''&&that.data.province != ''){
      //  tipContentStr = that.data.country + that.data.province;
      //}
      if(that.data.city != ''&&that.data.area != ''){
        //tipContentStr = tipContentStr + that.data.city + that.data.area + `-`;
        if(that.data.weather != ''){
          var weatherIcon = '';
          var weathers = that.data.weather ;
          switch (weathers) {
             case "雾":
                  weatherIcon = "🌫";
                  break;
             case "霾":
                  weatherIcon = "🌫";
                  break;
              case "晴":
                  weatherIcon = "🌤";
                  break;
              case "多云":
                  weatherIcon = "🌥";
                  break;
              case "阴":
                  weatherIcon = "☁";
                  break;
              case "小雨":
                  weatherIcon = "🌨";
                  break;
              case "中雨":
                  weatherIcon = "🌧";
                  break;
              case "大雨":
                  weatherIcon = "⛈";
                  break;
              default:
                  if (weathers.indexOf('晴') != -1){
                      weatherIcon = "🌤";
                  }
                  if (weathers.indexOf('雨') != -1){
                      weatherIcon = "🌨";
                  }
          }
          tipContentStr = tipContentStr + `实时天气：` + weathers + weatherIcon + ` `;
        }
        
        if(that.data.FAT != ''){
          tipContentStr = tipContentStr + `体感温度：` + that.data.FAT + `℃ `;
        }
      }

      if(that.data.airText != ''){
        tipContentStr = tipContentStr + `空气质量：` + that.data.airText + ` `;
      }

      if(that.data.airValue != 0){
        tipContentStr = tipContentStr + `空气指数：` + that.data.airValue + ` `;
      }
      
      if(that.data.pm2p5 != ''){
        tipContentStr = tipContentStr + `PM2.5浓度：` + that.data.pm2p5  + `μg/m3 `;
      }
      // if(that.data.todaylifeadvice != ''){
      //   tipAdviceStr = `天气建议：` + that.data.todaylifeadvice;
      // }

      if (tipContentStr.length > 0) {
        let tipText = that.data.text;
        if(tipText.length > 0 ){
          // 检查字符串是否包含 '温馨提示：'
          if (tipText.includes('温馨提示🗣 ')) {
            // 移除 '温馨提示：' 前缀
            let newTipText = tipText.replace('温馨提示🗣 ', '');
            tipContentStr =  ` 温馨提示🗣 `  + tipContentStr+  `  ` +newTipText +  `  ` + tipAdviceStr;
          }
        }else{
          tipContentStr =  ` 温馨提示🗣 ` + tipContentStr;
        }
          that.setData({
              text: tipContentStr
          });
          that.scrolltxt();
      }
  }, 1000);

  // 需要停止时，可以使用 clearInterval 取消循环
  setTimeout(function() {
    clearInterval(intervalId);
  }, 1500); // 5 秒后停止循环

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

      // 获取天气相关数据
      this.handleWeather();

      //阴历春节
      this.handleSpringFestivalDate(nowDate);

      let yearDiffTime = that.data.yearDiffTime;
      var moonPhaseStr = this.getMoonPhase(lunarDate.IDayCn);
      let lunarDateStr = lunarDate.gzYear + lunarDate.Animal + '年'+ lunarDate.IMonthCn + lunarDate.IDayCn + moonPhaseStr + ' 第' + yearDiffTime + '天';

      //阳历节日和特殊节日
      var sFtvDateStr  = this.handleSFtvSpecDate(nowDate); 
      //阴历节日
      var lFtvDateStr  = this.handlelFtvDate(nowDate); 
      //国际节日
      var internationDateStr  = this.handleInternationDate(nowDate);

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

      //法定节假日
      resultArr.push(legalDateStr); 
      //阳历节日
      resultArr.push(sFtvDateStr);
      //阴历节日
      resultArr.push(lFtvDateStr);
      //二十四节气
      resultArr.push(termDateStr);
      //国际节日
      resultArr.push(internationDateStr);
      //数组排序
      resultArr.sort((a, b) => a.length - b.length);

      that.setData({
        items: resultArr,
        todaySolar: solarDateStr,    //当天阳历日期
        todayLunar: lunarDateStr     //当天阴历日期
      })
 
      // 获取天气提示数据
      this.handleWeatherTip();

      //除夕提示文案
      let diffTime = this.data.diffTime;
      if (diffTime == 0) {
        var tipContentStr =  ` 温馨提示🗣 新年祝福🎆：大年三十除夕夜，在这辞旧迎新的夜晚，万家灯火通明，喜悦满怀，家人团圆，其乐融融，共享温馨时光，除夕快乐，阖家幸福，愿您新年如意，梦想成真！`;
        that.setData({
            text: tipContentStr
        })
      }

    }
})

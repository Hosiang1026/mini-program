/**
 * 农历数据表
 * @1900-2100区间内的公历、农历互转
 * @charset UTF-8
 * @Version 1.0.3
 * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 */

  /**
   * 农历1900-2100的润大小信息表
   * @Array Of Property
   * @return Hex
   */
  const lunarInfo = new Array(
      0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
      0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
      0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
      0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
      0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
      0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
      /**Add By JJonline@JJonline.Cn**/
      0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
      0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
      0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
      0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
      0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
      0x0d520);//2100

  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number
   */
  const solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  const Gan = new Array("\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678");

  /**
   * 天干地支之地支速查表
   * @Array Of Property
   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string
   */
  const Zhi = new Array("\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5");

  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property
   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string
   */
  const Animals = new Array("\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a");

  /**
   * 24节气速查表
   * @Array Of Property
   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string
   */
  const solarTerm = new Array("\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3");

  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */
  const sTermInfo = new Array('9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
      '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
      '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
      'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
      '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
      '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
      '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
      '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
      '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
      '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
      '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
      '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
      '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
      '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
      '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
      '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
      '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
      '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
      '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
      '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
      '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
      '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
      '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
      '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
      '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
      '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
      '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
      '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
      '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
      '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
      '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
      '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
      '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
      '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
      '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
      '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
      '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722');

  /**
   * 数字转中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  const nStr1 = new Array("\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341");

  /**
   * 日期转农历称呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  const nStr2 = new Array("\u521d", "\u5341", "\u5eff", "\u5345");

  /**
   * 月份转农历称呼速查表
   * @Array Of Property
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string
   */
  const nStr3 = new Array("\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a");


  /**
   * 返回农历y年一整年的总天数
   * @param lunar Year
   * @return Number
   * @eg:var count = calendar.lYearDays(1987) ;//count=387
   */
   function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    }
    return (sum + leapDays(y));
}

/**
 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
 * @param lunar Year
 * @return Number (0-12)
 * @eg:var leapMonth = calendar.leapMonths(1987) ;//leapMonth=6
 */
 function leapMonths(y) { //闰字编码 \u95f0
    return (lunarInfo[y - 1900] & 0xf);
}

/**
 * 返回农历y年闰月的天数 若该年没有闰月则返回0
 * @param lunar Year
 * @return Number (0、29、30)
 * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
 */
 function leapDays(y) {
    if (leapMonths(y)) {
        return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return (0);
}

/**
 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
 * @param lunar Year
 * @return Number (-1、29、30)
 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
 */
function monthDays(y, m) {
    if (m > 12 || m < 1) {
        return -1
    }//月份参数从1至12，参数错误返回-1
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

/**
 * 返回公历(!)y年m月的天数
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
 */
 function solarDays(y, m) {
    if (m > 12 || m < 1) {
        return -1
    } //若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    } else {
        return (solarMonth[ms]);
    }
}

/**
 * 农历年份转换为干支纪年
 * @param  lYear 农历年的年份数
 * @return Cn string
 */
 function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
    return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

/**
 * 公历月、日判断所属星座
 * @param  cMonth [description]
 * @param  cDay [description]
 * @return Cn string
 */
function toAstro(cMonth, cDay) {
    var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座
}

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
 function toGanZhi(offset) {
    return Gan[offset % 10] + Zhi[offset % 12];
}

/**
 * 传入公历(!)y年获得该年第n个节气的公历日期
 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
 */
 function getTerm(y, n) {
    if (y < 1900 || y > 2100) {
        return -1;
    }
    if (n < 1 || n > 24) {
        return -1;
    }
    var _table = sTermInfo[y - 1900];
    var _info = [
        parseInt('0x' + _table.substr(0, 5)).toString(),
        parseInt('0x' + _table.substr(5, 5)).toString(),
        parseInt('0x' + _table.substr(10, 5)).toString(),
        parseInt('0x' + _table.substr(15, 5)).toString(),
        parseInt('0x' + _table.substr(20, 5)).toString(),
        parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),

        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),

        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),

        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),

        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),

        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
}

/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param lunar month
 * @return Cn string
 * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
 */
function toChinaMonth(m) { // 月 => \u6708
    if (m > 12 || m < 1) {
        return -1
    } //若参数错误 返回-1
    var s = nStr3[m - 1];
    s += "\u6708";//加上月字
    return s;
}

/**
 * 传入农历日期数字返回汉字表示法
 * @param lunar day
 * @return Cn string
 * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
 */
function toChinaDay(d) { //日 => \u65e5
    var s;
    switch (d) {
        case 10:
            s = '\u521d\u5341';
            break;
        case 20:
            s = '\u4e8c\u5341';
            break;
            break;
        case 30:
            s = '\u4e09\u5341';
            break;
            break;
        default :
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}

/**
 * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
 * @param y year
 * @return Cn string
 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
 */
function getAnimal(y) {
    return Animals[(y - 4) % 12]
}

/**
 * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
 * @param y  solar year
 * @param m  solar month
 * @param d  solar day
 * @return JSON object
 * @eg:console.log(calendar.solar2lunar(1987,11,01));
 */
function solar2lunar(y, m, d) { //参数区间1900.1.31~2100.12.31
    //年份限定、上限
    if (y < 1900 || y > 2100) {
        return -1;// undefined转换为数字变为NaN
    }
    //公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
        return -1;
    }
    //未传参  获得当天
    if (!y) {
        var objDate = new Date();
    } else {
        //var objDate = new Date(y, parseInt(m) - 1, d)
        var objDate = new Date(y, m, d)
    }
    var i, leap = 0, temp = 0;
    //修正ymd参数
    var y = objDate.getFullYear(),
        m = objDate.getMonth() + 1,
        d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp;
        i--;
    }

    //是否今天
    var isTodayObj = new Date(),
        isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
        isToday = true;
    }
    //星期几
    var nWeek = objDate.getDay(),
        cWeek = nStr1[nWeek];
    //数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
        nWeek = 7;
    }
    //农历年
    var year = i;
    var leap = leapMonths(i); //闰哪个月
    var isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && isLeap == false) {
            --i;
            isLeap = true;
            temp = leapDays(year); //计算农历闰月天数
        } else {
            temp = monthDays(year, i);//计算农历普通月天数
        }
        //解除闰月
        if (isLeap == true && i == (leap + 1)) {
            isLeap = false;
        }
        offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true;
            --i;
        }
    }
    if (offset < 0) {
        offset += temp;
        --i;
    }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;
    //天干地支处理
    var sm = m - 1;
    var gzY = toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
    var secondNode = getTerm(y, (m * 2));//返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
        gzM = toGanZhi((y - 1900) * 12 + m + 12);
    }

    //传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
        isTerm = true;
        Term = solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
        isTerm = true;
        Term = solarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = toGanZhi(dayCyclical + d - 1);
    //该日期所属的星座
    var astro = toAstro(m, d);

    return {
        'lYear': year,
        'lMonth': month,
        'lDay': day,
        'Animal': getAnimal(year),
        'IMonthCn': (isLeap ? "\u95f0" : '') + toChinaMonth(month),
        'IDayCn': toChinaDay(day),
        'cYear': y,
        'cMonth': m,
        'cDay': d,
        'gzYear': gzY,
        'gzMonth': gzM,
        'gzDay': gzD,
        'isToday': isToday,
        'isLeap': isLeap,
        'nWeek': nWeek,
        'ncWeek': "\u661f\u671f" + cWeek,
        'isTerm': isTerm,
        'Term': Term,
        'astro': astro
    };
}

/**
 * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
 * 获取详细的农历有BUG 例如：2023-11-16的农历转换公历不正确
 * @param y  lunar year
 * @param m  lunar month
 * @param d  lunar day
 * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
 * @return JSON object
 * @eg:console.log(calendar.lunar2solar(1987,9,10));
 */
function lunar2solarDetail(y, m, d, isLeapMonth) {
    var offset = lunar2solarOffset(y, m, d, isLeapMonth);
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return solar2lunar(cY, cM, cD);
}

function lunar2solar(y, m, d, isLeapMonth) {
    var offset = lunar2solarOffset(y, m, d, isLeapMonth);
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();
    return {
        'cYear': cY,
        'cMonth': cM,
        'cDay': cD
    };
}

function lunar2solarOffset(y, m, d, isLeapMonth) {   //参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapDay = leapDays(y);
    var leapMonth = leapMonths(y);

    if (isLeapMonth && (leapMonth != m)) {
        return -1;
    }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
        return -1;
    }//超出了最大极限值
    var day = monthDays(y, m);
    var _day = day;
    //bugFix 2016-9-25
    //if month is leap, _day use leapDays method
    if (isLeapMonth) {
        _day = leapDays(y, m);
    }
    //参数合法性效验
    if (y < 1900 || y > 2100) {
        return -1;
    }
    //修复day超过最大值，取最大值
    if (d > _day) {
      d = _day;
    }

    //计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
        offset += lYearDays(i);
    }
    var leap = 0, isAdd = false;
    for (var i = 1; i < m; i++) {
        leap = leapMonths(y);
        if (!isAdd) {//处理闰月
            if (leap <= i && leap > 0) {
                offset += leapDays(y);
                isAdd = true;
            }
        }
        offset += monthDays(y, i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
        offset += day;
    }

    return offset;
}

/**
 * 获取当前日期
 **/
function getCurrentDateTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var week = d.getDay();
  /*时分秒*/
  /*var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var ms = d.getMilliseconds();*/
  var curDateTime = year;
  if (month > 9)
      curDateTime = curDateTime + "年" + month;
  else
      curDateTime = curDateTime + "年0" + month;
  if (date > 9)
      curDateTime = curDateTime + "月" + date + "日";
  else
      curDateTime = curDateTime + "月0" + date + "日";
  /*if (hours > 9)
      curDateTime = curDateTime + " " + hours;
  else
      curDateTime = curDateTime + " 0" + hours;
  if (minutes > 9)
      curDateTime = curDateTime + ":" + minutes;
  else
      curDateTime = curDateTime + ":0" + minutes;
  if (seconds > 9)
      curDateTime = curDateTime + ":" + seconds;
  else
      curDateTime = curDateTime + ":0" + seconds;*/
  var weekday = "";
  if (week == 0)
      weekday = "星期日";
  else if (week == 1)
      weekday = "星期一";
  else if (week == 2)
      weekday = "星期二";
  else if (week == 3)
      weekday = "星期三";
  else if (week == 4)
      weekday = "星期四";
  else if (week == 5)
      weekday = "星期五";
  else if (week == 6)
      weekday = "星期六";
  curDateTime = curDateTime + " " + weekday;

  return curDateTime;
}

/**
 * 获取当前农历
 **/
function showCal() {
  var D = new Date();
  var yy = D.getFullYear();
  var mm = D.getMonth() + 1;
  var dd = D.getDate();
  var ww = D.getDay();
  var ss = parseInt(D.getTime() / 1000);
  if (yy < 100) yy = "19" + yy;
  return GetLunarDay(yy, mm, dd);
}

//定义全局变量
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95];
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
  return (m >> n) & 1;
}

//农历转换
function e2c() {
  TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
  var total, m, n, k;
  var isEnd = false;
  var tmp = TheDate.getYear();
  if (tmp < 1900) {
      tmp += 1900;
  }
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

  if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
      total++;
  }
  for (m = 0; ; m++) {
      k = (CalendarData[m] < 0xfff) ? 11 : 12;
      for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
              isEnd = true;
              break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
      }
      if (isEnd) break;
  }
  cYear = 1921 + m;
  cMonth = k - n + 1;
  cDay = total;
  if (k == 12) {
      if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
      }
      if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
      }
  }
}

function GetcDateString() {
  var tmp = "";
  /*显示农历年：（ 如：甲午(马)年 ）*/
  /*tmp+=tgString.charAt((cYear-4)%10);
  tmp+=dzString.charAt((cYear-4)%12);
  tmp+="(";
  tmp+=sx.charAt((cYear-4)%12);
  tmp+=")年 ";*/
  if (cMonth < 1) {
      tmp += "(闰)";
      tmp += monString.charAt(-cMonth - 1);
  } else {
      tmp += monString.charAt(cMonth - 1);
  }
  tmp += "月";
  tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
  if (cDay % 10 != 0 || cDay == 10) {
      tmp += numString.charAt((cDay - 1) % 10);
  }
  return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
  //solarYear = solarYear<1900?(1900+solarYear):solarYear;
  if (solarYear < 1921 || solarYear > 2020) {
      return "";
  } else {
      solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
      e2c(solarYear, solarMonth, solarDay);
      return GetcDateString();
  }
}

/**
 * 农历转换公历
 **/
function conversion(str) {
  /**公历年月日转农历数据 返回json
   calendar.solar2lunar(1987,11,01);
   农历年月日转公历年月日
   calendar.lunar2solar(1990,12,29);
   **/
  var y = parseInt(str.substring(0, 4));
  var m = parseInt(str.substring(5, 7));
  var d = parseInt(str.substring(8, 10));

  var solar = lunar2solar(y, m, d);

  var solarCMonth = (solar.cMonth) < 10 ? '0' + (solar.cMonth) : (solar.cMonth);
  var solarCDay = (solar.cDay) < 10 ? '0' + (solar.cDay) : (solar.cDay)
  var solarBirthday = solar.cYear + "-" + solarCMonth  + "-" + solarCDay;

  return solarBirthday;
}

/**
 * 24节气转换公历
 **/
function conversionTerm(year, mouth, num) {
  var day = getTerm(parseInt(year), parseInt(num));
  var termDay = (day) < 10 ? '0' + (day) : (day)
  var termStr = year + "-" + mouth + "-" + termDay;

  return termStr;
}

/**
 * 获取农历
 **/
function conversionLunar(year) {

  var syear = calendar.toGanZhiYear(parseInt(year));
  var animal = calendar.getAnimal(parseInt(year));
  //干支(生肖)年
  var lunarStr = syear + animal + "年";

  return lunarStr;
}

/**
 * 根据出生农历获取生日星座
 * @param {*} str 
 */
function conversionAstro(str) {

  var y = parseInt(str.substring(0, 4));
  var m = parseInt(str.substring(5, 7));
  var d = parseInt(str.substring(8, 10));

  var solar = lunar2solarDetail(y, m, d);

  var astroStr = solar.astro + " " + "生肖属" + solar.Animal;

  return astroStr;
}

/**
* 获取母亲节|父亲节|感恩节的日期（N月的第weeks周的星期nums）
* @param year 2019
* @param month 06
* @param weeks 2
* @param nums 7
* @returns {any}
*/
function conversionParentDate(year, month, weeks, nums) {
  var time = year + `/` + month + `/` + `01`;
  var startDate = new Date(time);
  var day = parseInt(startDate.getDay()) == 0 ? 7 : parseInt(startDate.getDay());
  // 判断当月有几周
  var days = new Date(year, month, 0).getDate();
  var y = days % 7;
  if (7 - day >= y) {
      var zhou = parseInt(days / 7) + 1;
  } else {
      var zhou = parseInt(days / 7) + 2;
  }
  var endDate = new Date(year + `/` + month + `/` + days).getDay();
  if (endDate == 0) {
      zhou = zhou - 1;
  }

  var secondDay = 0;
  switch (day) {
      case 7:
          secondDay = 1 + 1;
          break;
      case 1:
          secondDay = 1;
          break;
      case 2:
          secondDay = 1 + 5;
          break;
      case 3:
          secondDay = 1 + 4;
          break;
      case 4:
          secondDay = 1 + 3;
          break;
      case 5:
          secondDay = 1 + 2;
          break;
      case 6:
          secondDay = 1 + 1;
          break;
  }

  //获取当天Day
  var timesArray = [];
  timesArray[0] = 1 + (nums - day);
  for (var i = 1; i <= zhou - 1; i++) {
      if (i == 1) {
          timesArray[i] = timesArray[0] + 7;
      } else {
          timesArray[i] = timesArray[i - 1] + 7;
      }
  }

  //获取日期字符串数组
  var array = [];
  for (var j = 0, len = timesArray.length; j <= len; j++) {
      var item = timesArray[j];
      if (item > 0 && item <= days) {
          var itemStr = year + `-` + month + `-` + item;
          array.push(itemStr);
      }
  }

  var parentDate;
  if (array.length > 0) {
      if (array.length > weeks - 1) {
          parentDate = array[weeks - 1];
      } else {
          parentDate = array[array.length - 1];
      }
  }
  return parentDate;
}

//计算节日时间到今天的时间差，参数格式为 YYYY-MM-DD (日期差的绝对值)
function sumTimeToNow(targetTime, nowTime){
  let diff = (new Date(targetTime.replace(/-/g, '/'))).getTime() - (new Date(nowTime.replace(/-/g, '/'))).getTime()//日期的差值，有正负
  const absTime = Math.abs(diff) //日期差的绝对值
  let formatTimeDiff = parseInt(absTime / (3600 * 1000 * 24))
  return formatTimeDiff
}

//计算今天到下次节日时间的时间差，参数格式为 YYYY-MM-DD
function diffTimeToDaily(nowTime, targetTime){
  let diff = (new Date(nowTime.replace(/-/g, '/'))).getTime() - (new Date(targetTime.replace(/-/g, '/'))).getTime()//日期的差值，有正负
  const absTime = Math.abs(diff) //日期差的绝对值
  let formatTimeDiff = parseInt(absTime / (3600 * 1000 * 24))
  return formatTimeDiff
}

//计算各年度夏三伏的入伏日期
function calculateSanFuDates(currentYear) {
  var date1 = 0, date2 = 0, date3 = 0, date4 = 0, date5 = 0, date6 = 0;

  if (currentYear < 2100 && currentYear > 1999) {
      // 取后2位
      var objvalue = currentYear - 2000;
      // objvalue2尾数
      var objvalue2 = objvalue;
      // 大于80减80
      if (objvalue > 80) objvalue -= 80;
      // 大于40减40
      if (objvalue > 40) objvalue -= 40;
      // 除以4结果取整数
      objvalue = parseInt(objvalue / 4);
      // 后2位为奇数,加5.
      if (objvalue2 % 2 == 1)
          objvalue += 5;
      // 求庚日
      var num = 11 - objvalue;
      if (num > 1)
          date6 = 10;
      else
          date6 = 20;
      // 初伏庚日
      date1 = date6 + num;
      // 中伏庚日
      date2 = date1 + 10;

      // 求中伏天数
      if (date1 > 18) {
          date3 = 10;
      } else {
          date3 = 20;
      }

      // 末伏庚日
      date4 = date2 + date3 - 31;
      // 出伏日期
      date5 = date4 + 10;

      // 返回结果数组
      return [
          { name: "初伏", startDate: new Date(currentYear, 6, date1), endDate: new Date(currentYear, 6, date1 + date3 - 1), days: date3 },
          { name: "中伏", startDate: new Date(currentYear, 6, date2), endDate: new Date(currentYear, 6, date2 + date3 - 1), days: date3 },
          { name: "末伏", startDate: new Date(currentYear, 7, date4), endDate: new Date(currentYear, 7, date4 + 9), days: 10 }
      ];
  } else {
      console.log("计算各年度夏三伏的入伏日期-传入年份超出2000年-2099年范围");
      return null;
  }
}

//计算各年度夏季梅雨期的日期
function calculateMeiYuSeason(currentYear, mangZhongDate, xiaoshuDate) {
  var startDay, endDay, duration;

  if (currentYear < 2100 && currentYear > 1999 && mangZhongDate instanceof Date && xiaoshuDate instanceof Date) {
    // 根据推算逻辑，梅雨季开始日期为庚子日后的第一个丙午日
    var meiyuStartDay = mangZhongDate.getDate() + 6; // 芒种日后的第7天
    startDay = new Date(mangZhongDate.getFullYear(), mangZhongDate.getMonth(), meiyuStartDay);

    // 根据推算逻辑，梅雨季结束日期在小暑后的第一个辛未日结束
    var dayOfWeek = xiaoshuDate.getDay();
    if (dayOfWeek === 6) { // 如果小暑日是周六
       endDay = xiaoshuDate; // 梅雨季结束日期就是小暑日期
    } else {
        // 找到小暑日后的第一个周六
        var daysToAdd = 6 - dayOfWeek;
        endDay = new Date(xiaoshuDate.getFullYear(), xiaoshuDate.getMonth(), xiaoshuDate.getDate() + daysToAdd);
    }

    duration = Math.ceil((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1; // 持续天数
      return {
        startDate: startDay,
        endDate: endDay,
        duration: duration
      };
  } else {
      console.log("计算各年度梅雨期的日期-传入年份超出2000年-2099年范围");
      return null;
  }
}

//计算各年度冬季四九天的日期
function calculateSanjiuSeason(currentYear, dongzhiDate) {
  var sanjiuDays = []; // 存储四九天的信息
  var startDay, endDay, name;
  
  if (currentYear < 2100 && currentYear > 1999 && dongzhiDate instanceof Date) {
      for (var i = 1; i <= 4; i++) {
          startDay = new Date(dongzhiDate);
          startDay.setDate(startDay.getDate() + (i - 1) * 9); // 计算三九天的开始日期
          endDay = new Date(dongzhiDate);
          endDay.setDate(endDay.getDate() + i * 9 - 1); // 计算三九天的结束日期
          
          if (i === 1) {
              name = "一九";
          } else if (i === 2) {
              name = "二九";
          }  else if (i === 3) {
              name = "三九";
          }else {
              name = "四九";
          }

          sanjiuDays.push({
              name: name,
              startDate: startDay,
              endDate: endDay
          });
      }
      
      return sanjiuDays;
  } else {
      console.log("计算各年度冬季四九天的日期-传入年份超出2000年-2099年范围");
      return null;
  }
}

//获取包含中文的字符串字节长度
function getTextLength(str){
  var length = 0;
  for(var i=0;i<str.length;i++){
      var code = str.charCodeAt(i);
      if(code >= 0 && code <= 127){
          length++;
      }else{
          length+=2;
      }
  }
  return length;
}

module.exports = {
  conversion,          // 返回农历year年中哪个月是闰月，没有闰月返回0
  solar2lunar,      // 返回农历year年闰月的天数（如果没有闰月则返回0）
  sumTimeToNow,      // 返回计算节日时间到今天的时间差
  lunar2solarOffset,
  diffTimeToDaily,
  conversionTerm,
  conversionParentDate,
  lYearDays,   //农历year年的总天数
  calculateSanFuDates,   //返回三伏天
  calculateMeiYuSeason, //返回梅雨期
  calculateSanjiuSeason //返回三九天
}
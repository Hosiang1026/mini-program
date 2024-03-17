/**
 * 节日数据配置表
 * @charset UTF-8
 * @Version 1.0.3
 */
//是否需要推送纪念日，需要填true，否则填false （不需要加引号）
let open =  true;
//法定节假日列表(每年根据国务院公布情况)
const legal = new Array(
      {
          name:'元旦',
          date: '01-01',
          repair: 0,
          holiday: ['12-30','12-31','01-01']
      },
      {
          name:'春节',
          date: '02-10',
          repair: ['02-04','02-18'],
          holiday: ['02-10','02-11','02-12','02-13','02-14','02-15','02-16','02-17']
      },
      {
          name:'清明节',
          date: '04-04',
          repair: ['04-07'],
          holiday: ['04-04','04-05','04-06']
      },
      {
          name:'劳动节',
          date: '05-01',
          repair: ['04-28','05-11'],
          holiday: ['05-01','05-02','05-03','05-04','05-05']
      },
      {
          name:'端午节',
          date: '06-10',
          repair: 0,
          holiday: ['06-08','06-09','06-10']
      },
      {
          name:'中秋节',
          date: '09-17',
          repair: ['09-14'],
          holiday: ['09-15','09-16','09-17']
      },
      {
          name:'国庆节',
          date: '10-01',
          repair: ['09-29','10-12'],
          holiday: ['10-01','10-02','10-03','10-04','10-05','10-06','10-07']
      }
  );

//阳历节日列表
const sFtv = new Array(
    {
        name:'情人节',
        date: '02-14'
    },
    {
        name:'妇女节',
        date: '03-08'
    },
    {
        name:'植树节',
        date: '03-12'
    },
    {
        name:'消费者权益日',
        date: '03-15'
    },
    {
        name:'愚人节',
        date: '04-01'
    },

    {
        name:'青年节',
        date: '05-04'
    },
    {
        name:'护士节',
        date: '05-12'
    },
    {
        name:'网络情人节',
        date: '05-20'
    },
    {
        name:'儿童节',
        date: '06-01'
    },
    {
        name:'香港回归纪念日',
        date: '07-01'
    },
    {
        name:'建军节',
        date: '08-01'
    },
    {
        name:'抗战胜利纪念日',
        date: '09-03'
    },
    {
        name:'教师节',
        date: '09-10'
    },
    {
        name:'九一八事变纪念日',
        date: '09-18'
    },
    {
        name:'万圣节',
        date: '11-01'
    },
    {
        name:'网络单身节',
        date: '11-11'
    },
    {
        name:'澳门回归纪念日',
        date: '12-20'
    },
    {
        name:'平安夜',
        date: '12-24'
    },
    {
        name:'圣诞节',
        date: '12-25'
    },
);

//阴历节日列表
const lFtv = new Array(
  {
      name:'上元节',
      date: '01-15'
  },
  {
      name:'龙头节',
      date: '02-02'
  },
  {
      name:'佛诞节',
      date: '04-08'
  },
  {
      name:'七夕节',
      date: '07-07'
  },
  {
      name:'中元节',
      date: '07-15'
  },
  {
      name:'重阳节',
      date: '09-09'
  },
  {
      name:'下元节',
      date: '10-15'
  },
  {
      name:'腊八节',
      date: '12-08'
  },
  {
      name:'北小年',
      date: '12-23'
  },
  {
      name:'南小年',
      date: '12-24'
  },
  {
      name:'江浙沪小年',
      date: '12-29'
  },
  {
      name:'除夕',
      date: '12-30'
  }
);

//二十四节气列表
const term = new Array(
  {
      sort: 1,
      name:'立春',
      month: '02'
  },
  {
      sort: 2,
      name:'雨水',
      month: '02'
  },
  {
      sort: 3,
      name:'惊蛰',
      month: '03'
  },
  {
      sort: 4,
      name:'春分',
      month: '03'
  },
  {
      sort: 5,
      name:'谷雨',
      month: '04'
  },
  {
      sort: 7,
      name:'立夏',
      month: '05'
  },
  {
      sort: 8,
      name:'小满',
      month: '05'
  },
  {
      sort: 9,
      name:'芒种',
      month: '06'
  },
  {
      sort: 10,
      name:'夏至',
      month: '06'
  },
  {
      sort: 11,
      name:'小暑',
      month: '07'
  },
  {
      sort: 12,
      name:'大暑',
      month: '07'
  },
  {
      sort: 13,
      name:'立秋',
      month: '08'
  },
  {
      sort: 14,
      name:'处暑',
      month: '08'
  },
  {
      sort: 15,
      name:'白露',
      month: '09'
  },
  {
      sort: 16,
      name:'秋分',
      month: '09'
  },
  {
      sort: 17,
      name:'寒露',
      month: '10'
  },
  {
      sort: 18,
      name:'霜降',
      month: '10'
  },
  {
      sort: 19,
      name:'立冬',
      month: '11'
  },
  {
      sort: 20,
      name:'小雪',
      month: '11'
  },
  {
      sort: 21,
      name:'大雪',
      month: '12'
  },
  {
      sort: 22,
      name:'冬至',
      month: '12'
  },
  {
      sort: 23,
      name:'小寒',
      month: '01'
  },
  {
      sort: 24,
      name:'大寒',
      month: '01'
  }
);

//特殊节日列表
const special = new Array(
  {
      name:'母亲节',
      date: '05/2/7'
  },
  {
      name:'父亲节',
      date: '06/3/7'
  },
  {
      name:'感恩节',
      date: '11/4/4'
  }
);

  module.exports = {
    legal,          // 法定节假日列表
    sFtv,           // 阳历节日列表
    lFtv,           // 阴历节日列表
    term,           // 二十四节气列表
    special,        // 特殊节日列表
  }
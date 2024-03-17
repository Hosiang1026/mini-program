/**
 * 数据配置表
 * Hello图床 https://www.helloimg.com
 * Hosiang1026/123456
 * @charset UTF-8
 * @Version 1.0.3
 */
//HOWE搭配列表
const howeWarItems = new Array(
    {id:'1',title:'夏季搭配-01',date:'农历：04-01、04-15、05-01、05-15、06-01',cover:'https://vip.helloimg.com/images/2023/12/05/oQkC79.jpg'},
    {id:'2',title:'夏季搭配-02',date:'农历：04-08、04-23、05-08、05-23、06-08',cover:'https://vip.helloimg.com/images/2023/12/05/oQkswh.jpg'},
    {id:'3',title:'夏季搭配-03',date:'农历：06-15、07-01、07-15、08-01、08-15',cover:'https://vip.helloimg.com/images/2023/12/05/oQkAxq.jpg'},
    {id:'4',title:'夏季搭配-04',date:'农历：06-23、07-08、07-23、08-08、08-23',cover:'https://vip.helloimg.com/images/2023/12/05/oQk5PE.jpg'},
    {id:'5',title:'冬季搭配-01',date:'农历：10-01、02-16',cover:'https://vip.helloimg.com/images/2023/12/06/opZEvu.jpg'},
    {id:'6',title:'冬季搭配-02',date:'农历：10-16、11-16、12-16、01-16',cover:'https://vip.helloimg.com/images/2023/12/05/oQgizX.jpg'},
    {id:'7',title:'冬季搭配-03',date:'农历：11-01、12-01、01-01',cover:'https://vip.helloimg.com/images/2023/12/06/opZsqE.jpg'},
    {id:'8',title:'冬季搭配-04',date:'农历：02-01',cover:'https://vip.helloimg.com/images/2023/12/05/oQgq5S.jpg'},
    {id:'9',title:'春秋搭配-01',date:'农历：03-01、03-16',cover:'https://vip.helloimg.com/images/2023/12/06/opZRf1.jpg'},
    {id:'10',title:'春秋搭配-02',date:'农历：03-08、03-23',cover:'https://vip.helloimg.com/images/2023/12/05/oQg1ob.jpg'},
    {id:'11',title:'春秋搭配-03',date:'农历：09-01、09-16',cover:'https://vip.helloimg.com/images/2023/12/06/opZFTb.jpg'},
    {id:'12',title:'春秋搭配-04',date:'农历：09-08、09-23',cover:'https://vip.helloimg.com/images/2023/12/06/opZCsr.jpg'}
  );

//FANG搭配列表
const fangWarItems = new Array(
  {id:'1',title:'夏季搭配-01',date:'',cover:'/static/image/fang/summer/dress001.jpg'},
  //{id:'2',title:'夏季搭配-02',cover:'/static/image/howe/winter/dress001.jpg'},
);

//OTHER搭配列表
const otherWarItems = new Array(
  {id:'1',title:'HOWE夏季晒衣',date:'',cover:'https://vip.helloimg.com/images/2023/12/05/oQkZtg.jpg'},
  {id:'2',title:'HOWE夏季睡衣',date:'',cover:'https://vip.helloimg.com/images/2023/12/05/oQgVwC.jpg'},
  {id:'3',title:'HOWE冬季睡衣',date:'',cover:'https://vip.helloimg.com/images/2023/12/07/opb4n0.jpg'},
  {id:'4',title:'HOWE日常运动鞋',date:'',cover:'https://vip.helloimg.com/images/2023/12/06/opm3rS.jpg'},
  //{id:'4',title:'FANG夏季睡衣-01',cover:'/static/image/howe/spring/dress001.jpg'},
  //{id:'5',title:'FANG冬季睡衣-01',cover:'/static/image/howe/spring/dress001.jpg'}
);

//HOWE夏季搭配-01
const howeDreSummerOne = new Array(
  {title:'短袖衬衫1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkC79.jpg'},
  {title:'短袖衬衫2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkBnY.jpg'},
  {title:'短袖衬衫3',cover:'https://vip.helloimg.com/images/2023/12/05/oQkxD5.jpg'},
  {title:'长裤1',cover:'https://vip.helloimg.com/images/2023/12/05/oQk3gR.jpg'},
  {title:'长裤2',cover:'https://vip.helloimg.com/images/2023/12/05/oQk1Wn.jpg'},
  {title:'长裤3',cover:'https://vip.helloimg.com/images/2023/12/05/oQkowM.jpg'}
);

//HOWE夏季搭配-02
const howeDreSummerTwo = new Array(
  {title:'短袖1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkswh.jpg'},
  {title:'短袖2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkthc.jpg'},
  {title:'长裤1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkaq6.jpg'},
  {title:'长裤2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkFhP.jpg'}
);

//HOWE夏季搭配-03
const howeDreSummerThree = new Array(
  {title:'短袖1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkAxq.jpg'},
  {title:'短袖2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkJC0.jpg'},
  {title:'短裤1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkqHA.jpg'},
  {title:'短裤2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkePz.jpg'}
);

//HOWE夏季搭配-04
const howeDreSummerFour = new Array(
  {title:'短袖',cover:'https://vip.helloimg.com/images/2023/12/05/oQk5PE.jpg'},
  {title:'短裤',cover:'https://vip.helloimg.com/images/2023/12/05/oQkm4m.jpg'}
);

//HOWE冬季搭配-01
const howeDreWinterOne = new Array(
  {title:'黑色马甲',cover:'https://vip.helloimg.com/images/2023/12/06/opZEvu.jpg'},
  {title:'黑色外套',cover:'https://vip.helloimg.com/images/2023/12/06/opZxtt.jpg'},
  {title:'白色卫衣',cover:'https://vip.helloimg.com/images/2023/12/05/oQgJYt.jpg'},
  {title:'牛仔裤',cover:'https://vip.helloimg.com/images/2023/12/05/oQgt2v.jpg'},
  {title:'长裤',cover:'https://vip.helloimg.com/images/2023/12/06/opRVeA.jpg'},
  {title:'运动裤1',cover:'https://vip.helloimg.com/images/2023/12/06/opRzKX.jpg'},
  {title:'运动裤2',cover:'https://vip.helloimg.com/images/2023/12/06/opRvmu.jpg'},
);

//HOWE冬季搭配-02
const howeDreWinterTwo = new Array(
  {title:'黑色外套',cover:'https://vip.helloimg.com/images/2023/12/05/oQgizX.jpg'},
  {title:'卡其色外套',cover:'https://vip.helloimg.com/images/2023/12/05/oQgSi9.jpg'},
  {title:'红色毛衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZPUo.jpg'},
  {title:'灰色毛衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZX7C.jpg'},
  {title:'牛仔裤1',cover:'https://vip.helloimg.com/images/2023/12/06/opRjFm.jpg'},
  {title:'牛仔裤2',cover:'https://vip.helloimg.com/images/2023/12/06/opRYT5.jpg'},
  {title:'内衣1',cover:'https://vip.helloimg.com/images/2023/12/06/opRK56.jpg'},
  {title:'内衣2',cover:'https://vip.helloimg.com/images/2023/12/06/opR6zP.jpg'},
  {title:'白色衬衫',cover:'https://vip.helloimg.com/images/2023/12/06/opRyzc.jpg'},
);

//HOWE冬季搭配-03
const howeDreWinterThree = new Array(
  {title:'黑色外套',cover:'https://vip.helloimg.com/images/2023/12/06/opZsqE.jpg'},
  {title:'浅灰外套',cover:'https://vip.helloimg.com/images/2023/12/07/opbitc.jpg'},
  {title:'红色毛衣',cover:'https://vip.helloimg.com/images/2023/12/05/oQg4KE.jpg'},
  {title:'黑色毛衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZ1FD.jpg'},
  {title:'长裤1',cover:'https://vip.helloimg.com/images/2023/12/06/opRkYz.jpg'},
  {title:'长裤2',cover:'https://vip.helloimg.com/images/2023/12/06/opRgvR.jpg'},
  {title:'内衣1',cover:'https://vip.helloimg.com/images/2023/12/06/opRUsn.jpg'},
  {title:'内衣2',cover:'https://vip.helloimg.com/images/2023/12/06/opR0YE.jpg'},
  {title:'浅蓝衬衫',cover:'https://vip.helloimg.com/images/2023/12/06/opZBBq.jpg'},
);

//HOWE冬季搭配-04
const howeDreWinterFour = new Array(
  {title:'黑色外套',cover:'https://vip.helloimg.com/images/2023/12/05/oQgq5S.jpg'},
  {title:'皮质外套',cover:'https://vip.helloimg.com/images/2023/12/06/opZqBQ.jpg'},
  {title:'西服',cover:'https://vip.helloimg.com/images/2023/12/06/opZJfv.jpg'},
  {title:'毛衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZ3nS.jpg'},
  {title:'运动裤',cover:'https://vip.helloimg.com/images/2023/12/06/opRwdv.jpg'},
);

//HOWE春秋搭配-01
const howeDreSpringOne = new Array(
  {title:'红色卫衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZRf1.jpg'},
  {title:'蓝色卫衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZoeK.jpg'},
);

//HOWE春秋搭配-02
const howeDreSpringTwo = new Array(
  {title:'POLO衫',cover:'https://vip.helloimg.com/images/2023/12/05/oQg1ob.jpg'},
  {title:'毛衣',cover:'https://vip.helloimg.com/images/2023/12/05/oQgEdQ.jpg'},
);

//HOWE春秋搭配-03
const howeDreSpringThree = new Array(
  {title:'黑色卫衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZFTb.jpg'},
  {title:'灰色卫衣',cover:'https://vip.helloimg.com/images/2023/12/06/opZGvT.jpg'},
);

//HOWE春秋搭配-04
const howeDreSpringFour = new Array(
  {title:'白色毛衣',cover:'https://vip.helloimg.com/images/2023/12/06/opRfK0.jpg'},
  {title:'白色毛衣',cover:'https://vip.helloimg.com/images/2023/12/05/oQgLoY.jpg'},
  {title:'黑色外套',cover:'https://vip.helloimg.com/images/2023/12/06/opZCsr.jpg'},
  {title:'牛仔外套',cover:'https://vip.helloimg.com/images/2023/12/05/oQgsXu.jpg'},
  {title:'蓝白外套',cover:'https://vip.helloimg.com/images/2023/12/05/oQgxsC.jpg'},
);

//HOWE其他搭配-01
const howeDreOtherOne = new Array(
  {title:'防晒衣1',cover:'https://vip.helloimg.com/images/2023/12/05/oQkZtg.jpg'},
  {title:'防晒衣2',cover:'https://vip.helloimg.com/images/2023/12/05/oQkRCX.jpg'}
);

//HOWE其他搭配-02
const howeDreOtherTwo = new Array(
  {title:'篮球服1',cover:'https://vip.helloimg.com/images/2023/12/05/oQgVwC.jpg'},
  {title:'篮球服2',cover:'https://vip.helloimg.com/images/2023/12/05/oQgYfQ.jpg'},
  {title:'篮球服3',cover:'https://vip.helloimg.com/images/2023/12/06/opRuih.jpg'},
  {title:'睡衣1',cover:'https://vip.helloimg.com/images/2023/12/05/oQghqt.jpg'},
  {title:'睡衣2',cover:'https://vip.helloimg.com/images/2023/12/06/opRDog.jpg'},
  {title:'睡衣3',cover:'https://vip.helloimg.com/images/2023/12/06/opRIiM.jpg'},
  {title:'睡衣4',cover:'https://vip.helloimg.com/images/2023/12/05/oQguUv.jpg'},
  {title:'篮球短裤',cover:'https://vip.helloimg.com/images/2023/12/05/oQgjTu.jpg'},
);

//HOWE其他搭配-03
const howeDreOtherThree = new Array(
  {title:'睡衣1',cover:'https://vip.helloimg.com/images/2023/12/07/opb4n0.jpg'},
  {title:'睡衣2',cover:'https://vip.helloimg.com/images/2023/12/06/opRp29.jpg'},
  {title:'长睡袍',cover:'https://vip.helloimg.com/images/2023/12/06/opRQXY.jpg'},
);

//HOWE其他搭配-04
const howeDreOtherFour = new Array(
  {title:'蓝白网面运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opmsQE.jpg'},
  {title:'红白网面运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opmmLv.jpg'},
  {title:'网面运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opme3C.jpg'},
  {title:'白色运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opm3rS.jpg'},
  {title:'黑白运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opmqlQ.jpg'},
  {title:'白色椰子鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opmx6t.jpg'},
  {title:'白色运动鞋',cover:'https://vip.helloimg.com/images/2023/12/06/opmJRu.jpg'},
);

//FANG夏季搭配-01
const fangDreSummerOne = new Array(
  {title:'短袖1',cover:'/static/image/fang/summer/dress001.jpg'},
  {title:'短袖2',cover:'/static/image/fang/summer/dress001.jpg'},
  {title:'短袖3',cover:'/static/image/fang/summer/dress001.jpg'},
  {title:'短袖4',cover:'/static/image/fang/summer/dress001.jpg'},
);

  module.exports = {
    howeWarItems,          // HOWE搭配列表
    fangWarItems,          // FANG搭配列表
    otherWarItems,         // OTHER搭配列表

    howeDreSummerOne,     //HOWE夏季搭配-01
    howeDreSummerTwo,     //HOWE夏季搭配-02
    howeDreSummerThree,   //HOWE夏季搭配-03
    howeDreSummerFour,    //HOWE夏季搭配-04

    howeDreWinterOne,     //HOWE冬季搭配-01
    howeDreWinterTwo,     //HOWE冬季搭配-02
    howeDreWinterThree,   //HOWE冬季搭配-03
    howeDreWinterFour,    //HOWE冬季搭配-04

    howeDreSpringOne,     //HOWE春秋搭配-01
    howeDreSpringTwo,     //HOWE春秋搭配-02
    howeDreSpringThree,   //HOWE春秋搭配-03
    howeDreSpringFour,    //HOWE春秋搭配-04

    howeDreOtherOne,     //HOWE其他搭配-01
    howeDreOtherTwo,     //HOWE其他搭配-02
    howeDreOtherThree,   //HOWE其他搭配-03
    howeDreOtherFour,    //HOWE其他搭配-04

    fangDreSummerOne,    //FANG夏季搭配-01
  }
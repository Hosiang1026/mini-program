//获取应用实例
const app = getApp()
var db = require("../../utils/db.js");
Page({
  data:{
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
     // 此页面 页面内容距最顶部的距离
     height: app.globalData.height * 2 + 20 , 
     headTitle:"",
     inputShowed:false,
     inputVal:"",
     kjsearchList:[],
     item_tab:0,
     item_id:0,
     itemDate:"",
     items:[],
     tempItems:[],
     winHeight:0,
     winWidth:0,
     searchKeyWords:'',
     placeholderWords:'请输入搜索关键词...'
  },
  showInput:function(){
    this.setData({
      inputShowed:true
    });
  },
  hideInput:function(){
    this.setData({
      inputVal:"",
      inputShowed:false
    })
  },
  clearInput:function(){
    this.setData({
      inuptVal:""
    })
  },
  inputTyping:function(e){
    this.setData({
      inputVal:e.detail.value
    })
  },
  collectApi:function(e){
    console.log("此处进行收藏！");
  },
  
  handlePreviewImg:function(e){
    // 获取到消息区中的所有图片的数组
    const msgImgs = this.data.items.map(item => item.cover);
    //接收传递过来的图片url
    const current = e.currentTarget.dataset.cover;
    console.log('imgClick success',current)
    wx.previewImage({
      current: current, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: msgImgs,
      success:(res=>{
        console.log('预览图片成功',res)
      })
    })
  },
  onLoad:function(options){
    let that=this;
    var tempItems = [];
    that.setData({ 
      item_tab: options.current_tab,
      item_id: options.item_id,
      itemDate: options.itemDate,
      headTitle: options.item_title
   })

    if(options.current_tab == "0"){
      if(options.item_id == "1"){
        tempItems = db.howeDreSummerOne
      }
      if(options.item_id == "2"){
          tempItems = db.howeDreSummerTwo
      }
      if(options.item_id == "3"){
          tempItems = db.howeDreSummerThree
      }
      if(options.item_id == "4"){
          tempItems = db.howeDreSummerFour
      }
      if(options.item_id == "5"){
          tempItems = db.howeDreWinterOne
      }
      if(options.item_id == "6"){
          tempItems = db.howeDreWinterTwo
      }
      if(options.item_id == "7"){
          tempItems = db.howeDreWinterThree
      }
      if(options.item_id == "8"){
          tempItems = db.howeDreWinterFour
      }
      if(options.item_id == "9"){
          tempItems = db.howeDreSpringOne
      }
      if(options.item_id == "10"){
          tempItems = db.howeDreSpringTwo
      }
      if(options.item_id == "11"){
          tempItems = db.howeDreSpringThree
      }
      if(options.item_id == "12"){
          tempItems = db.howeDreSpringFour
      }
    }

    if(options.current_tab == "1"){
      if(options.item_id == "1"){
          tempItems = db.fangDreSummerOne
      }
    }
    if(options.current_tab == "2"){
      if(options.item_id == "1"){
          tempItems = db.howeDreOtherOne
      }
      if(options.item_id == "2"){
          tempItems = db.howeDreOtherTwo
      }
      if(options.item_id == "3"){
          tempItems = db.howeDreOtherThree
      }
      if(options.item_id == "4"){
          tempItems = db.howeDreOtherFour
      }
    }

    that.setData({ 
      items: tempItems,
      tempItems: tempItems
    })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth
        })
      }
    })
    //this.search('');
  },
  searchKeyWords:function(e){
    console.log("搜索开始了了！");
    let that=this;
    if(that.data.searchKeyWords==that.data.placeholderWords){
      return;
    }
    that.search(that.data.searchKeyWords);
  },
  searchKeyWordsFast:function(e){
    this.search(e.currentTarget.dataset.keyword);
  },
  search(queryWords){
    console.log("当前搜索关键词："+queryWords);
    let that=this;
    // 声明一个空数组
    var resultArr = [];
    let mergedArray = that.data.tempItems;
    for (let i = 0; i < mergedArray.length; i++) {  //遍历数据库对象集合
      if (mergedArray[i].title.indexOf(queryWords) != -1) { 
        resultArr.push(mergedArray[i]); // 添加元素
      }
    }
    if(resultArr.length == 0){
      wx.showToast({
        title: '未搜索到信息',
        icon: 'error',
        duration: 2500
      });
    }
    that.setData({
      items:resultArr
    }) 
  },
  getKeywords:function(e){
    // this.setData({
    //   searchKeyWords:e.detail.value
    // })
    var searchKeyWords = e.detail.value;
    if(searchKeyWords.length > 0){
      this.search(searchKeyWords);
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
function  randomChar()  {
  var l=Math.random()*10;
  var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
  var  tmp="";
  var timestamp = new Date().getTime();
  for(var  i=0;i<  l;i++)  {
  tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
  }
  return  timestamp+tmp;
}
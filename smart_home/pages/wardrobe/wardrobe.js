var app = getApp()
var db = require("../../utils/db.js");
Page({
  data: {
    userInfo: {},
    items:[],
    barTitle:[{'name':'HOWE',currentTab:0},
              {'name':'FANG',currentTab:1},
              {'name':'OTHER',currentTab:2}
            ],
    winHeight:0,
    winWidth:0,
    currentTab:0
  },
  previewDress(e) {
    var that = this
    const item = e.currentTarget.dataset.id;
    const itemId = item.id;
    const itemTitle = item.title;
    const itemDate = item.date;
    const currentTab = that.data.currentTab;
    wx.navigateTo({
      url: '/pages/dress/dress?current_tab=' + currentTab + '&item_id=' + itemId + '&item_title=' + itemTitle+ '&itemDate=' + itemDate
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swichNav:function(e){
    var current_tab = e.currentTarget.dataset.currenttab;
    this.setData({
      currentTab:current_tab
    })
    if(current_tab == 0){
      this.setData({
        items:db.howeWarItems
      })
    }
    if(current_tab == 1){
      this.setData({
        items:db.fangWarItems
      })
    }
    if(current_tab == 2){
      this.setData({
        items:db.otherWarItems
      })
    }
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      items:db.howeWarItems
    })
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth
        })
      }
    })
  }
})

// 获取应用实例
const app = getApp()
Page({
  data:{  
    markers:[
              {
                id: 1,
                longitude:"116.55271072410581",
                latitude:"30.3649855304188",
                iconPath: '/static/image/navi.png',
                width:"100rpx",
                height:"100rpx",
                callout: {
                        content: '郝家大屋',
                        color: '#ff0000',
                        fontSize: 14,
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: '#000000',
                        bgColor: '#fff',
                        padding: 5,
                        display: 'ALWAYS',
                        textAlign: 'center'
                        }
              },
            ],
    circle:[
      {
        latitude:"30.3649855304188",
        longitude:"116.55271072410581",
        color:"#66ff00",
        fillColor:"#66ff00",
        radius:10,
      }
    ]
  },
    
  bindmarkertap(e){

    wx.openLocation({
      longitude:116.55271072410581,
      latitude:30.3649855304188,
      scale:18
    })
  },

})

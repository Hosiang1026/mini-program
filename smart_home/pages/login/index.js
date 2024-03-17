//index.js
//获取应用实例
const md5 = require('../../utils/md5/md5.js');
const app = getApp()
 let username=''
 let password=''
Page({
  data: {
    username: '',
    password: '',
    clientHeight:''
  },
  database: [
    {
      username: 'howe',
      password: '91e5457c86ccc83ff7a7b75b5bca537b'
    }, 
    {
      username: 'fang',
      password: '91e5457c86ccc83ff7a7b75b5bca537b'
    }
  ],
  onLoad(){
    this.goCache();
    var that=this
    wx.getSystemInfo({ 
      success: function (res) { 
        console.log(res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }) 
  },

  //获取输入内容
  getPhone(event){
    username=event.detail.value
  },
  getPassword(event){
    password=event.detail.value
  },
  encryptPassword(password) {
    const salt = 'howe_salt'; // 加盐串
    return md5(`${password}${salt}`);
  },
  //自动获取缓存登录
  goCache(){
    let userCache = wx.getStorageSync('userinfo');
    if(userCache !== ""){
      let array = this.database;
      for (let i = 0; i < array.length; i++) {  //遍历数据库对象集合
        let userinfo = array[i];
        if(userinfo.username === userCache.username && userinfo.password == userCache.password){
          wx.switchTab({
            url: '/pages/index/index'
          })
          return;
        }
     }
    }
  },
  //登录事件
  goLogin(){
    let flag = false  //表示账户是否存在,false为初始值
    if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
      let array = this.database;
      const encryptedPassword = this.encryptPassword(password);
      for (let i = 0; i < array.length; i++) {  //遍历数据库对象集合
        let userinfo = array[i];
        if (username === userinfo.username) { //账户已存在
          flag=true;
          if (encryptedPassword !== userinfo.password) {  //判断密码正确与否
            wx.showToast({  //显示密码错误信息
              title: '密码错误！！',
              icon: 'error',
              duration: 2500
            });
            break;
          } else {
            wx.showToast({  //显示登录成功信息
              title: '登陆成功！！',
              icon: 'success',
              duration: 2500
            })
            flag=true;
            wx.setStorageSync('userinfo', userinfo);
            wx.switchTab({
              url: '/pages/index/index'
            })
            break;
          }
        }
      };
      //遍历完数据后发现没有该账户
      if(flag==false)
      {
        wx.showToast({
          title: '该用户不存在',
          icon: 'error',
          duration: 2500
        })
      }
    }
  },
})
 

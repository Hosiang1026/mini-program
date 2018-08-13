/* 请求URL路径 */
// 路径前缀

var HOST = "https://msg.it577.net:3001/";

// 本机调试环境
var DEBUG = false;

// 服务端部署环境
// if (!DEBUG) {
//   HOST = 'https://www.xiaoxizhushou.com/Home/';
//   getSessionURI = "wechat/minaLogin";
//   updateUnionIdURI = "wechat/updateUnionId";
// }

// 网站请求接口，统一为post
function post(request) {
  // console.log(request.uri);
  var head = getHeadJSON();
  //发起网络请求
  wx.request({
    url: HOST + request.uri,
    data: request.param,
    header: {
      "content-type": "application/json"
    },
    method: 'GET',
    success: function(res) {
      request.success(res);
    },
    fail: function(res) {
      console.log(res);
    }
  })
}

function getHeadJSON() {
  /**
   * RequestType 请求类型 APP：使用客户移动APP访问 PC：使用PC访问
   * DateTime 访问日期 YYYY-MM-DD
   * Version 版本号 空或APP版本号
   * UserNum 用户编号 当前登录的用户编号
   * UserType 用户类型
   * RetCode 服务返回结果
   * RetDesc 服务返回结果
   */
  var date = new Date();
  var month = date.getMonth() + 1;
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var currentdt = date.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-" + (today < 10 ? ("0" + today) : today) + " " + (hours < 10 ? ("0" + hours) : hours) + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
  var userId = wx.getStorageSync('userId');
  var openid = wx.getStorageSync('openid');
  var userType = wx.getStorageSync('userType');
  var weixinID = "";
  var alipayID = "";
  var reqHead = { "requestType": "weapp", "dateTime": currentdt, "version": "release v1.0", "userId": userId, "userType": userType, "retCode": "err", "retDesc": "err", openid: openid };
  return reqHead;
}

function validatCode(param) {
  post({
    uri: uri.validatCode,
    param: param,
    success: function (res) {
      cb(res)
    }
  });
}

// 导出模块
module.exports = {
  post: post
}
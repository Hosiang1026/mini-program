e32e3981e32e3981ff918a36450bae3a356dc6ab// 初始化AV
var Bmob = require('utils/init.js');
var Bmob = require('utils/bmob.js');
var http = require('utils/http')

App({
	apiTest: function () {
		http.post({
			uri: 'article/list',
			param: {},
			success: res => {
				console.log(res)
			}
		});
	},
	onLaunch: function () {
		var that = this;
		this.apiTest();
		that.login();
		// 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});
	},
	login: function() {
		var user =  new Bmob.User;
		    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
    	console.log('login');
		wx.login({

		        success: function (res) {
		          user.loginWithWeapp(res.code).then(function (user) {
		            var openid = user.get("authData").weapp.openid;
		            // console.log(user, 'user', user.id, res);
		            //更新openid
		            wx.setStorageSync('openid', openid)
		            if (user.get("nickName")) {

		              // 第二次登录，打印用户之前保存的昵称
		              // console.log(user.get("nickName"), 'res.get("nickName")');

		            } else {//注册成功的情况

		              var u = Bmob.Object.extend("_User");
		              var query = new Bmob.Query(u);
		              query.get(user.id, {
		                success: function (result) {
		                  wx.setStorageSync('own', result.get("uid"));
		                },
		                error: function (result, error) {
		                  console.log("查询失败");
		                }
		              });


		              //保存用户其他信息，比如昵称头像之类的
		              wx.getUserInfo({
		                success: function (result) {

		                  var userInfo = result.userInfo;
		                  var nickName = userInfo.nickName;
		                  var avatarUrl = userInfo.avatarUrl;

		                  var u = Bmob.Object.extend("_User");
		                  var query = new Bmob.Query(u);
		                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
		                  query.get(user.id, {
		                    success: function (result) {
		                      // 自动绑定之前的账号
		                      result.set('userInfo', {
		                      	nickname: nickName,
		                      	avatar: avatarUrl
		                      });
		                      // result.set('nickName', nickName);
		                      // result.set("userPic", avatarUrl);
		                      // result.set("openid", openid);
		                      result.save();

		                    }
		                  });

		                }
		              });


		            }

		          }, function (err) {
		            console.log(err, 'errr');
		          });

		        }
		      });

			}
		}
})
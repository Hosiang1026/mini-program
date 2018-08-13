/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @link http://blog.it577.net
 * @author 黄秀杰
 */

var Bmob = require('../../utils/bmob.js');
var that;

Page({
	data: {
		question: {},
		image_width: getApp().screenWidth / 4 - 10,
		user: {},
		answer_list: [],
		user_list: [],
		visual: 'none'
	},
	onLoad: function(options) {
		that = this;
		var objectId = options.objectId;
		that.setData({
			questionId: objectId
		});
		// 向Bmob请求详情页数据
		var Question = Bmob.Object.extend("question");
		//创建查询对象，入口参数是对象类的实例
		var query = new Bmob.Query(Question);
		query.include('user');
		//查询单条数据，第一个参数是这条数据的objectId值
		query.get(objectId, {
			success: function(result) {
			    // 查询成功，调用get方法获取对应属性的值
			    that.setData({
			    	question: result,
			    	user: result.get('user')
			    });
			},
			error: function(object, error) {
			    // 查询失败
			}
		});
		// 网络获取回答列表
		// 向Bmob请求详情页数据
		var Answer = Bmob.Object.extend("answer");
		//创建查询对象，入口参数是对象类的实例
		var query = new Bmob.Query(Answer);
		var question = Bmob.Object.createWithoutData("question", objectId);
		query.equalTo('question', question);
		query.include('user');
		//查询单条数据，第一个参数是这条数据的objectId值
		query.find({
			success: function(result) {
				// console.log(result);
				// 无记录
				if (result.length == 0) {
					that.setData({
						visual: 'block'
					});
				}
				var user_list = [];
				result.forEach(function (answer, index) {
					user_list[index] = answer.get('user');
				});
			    // 查询成功，调用get方法获取对应属性的值
			    that.setData({
			    	answer_list: result,
			    	user_list: user_list
			    });
			},
			error: function(object, error) {
			    // 查询失败
				console.log(error);
			
			}
		});
	},
	previewImage: function(e) {
	  	var current = e.currentTarget.dataset.current;
	  	wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: that.data.question.get("images") // 需要预览的图片http链接列表
		})
	},
	answer: function() {
		if (!that.data.answer) {
			wx.showModal({
				title: '回答内容不能为空',
				showCancel: false
			});
			return;
		}
		//创建类和实例
	    var Answer = Bmob.Object.extend("answer");
	    var answer = new Answer();
	    answer.set("content", that.data.answer);
	    // console.log(that.data.questionId);
	    answer.set("question", Bmob.Object.createWithoutData("question", that.data.questionId));
	    answer.set("user", Bmob.User.current());
	    //添加数据，第一个入口参数是null
	    answer.save(null, {
	        success: function(result) {
	          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
	            // console.log("日记创建成功, objectId:"+result.id);
	            wx.showToast({
	            	title: '回答成功',
	            	success: function () {
	            		setTimeout(function () {
				            wx.navigateBack();
	            		}, 500);
	            	}
	            });
	        },
	        error: function(result, error) {
	          // 添加失败
	          console.log('提交失败');
	          console.log(error);
	        }
	    });
	},
	contentInput: function(e) {
		var answer = e.detail.value;
		that.setData({
			answer: answer
		});
	}
})
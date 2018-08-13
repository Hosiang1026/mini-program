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
		question_list: [],
		user_list:[],
		page_index: 0,
		loadingTip: '上拉加载更多',
		has_more: true
	},
	onLoad: function () {
		that = this;
		that.loadQuestion();
		// wx.navigateTo({
		// 	url: '/qa/answer/answer?objectId=83395548c9'
		// });
	},
	loadQuestion: function () {
		var page_size = 10;
		var Question = Bmob.Object.extend("question");
		var query = new Bmob.Query(Question);
		query.descending('updatedAt');
		query.include('user');
		query.skip(that.data.page_index * page_size);
		query.limit(page_size);
		// 查询所有数据
		query.find({
		  success: function(results) {
        	// 关闭下拉刷新动画
        	wx.stopPullDownRefresh();
		  	// 存储请求到的数据
		  	var question_list = that.data.question_list;
		  	var user_list = that.data.user_list;
		  	// console.log(results);
		  	var user_list_new = [];
		  	for (var i = 0; i < results.length; i++) {
		  		user_list_new[i] = results[i].get('user');
		  	}
		  	// console.log(user_list_new);
		  	that.setData({
		  		question_list: question_list.concat(results),
		  		user_list: user_list.concat(user_list_new)
		  	});
		  	// 判断无更多数据
		  	if (results.length < page_size) {
		  		that.setData({
		  			loadingTip: '没有更多数据了',
		  			has_more: false
		  		});
		  	}
		  },
		  error: function(error) {
		    alert("查询失败: " + error.code + " " + error.message);
		  }
		});

	},
	request: function () {
		wx.navigateTo({
			url: '../request/request'
		});
	},
	onReachBottom: function () {
		if (!that.data.has_more) {
			return;
		}
		var page_index = that.data.page_index;
		that.setData({
			page_index: ++page_index
		});
		that.loadQuestion();
	},
	onPullDownRefresh: function () {
		that.setData({
			page_index: 0,
			question_list: [],
			has_more: true
		});
		that.loadQuestion();
	},
	showDetail: function(e) {
		var index = e.currentTarget.dataset.index;
		var objectId = that.data.question_list[index].id;
		wx.navigateTo({
			url: '../answer/answer?objectId=' + objectId
		});
	}
})
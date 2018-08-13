var Bmob = require('../../utils/bmob.js');
var that;
Page({
	data: {
		page_index: 0,
		article_list: [],
		loadingTip: '上拉加载更多'
	},
	onLoad: function () {
		// test
		// wx.navigateTo({
		// 	url: '../detail/detail?objectId=C8ZP999E'
		// });
		//. test
		// wx.navigateTo({
		// 	url: '../../video/detail/detail?objectId=7LxpEEEQ'
		// });
		that = this;
		that.loadArticle();
	},
	loadArticle: function () {
		var page_size = 10;
		var Article = Bmob.Object.extend("article");
		var query = new Bmob.Query(Article);
		// 按照priority逆序排列
		query.descending('priority');
		// 分页
		query.limit(page_size);
		query.skip(that.data.page_index * page_size);
		// 查询所有数据
		query.find({
			success: function(results) {
				// 请求成功将数据存入article_list
				that.setData({
					article_list: that.data.article_list.concat(results)
				});
				// 判断上拉加载状态
	        	if (results.length < page_size) {
	        		that.setData({
	        			loadingTip: '没有更多内容'
	        		});
	        	}
			},
			error: function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		});
	},
	showDetail: function (e) {
		// 获取wxml元素绑定的index值
		var index = e.currentTarget.dataset.index;
		// 取出objectId
		var objectId = that.data.article_list[index].id;
		// 跳转到详情页
		wx.navigateTo({
			url: '../detail/detail?objectId=' + objectId
		});
	},
	onReachBottom: function () {
		that.setData({
			page_index: ++that.data.page_index
		});
		that.loadArticle();
	}
});
var Bmob = require('../../utils/bmob.js');
var that;
Page({
  onLoad: function () {
    that = this;
    var Article = Bmob.Object.extend("article");
    var query = new Bmob.Query(Article);
    // 按照priority逆序排列
    query.descending('priority');
    // 查询所有数据
    query.find({
      success: function (results) {
        // 请求成功将数据存入article_list
        that.setData({
          article_list: results
        });
      },
      error: function (error) {
        alert("查询失败: " + error.code + " " + error.message);
      }
    });
  }
});


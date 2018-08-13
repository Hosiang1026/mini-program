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
		image_width: getApp().screenWidth / 4 - 10,
		loading: false,
		images: []
	},
	onLoad: function () {
		that = this;
	},
	bindSubmit: function(e) {
		// 判断是否正在上传图片
		// if (that.data.loading) {
		// 	return;
		// }
		var title = e.detail.value.title;
		var content = e.detail.value.content;
		if (!title) {
			wx.showModal({
				title: '标题不能空',
				showCancel: false
			});
		} else {
		    //创建类和实例
		    var Question = Bmob.Object.extend("question");
		    var question = new Question();
		    question.set("title", title);
		    question.set("content", content);
		    question.set("images", that.data.urlArr);
		    question.set("user", Bmob.User.current());
		    //添加数据，第一个入口参数是null
		    question.save(null, {
		        success: function(result) {
		          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
		            // console.log("日记创建成功, objectId:"+result.id);
		            wx.showToast({
		            	title: '提问成功',
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

		        }
		    });
		}
	},
	upImg: function () {
	    wx.chooseImage({
	      count: 9, // 默认9
	      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
	      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	      success: function (res) {
	        wx.showNavigationBarLoading()
	        that.setData({
	          loading: false
	        })
	        var urlArr = new Array();
	        // var urlArr={};
	        var tempFilePaths = res.tempFilePaths;
	        console.log(tempFilePaths)
	        // 追回图片数组
	        var images = that.data.images;
	        that.setData({
	        	images: images.concat(tempFilePaths)
	        });
	        var imgLength = tempFilePaths.length;
	        if (imgLength > 0) {
	          var newDate = new Date();
	          var newDateStr = newDate.toLocaleDateString();

	          var j = 0;
	          //如果想顺序变更，可以for (var i = imgLength; i > 0; i--)
	          for (var i = 0; i < imgLength; i++) {
	            var tempFilePath = [tempFilePaths[i]];
	            var extension = /\.([^.]*)$/.exec(tempFilePath[0]);
	            if (extension) {
	              extension = extension[1].toLowerCase();
	            }
	            var name = newDateStr + "." + extension;//上传的图片的别名      

	            var file = new Bmob.File(name, tempFilePath);
	            file.save().then(function (res) {
	            	// console.log(res);
	              wx.hideNavigationBarLoading()
	              var url = res.url();
	              console.log("第" + i + "张Url" + url);
	              urlArr.push(url);
	              console.log("urlArr");
	              console.log(urlArr);
	              j++;
	              console.log(j, imgLength);
	              // if (imgLength == j) {
	              //   console.log(imgLength, urlArr);
	              //如果担心网络延时问题，可以去掉这几行注释，就是全部上传完成后显示。
	                // showPic(urlArr, that)
	                that.setData({
	                	urlArr: urlArr,
	                	loading: true
	                });
	              // }

	            }, function (error) {
	              console.log(error)
	            });

	          }
	          //如果你突然发现这个文件传了又想立即删了，可以直接执行
	          // file.destroy();
	        }

	      }
	    })
  },
  previewImage: function (e) {
  	var current = e.currentTarget.dataset.current;
  	wx.previewImage({
	  current: current, // 当前显示图片的http链接
	  urls: that.data.images // 需要预览的图片http链接列表
	})
  },
  delete: function(e) {
  	// 获取本地显示的图片数组
  	var index = e.currentTarget.dataset.index;
  	var images = that.data.images;
  	images.splice(index, 1);
  	// 物理删除图片资源
  	var urlArr = that.data.urlArr;
  	var path;
	path = urlArr[index];
	console.log(path);
	var s = new Bmob.Files.del(path).then(function(res) {
		    if (res.msg == "ok") {
		        console.log('删除成功');
		    }
		},
		function(error) {
		    console.log(error)
	});
  	// 删除待存储的图片数组
  	urlArr.splice(index, 1);

  	that.setData({
  		images: images,
  		urlArr: urlArr
  	});
  }
})
// index.js
// 获取应用实例
var mqtt = require("../../utils/mqtt3/mqtt.min.js");
const { connect } = require("../../utils/mqtt4/mqtt");
var client=null

//本地EXMQ
const mqttPort = 8083; //mqtt 服务器域名/IP
const mqttHost = "broker.emqx.io"; //mqtt 服务器域名/IP
const mqttUrl = `wss://${mqttHost}:${mqttPort}/mqtt`; //  mqtt连接路径

//第三方MQTT
const yoyoMqttPort = 8084; //mqtt 服务器域名/IP
const yoyoMqttHost = "t.yoyolife.fun"; //mqtt 服务器域名/IP
const yoyoMqttUrl = `wxs://${yoyoMqttHost}/mqtt`; //  mqtt连接路径
const yoyoClientId = "howe"; //mqtt 客户端id
const yoyoUsername = "af85acc80224e685003283455f9cb139"; //mqtt 设备id
const yoyoPassword = "123456"; //mqtt 密码
const yoyoOptions={
  connectTimeout:4000,
  clientId: yoyoClientId,
  port: yoyoMqttPort,
  username: yoyoUsername,
  password: yoyoPassword
}

//巴法云MQTT
const bemfaMqttPort = 9504; //mqtt 服务器域名/IP
const bemfaMqttHost = "bemfa.com"; //mqtt 服务器域名/IP
const bemfaMqttUrl = `wxs://${bemfaMqttHost}:${bemfaMqttPort}/wss`; //  mqtt连接路径
const bemfaClientId = "541356867daf49acbcbedeffad4f6d10"; //mqtt 客户端id
const bemfaOptions={
 keepalive: 60, //60s ，表示心跳间隔
 clean: true, //cleanSession不保持持久会话
 protocolVersion: 4, //MQTT v3.1.1
 clientId: bemfaClientId
}

const yoyoSubTopic = "/iot/4311/sub/howe"; //  设备订阅topic（小程序发布命令topic）
const yoyoPubTopic = "/iot/4311/pub/howe"; //  设备发布topic（小程序订阅数据topic）

const deviceSubTopic = "HomeSub"; //  设备订阅topic（小程序发布命令topic）
const devicePubTopic = "HomePub"; //  设备发布topic（小程序订阅数据topic）

//const mpSubTopic = yoyoPubTopic;
//const mpPubTopic = yoyoSubTopic;

const mpSubTopic = devicePubTopic;
const mpPubTopic = deviceSubTopic;

const hefengVIP = false; //  和风天气是免费的api（false）还是付费api（true）
const hefengKey = "fb82f0603a4642fea2673acff1187750"; //  和风天气Web api的key 我自己的
const hefengApi = "https://api.qweather.com/v7"; //  和风天气付费API前缀
const hefengFreeApi = "https://devapi.qweather.com/v7"; //  和风天气免费API前缀
const hefengWeather = `${hefengVIP ? hefengApi : hefengFreeApi}/weather/now?`; //  和风天气实时天气api
const hefengAir = `${hefengVIP ? hefengApi : hefengFreeApi}/air/now?`; //  和风天气空气质量api
const todaylifeindex = "https://api.qweather.com/v7/indices/1d?"//当天天气生活指数
const geoApi = "https://geoapi.qweather.com/v2/city/lookup?" //  地理位置api（用来获取经纬度对应的城市/城区名字）

Page({
  data: {
    client: {},
    ppm: 0,
    temp: 0,
    humi: 0,
    Light: 0,
    Rains: 0,
    voltage: 0,
    LED0: false,
    LED1: false,
    LED2: false,
    LED3: false,
    BEEP: false,
    DOORSTATE: false,
    WINDOWSTATE: false,
    AIRFANSTATE: false,
    MOTORSTATE: false,
    area: "请求中", //城区
    city: "请求中", //城市
    airText: "请求中", //空气优良
    airValue: 0, //空气指数
    weather: "请求中", //天气
    todaylifeadvice: "请求中", // 体感温度
    pm2p5: "", //日期
    FAT: "", // 体感温度
  },

  // 事件处理函数
  onLoad() {
    //this.closeclick();
  },

  //”关闭“按钮处理函数函数
  closeclick: function() {
  var that = this
    //控制接口
    wx.request({
    url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
    method:"POST",
    data: {
      uid: bemfaClientId,
      topic: "test",
      msg:'{"target":"LED0","value":1}'
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      wx.showToast({
        title:'连接成功',
        icon:'success',
        duration:1000
      })
    }
  })
  },

  wechatVersion:function(){
    console.log('envVersion', __wxConfig.envVersion);
    let version = __wxConfig.envVersion;
    var that=this
    switch (version)
    {
      case 'release':
        //第三方MQTT
        client=mqtt.connect(bemfaMqttUrl, bemfaOptions)
        console.log('线上环境 - 第三方MQTT');
        break;
      case 'trial':
        //第三方MQTT
        client=mqtt.connect(bemfaMqttUrl, bemfaOptions)
        console.log('体验版环境 - 第三方MQTT');
        break;
      default:
        //本地MQTT
        //client=connect(mqttUrl);
        //client=mqtt.connect(mqttUrl, {
          //clientId:"mqtt_343",
          //username:"haoyan",
          //password:"123456",  
        //});

        //第三方MQTT
        client=mqtt.connect(bemfaMqttUrl, bemfaOptions);
        //client=mqtt.connect(yoyoMqttUrl, yoyoOptions);
        console.log('开发版环境 - 第三方MQTT');
    }

    that.setData({
      client: client
    })
  },
  onLED0Change(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      LED0: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"LED0","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开卧室灯");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"LED0","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭卧室灯");
        }
      });
    }
  },
  onLED1Change(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      LED1: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"LED1","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开客厅灯");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"LED1","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭客厅灯");
        }
      });
    }
  },
  onLED2Change(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      LED2: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"LED2","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开浴室灯");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"LED2","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭浴室灯");
        }
      });
    }
  },
  onLED3Change(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      LED3: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"LED3","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开路灯");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"LED3","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭路灯");
        }
      });
    }
  },
  onBEEPChange(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      BEEP: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"BEEP","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开报警器");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"BEEP","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭报警器");
        }
      });
    }
  },
  onDOORSTATEChange(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      DOORSTATE: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"DOORSTATE","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开门");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"DOORSTATE","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭门");
        }
      });
    }
  },
  onWINDOWSTATEChange(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      WINDOWSTATE: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"WINDOWSTATE","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开窗");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"WINDOWSTATE","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭窗");
        }
      });
    }
  },
  onAIRFANSTATEChange(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      AIRFANSTATE: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"AIRFANSTATE","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开风扇");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"AIRFANSTATE","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭风扇");
        }
      });
    }
  },
  onMOTORSTATEChange(event) {
    var that = this;
    console.log(event.detail);
    let sw = event.detail.value;
    that.setData({
      MOTORSTATE: sw
    })
    if (sw) {
      that.data.client.publish(mpPubTopic, '{"target":"MOTORSTATE","value":1}', function (err) {
        if (!err) {
          console.log("成功下发命令——打开窗帘");
        }
      });
    } else {
      that.data.client.publish(mpPubTopic, '{"target":"MOTORSTATE","value":0}', function (err) {
        if (!err) {
          console.log("成功下发命令——关闭窗帘");
        }
      });
    }
  },

  onShow() {
    var that = this;
    wx.showToast({
      title: "连接服务器....",
      icon: "loading",
      duration: 10000,
      mask: true,
    });
    let second = 6;
    var toastTimer = setInterval(() => {
      second--;
      if (second) {
        wx.showToast({
          title: `连接服务器...${second}`,
          icon: "loading",
          duration: 1000,
          mask: true,
        });
      } else {
        clearInterval(toastTimer);
        wx.showToast({
          title: "连接失败",
          icon: "error",
          mask: true,
        });
      }
    }, 1000);

    //配置MQTT
    this.wechatVersion();
    that.data.client.on("connect", function () {
      console.log("成功连接mqtt服务器！");
      clearInterval(toastTimer);
      wx.showToast({
        title: "连接成功",
        icon: "success",
        mask: true,
      });
      //订阅主题
      that.data.client.subscribe(mpSubTopic,{qos:0},function(err){
        if (!err) {
          console.log("成功订阅设备上行数据Topic!");
        }
      });
    });
    //信息监听事件
    that.data.client.on("message", function (topic, message) {
      console.log('订阅主题：' + topic);
      // message是16进制的Buffer字节流
      let dataFromDev = {};
      // 尝试进行JSON解析
      try {
        dataFromDev = JSON.parse(message);
        console.log('订阅消息：');
        console.log(dataFromDev);
        wx.showToast({
          title: "订阅成功",
          icon: "success",
          mask: false,
        });
        that.setData({
          ppm: dataFromDev.PPM,
          temp: dataFromDev.temp,
          humi: dataFromDev.humi,
          Light: dataFromDev.Light,
          Rains: dataFromDev.Rains,
          voltage:dataFromDev.voltage,
          LED0: dataFromDev.LED0,
          LED1: dataFromDev.LED1,
          LED2: dataFromDev.LED2,
          BEEP: dataFromDev.BEEP,
          DOORSTATE: dataFromDev.DOORSTATE,
          WINDOWSTATE: dataFromDev.WINDOWSTATE,
          AIRFANSTATE: dataFromDev.AIRFANSTATE,
          MOTORSTATE: dataFromDev.MOTORSTATE
        })
      } catch (error) {
        // 解析失败错误捕获并打印（错误捕获之后不会影响程序继续运行）
        console.log(error);
      }
    });
    that.data.client.on('error', (error) => {
      console.log('连接失败')
      wx.showToast({
        title: "连接失败",
        icon: "error",
        mask: true,
      });
    });
    // 客户端脱机下线触发回调 
    that.data.client.on("offline", function () {
      console.log("您已断开连接，请检查网络")
      wx.showToast({
        title: "连接断开",
        icon: "error",
        mask: true,
      });
    });
    // 获取天气相关数据
    wx.getLocation({
      type: "wgs84",
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const key = hefengKey;
        wx.request({
          url: `${geoApi}location=${longitude},${latitude}&key=${key}`, //获取地理位置
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                location
              } = res.data;
              that.setData({
                area: location[0].name, //城区
                city: location[0].adm2 //城市
              })
            } catch (error) {
              console.error(error);
            }
          },
        });
        wx.request({
          url: `${hefengWeather}location=${longitude},${latitude}&key=${key}`, //获取实时天气数据
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                now
              } = res.data;
              that.setData({
                weather: now.text, // 天气
                FAT: now.feelsLike //体感温度
              })
            } catch (error) {
              console.error(error);
            }

          },
        });
        wx.request({
          url: `${hefengAir}location=${longitude},${latitude}&key=${key}`, //获取空气数据
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                now
              } = res.data;
              that.setData({
                airText: now.category, //空气质量
                pm2p5: now.pm2p5, //PM2.5浓度
                airValue: now.aqi //空气指数
              })
            } catch (error) {
              console.error(error);
            }

          },
        });

        wx.request({
          url: `https://devapi.qweather.com/v7/indices/1d?type=1,2&location=${longitude},${latitude}&key=${key}`, //获取实时天气数据
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("HUAQING --- 请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                daily
              } = res.data;
              that.setData({
                todaylifeadvice: daily[0].text // 天气
              })
            } catch (error) {
              console.error(error);
            }

          },
        });
      },
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  }
})


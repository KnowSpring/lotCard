// pages/cxx/cxx.js
//编辑名片页面
const app = getApp()
var util = require('../utils/util.js');
Page({
  data: {
    exist: 0,
    usercardInfo: [],
    cardstyle: "blackcard",
    locationAddress: "",
    newimg:'/imgages/fangman.png'
  },
  //保存或者更新数据库
  formSubmit: function (e) {
    let blackcard = this.selectComponent("#blackcard");
    var head = blackcard.data.headimage
    var headImage
    const filePath = head;
    var date;
    date = util.formatTime(new Date());
    const cloudPath = 'my-image' + date + filePath.match(/\.[^.]+?$/)[0]
// 上传更新头像
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件]成功:', cloudPath, res)
        app.globalData.fileID = res.fileID
        app.globalData.cloudPath = cloudPath
        app.globalData.imagePath = filePath
        headImage = res.fileID
      },
      fail: e => {
        console.error('[上传文件]失败:', e)
      },
      complete: () => {
        if (e.detail.value.username.length == 0 || e.detail.value.username.length >= 8) {
          wx.showToast({
            title: '姓名为空或过长!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.phonenumber.length == 0 || e.detail.value.phonenumber.length != 11) {
          wx.showToast({
            title: '手机号格式错误',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.job.length == 0) {
          wx.showToast({
            title: '职位为空！',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.department.length == 0) {
          wx.showToast({
            title: '单位名称为空!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.workplace.length == 0) {
          wx.showToast({
            title: '办公地点为空!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.mbuessness.length == 0) {
          wx.showToast({
            title: '主营业务不能为空!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.phone.length == 0) {
          wx.showToast({
            title: '电话为空！',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.web.length == 0) {
          wx.showToast({
            title: '网址为空',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.mailadress.length == 0) {
          wx.showToast({
            title: '邮箱地址为空!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else if (e.detail.value.wechat.length == 0) {
          wx.showToast({
            title: '微信名错误!',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
        } else {
          const db = wx.cloud.database();
          db.collection('userCard').where({
            _openid: getApp().globalData.openid
          }).get().then(res => {
            this.setData({
              exist: res.data.length,
            })
            console.log(res)
          }).then(res => {
            //如果该用户没有名片，则是添加名片
            if (this.data.exist == 0) {
              console.log('用户不存在')
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'addUser',
                // 传递给云函数的event参数
                data: {
                  cardstyle: "blackcard",
                  username: e.detail.value.username,
                  phonenumber: e.detail.value.phonenumber,
                  job: e.detail.value.job,
                  department: e.detail.value.department,
                  workplace: e.detail.value.workplace,
                  mbuessness: e.detail.value.mbuessness,
                  phone: e.detail.value.phone,
                  username: e.detail.value.username,
                  web: e.detail.value.web,
                  mailadress: e.detail.value.mailadress,
                  wechat: e.detail.value.wechat,
                  headimage: headImage
                }
              }).then(res => {
                wx.redirectTo({
                  url: '/pages/personcard/personcard',
                })
                wx.showToast({ title: '新建成功', })
                wx.redirectTo({
                  url: "/pages/personcard/personcard",
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
                console.log('[新建成功] [新增记录] 成功，记录 _id: ', res._id)
              }).catch(res => {
                wx.showToast({ title: '新建失败', })
                console.log('[新建失败] [新增记录] 失败: ', res)
              })
            } else {
              //如果用户名片存在，则是修改名片信息
              console.log('用户存在')
              this.setData({
                cardstyle: app.globalData.cardstyle
              })
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'updateUser',
                // 传递给云函数的event参数
                data: {
                  cardstyle: this.data.cardstyle,
                  username: e.detail.value.username,
                  phonenumber: e.detail.value.phonenumber,
                  job: e.detail.value.job,
                  department: e.detail.value.department,
                  workplace: e.detail.value.workplace,
                  mbuessness: e.detail.value.mbuessness,
                  phone: e.detail.value.phone,
                  username: e.detail.value.username,
                  web: e.detail.value.web,
                  mailadress: e.detail.value.mailadress,
                  wechat: e.detail.value.wechat,
                  headimage: headImage
                }
              }).then(res => {
                wx.redirectTo({
                  url: '/pages/personcard/personcard',
                })
                wx.showToast({ title: '修改成功', })
                wx.redirectTo({
                  url: '/pages/personcard/personcard',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
                console.log('[修改成功] [新增记录] 成功，记录 _id: ', res._id)
              }).catch(res => {
                wx.showToast({ title: '修改失败', })
                console.log('[修改失败] [新增记录] 失败: ', res)
              })
            }
          })
        }
      }
    })
  },
//选择地址
  chooseLocation: function () {
    var that = this
    let blackcard = this.selectComponent('#blackcard');
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          locationAddress: res.address
        })
        blackcard.setData({
          address: that.data.locationAddress
        })
      }
    })
  },
  //同步显示名字
  inputname: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      name: e.detail.value
    });
  },
  //同步显示工作
  inputjob: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      job: e.detail.value
    });
  },
  //同步显示公司
  inputcompany: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      company: e.detail.value
    });
  },
  //同步显示地址
  inputaddress: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      address: e.detail.value
    })

  },
  //同步显示手机号
  inputphonenumber: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      tel: e.detail.value
    });

  },
  //同步显示邮箱
  inputemail: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      email: e.detail.value
    });
  },
  //同步显示网址
  inputweb: function (e) {
    let blackcard = this.selectComponent('#blackcard');
    blackcard.setData({
      web: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    console.log(app.globalData.cardstyle);
    this.data.cardstyle = app.globalData.cardstyle;
    return db.collection('userCard').where({
      _openid: getApp().globalData.openid ? getApp().globalData.openid : null
    }).get().then(res => {
      this.setData({
        usercardInfo: res.data[0],
        cardstyle: res.data[0].cardstyle
      })
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    //获得blackcard组件
    this.blackcard = this.selectComponent("#blackcard");
  },

  // showblackcard() {
  //   this.blackcard.showDialog();
  // },

})
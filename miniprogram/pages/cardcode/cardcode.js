// pages/qr/qr.js
//名片码页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    captchaImage1: "",
    headimage: '',
    username: "",
    job: ""
  },

  //调用云函数获取小程序码,用界面监测加载调用该方法 
  onLoad: function(options) {
    console.log(options.openid)
    //从数据库中获取数据 
    let db = wx.cloud.database()
    let mycol = db.collection("userCard");
    mycol.where({
      _openid: options.openid
    }).get().then(res => {
      console.log("where查询条件", res) //获取了对应openid中的数据库记录中的数据 
      this.setData({
        headimage: res.data[0].headimage,
        username: res.data[0].username,
        job: res.data[0].job
      })
    })
    //调用云函数获取二维码
    wx.cloud.callFunction({
      name: 'getImage', // 云函数名称 
      data: { // 小程序码所需的参数 
        page: "",
      },
      complete: res => {
        this.setData({
          captchaImage1: res.result.fileID
        })
        console.log('callFunction test result: ', res.result.fileID)
      }
    })
  },

  save: function() {
    var image = this.data.captchaImage1
    wx.getImageInfo({
      src: image,
      success: function(data) {
        let path = data.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: () => {
            console.log("名片二维码保存成功")
          }
        })
      }
    })
  },

  //选择头像
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed'],
      success: function(res) {
        const filePath = res.tempFilePaths;
        if (filePath.length > 2) { //如果长度超过9,删除/清空后面的数组
          filePath.splice(2, filePath.length)
        }
        console.log(filePath)
        that.setData({
          headimage: filePath[0]
        })
      }
    })
  }

})
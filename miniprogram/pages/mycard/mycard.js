// pages/mycard/mycard.js
const app=getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    lookFoeMe:[],
    collections:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {    
    var that = this  
    //我的收藏信息回显
    db.collection('collections').where({
      _openid: getApp().globalData.openid // 当前用户openID
    }).orderBy('collectionTime','desc').get({
      success: function (res) {
        if (res.data.length != 0) {
          that.setData({
            collections: res.data,
            state: true //打开显示我的收藏
          })
        }
        console.log(res.data);
        console.log(that.data.collections)
        console.log("收藏查询成功")
      }
    })
    //谁看过我信息回显
    db.collection('visited').where({
      // 填入分享页面的 options.openid
       _visitedopenid: getApp().globalData.openid       
    }).orderBy('visitTime', 'desc').get({
      success: function (res) {
        console.log(res.data);
        if (res.data.length != 0) {
          that.setData({
            lookFoeMe: res.data,
          })
        }
        console.log(that.data.lookFoeMe)
        console.log("访问查询成功")
      }
    })
  },
// 跳转到谁看过我
  lookForMe: function() {
    this.setData({
      state: false
    })
  },
// 跳转到我的收藏
  mycollection: function() {
    this.setData({
      state: true
    })  
  },

})
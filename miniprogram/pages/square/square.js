// miniprogram/pages/square/square.js
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    region: ['广东省', '肇庆市', '端州区'],
    all: []
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var address = e.detail.value[2]
    this.setData({
      region: e.detail.value
    })
    let db = wx.cloud.database()
    let mycol = db.collection("userCard");
    mycol.where({
    }).get().then(res => {
      console.log("where查询条件", res)//获取了对应openid中的数据库记录中的数据 
      console.log(res.data)
      var all1 = []
      all1 = res.data.filter(item => {
        return item.workplace.indexOf(address) != -1
      })
      this.setData({
        all: all1
      })
      console.log(this.data.all)
    })
  },

  card: function (e) {
    console.log(e.currentTarget.dataset.src)
    wx.navigateTo({
      url: '/pages/sharecard/sharecard?openid=' + e.currentTarget.dataset.src,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})
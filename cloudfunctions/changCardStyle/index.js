// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
return await db.collection('userCard').where({_openid:event.userId}).update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 done 字段置为 true
      cardstyle: event.cardStyle
    },
    success: function (res) {
      console.log(res)
    }
  })

}

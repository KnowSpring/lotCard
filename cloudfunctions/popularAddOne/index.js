// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //如果用户名片存在，则是修改名片信息
  console.log('人气加一')
  try {
    return await db.collection('userCard').where({
      _openid: event._openid
    }).update({
      data: {
        porpular: _.inc(1),
      },
    })
  } catch (e) {
    console.error(e)
  }
}
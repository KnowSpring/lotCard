// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //如果用户名片存在，则是修改名片信息
  console.log('用户存在')
  try {
    return await db.collection('userCard').where({
      _openid: wxContext.OPENID
    }).update({
        data: {
          cardstyle: event.cardstyle,
          username: event.username,
          phonenumber: event.phonenumber,
          job: event.job,
          department: event.department,
          workplace: event.workplace,
          mbuessness: event.mbuessness,
          phone: event.phone,
          web: event.web,
          mailadress: event.mailadress,
          wechat: event.wechat,
        },
      })
  } catch (e) {
    console.error(e)
  }
}
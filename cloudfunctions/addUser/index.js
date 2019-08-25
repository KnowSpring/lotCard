// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
return exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('addUser运行中')
  try {
    return await db.collection('userCard').add({
      data: {
        _openid: wxContext.OPENID,
        cardstyle:event.cardstyle,
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
        collects: [],
        visit: [],
        visited: [],
        porpular: 0,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
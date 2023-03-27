// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("user").add({
    data:{
      username:event.username,
      password:event.password,
      imageurl:event.url,
      Integral:'0'
    }
  })
}
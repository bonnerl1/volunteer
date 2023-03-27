// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("activity").add({
    data:{
      title:event.title,
      object:event.object,
      date:event.time,
      place:event.place,
      content:event.content,
      image:event.image,
      contacts:event.contacts,
      phone:event.phone,
      status:"0"
    }
  })
}
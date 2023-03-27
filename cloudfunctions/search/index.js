// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection("activity").where({
    //使用正则查询，实现对搜索的模糊查询
    title: db.RegExp({
      regexp: event.value,
      //从搜索栏中获取的value作为规则进行匹配。
      options: 'i',
      //大小写不区分
    }),
    status:"1"
  }).get()
}
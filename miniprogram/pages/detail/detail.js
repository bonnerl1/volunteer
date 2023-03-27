// pages/detail/detail.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },
  enlists(){
    wx.showToast({
      title: '报名成功',
    })
  },
  getdata(){
    wx.cloud.callFunction({
      name:'getdata1',
      data:{
        id:this.data.id
      }
    })
    .then(res=>{
      // console.log(res.result.data[0]);
      var list=res.result.data[0]
      this.setData({
        image:list.image,
        title:list.title,
        date:list.date,
        content:list.content,
        object:list.object,
        place:list.place,
        contacts:list.contacts,
        phone:list.phone
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id=options.id
    // console.log(this.data.id);
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
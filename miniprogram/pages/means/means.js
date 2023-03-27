// pages/means/means.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '管理员',
    userid: ''
  },
  btnsub(res) {
    var userid = this.data.userid
    var list=res.detail.value;
    // console.log(list);
    if(list.phone!=''&&list.email!=''&&list.place!=''&&list.work!=''&&list.birth!=''){
      wx.showToast({
        title: '修改成功',
      }).then(res => {
        setTimeout(res => {
          wx.reLaunch({
            url: '/pages/mine/mine?userid=' + userid,
          })
        }, 1000);
      })
    }else{
      wx.showToast({
        title: '信息未完善',
        icon:"error"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);

    this.setData({
      username: options.username,
      userid: options.userid
    })
    // console.log(this.data.userid);
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
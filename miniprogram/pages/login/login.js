// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    userid: ''
  },
  btnsub(res) {
    var username = res.detail.value.name;
    var password = res.detail.value.password;
    // console.log(password);
    wx.cloud.callFunction({
        name: "user",
        data: {
          name: username
        }
      })
      .then(res => {
        if (res.result.data.length == 0) {
          wx.showToast({
            title: '该用户不存在',
            icon: 'error',
            duration: 2000 //持续的时间
          })
        } else {
          var pass = res.result.data[0].password
          this.userid = res.result.data[0]._id
          // console.log(this.userid);
          if (pass == password) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000 //持续的时间
            }).then(res => {
              setTimeout(res => {
                wx.reLaunch({
                  url: '/pages/mine/mine?userid=' + this.userid,
                })
              }, 1000);
            })
          } else {
            wx.showToast({
              title: '密码错误',
              icon: 'error',
              duration: 2000 //持续的时间
            })
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
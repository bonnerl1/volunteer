// pages/Ranking/Ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getlist() {
    wx.cloud.callFunction({
        name: "getrank"
      })
      .then(res => {
        var list = res.result.data;
        //对数组进行排序
        function compare(property){
          return function (a, b) {
            var val1 = a[property];
            var val2 = b[property];
            return val2 - val1
          }
        }
        list=list.sort(compare('Integral'))
        this.setData({
          list
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getlist()
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
// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    status: false,
    auto_height: true
  },
  //文本框自适应高度设置
  areablur: function () {
    this.setData({
      auto_height: false
    })
  },
  areafocus: function () {
    this.setData({
      auto_height: true
    })
  },
  //上传图片到云存储
  upload() {
    wx.chooseImage({
      success: res => {
        console.log(res);
        var filePath = res.tempFilePaths[0];
        this.cloudFile(filePath)
      }
    })
  },
  cloudFile(path) {
    wx.cloud.uploadFile({
      cloudPath: Date.now() + ".jpg",
      filePath: path
    }).then(res => {
      console.log(res);
      this.setData({
        url: res.fileID,
        status: true
      })
    })
  },
  //点击报名活动事件
  btnsub(res) {
    var list = res.detail.value;
    // console.log(list);
    if (this.data.url === '' || list.contacts === '' || list.content === '' || list.object === '' || list.phone === '' || list.place === '' || list.time === '' || list.title === '') {
      return wx.showToast({
        title: '信息未完善',
        icon: 'error',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var {
      title,
      object,
      time,
      place,
      content,
      contacts,
      phone
    } = res.detail.value;
    // console.log(title);
    wx.cloud.callFunction({
        name: "upload",
        data: {
          title,
          object,
          time,
          place,
          content,
          image: this.data.url,
          contacts,
          phone
        }
      })
      .then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '等待管理员审核',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 2000);
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
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
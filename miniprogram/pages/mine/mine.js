// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "点击登录",
    imageurl: '../../images/head1.jpg',
    userid: '',
    Integral: '0'
  }, 
  activity(){
    wx.showToast({
      title: '您未参加活动',
      icon:"error"
    })
  },
  //修改个人资料
  means(){
    if(this.data.username==='点击登录'){
      wx.showToast({
        title: '你未登录',
        icon:"error"
      })
    }else{
      wx.navigateTo({
        url: '/pages/means/means?username='+this.data.username+'&userid='+this.data.userid,
      })
    }
  },
  //设置
  set() {
    wx.showActionSheet({
      itemList: ['退出登录'],
      success: (res) => {
        if (!res.cancel) {
          this.setData({
            username: "点击登录",
            imageurl: '../../images/head1.jpg',
            userid:''
          })
          wx.showToast({
            title: '退出登录成功',
          })
        }
      }

    })
  },
  //获取个人信息
  getdata(userid) {
    // console.log(userid);
    if (userid != undefined) {
      wx.cloud.callFunction({
          name: "user",
          data: {
            id: userid
          }
        })
        .then(res => {
          var username = res.result.data[0].username
          var imageurl = res.result.data[0].imageurl
          var Integral = res.result.data[0].Integral
          // console.log(res); 
          this.setData({
            username,
            imageurl,
            Integral
          })
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userid = options.userid
    console.log(userid);
    this.setData({
      userid
    })
    this.getdata(userid)

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
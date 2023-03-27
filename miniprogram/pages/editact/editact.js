// pages/detail/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    image:''
  },
  //修改图片
  editimage() {
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
        image: res.fileID,
      })
    })
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
  //修改活动信息
  btnsub(e) {
    var list1=e.detail.value;
    // console.log(list1);
    // console.log(this.data.image);
    db.collection("activity").doc(this.data.id).update({
      data:{
        image:this.data.image,
        title: list1.title,
        date: list1.date,
        content: list1.content,
        object: list1.object,
        place: list1.place,
        contacts: list1.contacts,
        phone: list1.phone
      }
    })
    .then(res=>{
      wx.showToast({
        title: '修改成功',
      })
      //刷新上一页数据
      const pages = getCurrentPages()
      pages[pages.length - 2].onLoad()
    })
  },
  //获取活动数据
  getdata() {
    wx.cloud.callFunction({
        name: 'getdata1',
        data: {
          id: this.data.id
        }
      })
      .then(res => {
        // console.log(res.result.data[0]);
        var list = res.result.data[0]
        this.setData({
          image: list.image,
          title: list.title,
          date: list.date,
          content: list.content,
          object: list.object,
          place: list.place,
          contacts: list.contacts,
          phone: list.phone
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id
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

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
  },
  getDate() {
    db.collection("activity").get()
      .then(res => {
        // console.log(res.data);
        //对数组进行排序
        function compare(property) {
          return function (a, b) {
            var val1 = a[property];
            var val2 = b[property];
            return val1 - val2
          }
        }
        res.data = res.data.sort(compare('status'))
        res.data.map(item=>{
          if(item.status=="1"){
            item.show=true
          }else{
            item.show=false
          }
        })
        // console.log(res.data);
        this.setData({
          datalist: res.data
        })
      })
  },
  //发布活动
  publishdata(e){
    var actid=e.currentTarget.dataset.id;
    console.log(actid);
    db.collection("activity").doc(actid).update({
      data:{
        status:"1"
      }
    }).then(res=>{
      wx.showToast({
        title: '活动发布成功',
      })
      this.getDate()
    })
    
  },
  //修改活动数据
  editdata(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/editact/editact?id=' + id,
    })
  },
  //删除活动数据
  deletedata(e) {
    var activityid = e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: res => {
        if (res.confirm) {
          db.collection("activity").doc(activityid).remove()
            .then(res => {
              wx.showToast({
                title: '删除成功',
              })
              this.getDate()
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // db.collection("activity").doc(activityid).remove()
    // .then(res=>{
    //   wx.showToast({
    //     title: '删除成功',
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
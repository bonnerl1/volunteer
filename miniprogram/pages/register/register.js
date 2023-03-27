// pages/login/login.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    userid: '',
    url: '../../images/head1.jpg',
    list: []
  },
  //上传头像
  upload() {
    wx.chooseImage({
      success: res => {
        // console.log(res);
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
      // console.log(res);
      this.setData({
        url: res.fileID
      })
      wx.showToast({
        title: '上传成功',
      })
    })
  },
  btnsub(res) {
    var username = res.detail.value.name;
    var password = res.detail.value.password;
    var password1 = res.detail.value.password1;
    if (password != password1) {
      return wx.showToast({
        title: '密码不一致',
        icon: 'error'
      })
    }
    db.collection("user").where({
        username: username
      }).get()
      .then(res => {
        var list = res.data;
        this.setData({
          list
        })
        if (this.data.list.length != 0) {
          return wx.showToast({
            title: '用户名已被注册',
            icon: "error"
          })
        } else {
          if (username === '' || password === '' || this.data.url == "../../images/head1.jpg") {
            wx.showToast({
              title: '信息未完善',
              icon: 'error'
            })
          } else {
            wx.showLoading({
              title: '加载中',
            })
            wx.cloud.callFunction({
                name: "register",
                data: {
                  username,
                  password,
                  url: this.data.url,
                }
              })
              .then(res => {
                wx.hideLoading()
                wx.showToast({
                  title: '注册成功',
                }).then(res => {
                  setTimeout(res => {
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }, 1000);
                })
              })
          }
        }
      })

    // if (username === '' || password === '' || this.data.url == "../../images/head1.jpg") {
    //   wx.showToast({
    //     title: '信息未完善',
    //     icon: 'error'
    //   })
    // } else {
    //   wx.cloud.callFunction({
    //       name: "register",
    //       data: {
    //         username,
    //         password,
    //         url: this.data.url,
    //       }
    //     })
    //     .then(res => {
    //       wx.showToast({
    //         title: '注册成功',
    //       }).then(res => {
    //         setTimeout(res => {
    //           wx.redirectTo({
    //             url: '/pages/login/login',
    //           })
    //         }, 1000);
    //       })
    //     })
    // }
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
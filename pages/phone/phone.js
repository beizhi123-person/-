//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  //获取手机号
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: function (result) {
          var wx_user_id = app.globalData.userInfo.id;
          app.bzRequest('wx_user/getPhone', {
            code: result.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            wx_user_id: wx_user_id
          },
            function (res) {
              that.setData({
                phone: res.data
              })
            }, 'get', false)
        }
      })
    }
  },

  //提交手机号
  submit: function () {
    var that = this;
    var phone = that.data.phone;
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (phone == '') {
      that.showToast("手机号不能为空"); return;
    }
    if (!myreg.test(phone)) {
      that.showToast("手机号格式不符合！"); return;
    }

    app.bzRequest('set/phone', {
      phone: phone,
      wx_user_id: app.globalData.userInfo.id
    },
    function (res) {
      if (res.code == 1) {
        app.globalData.userInfo = res.data
        wx.setStorageSync('userInfo', res.data.data)
        wx.showToast({
          title: '绑定成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 1000);
      }
    }, 'get', false, false)
  },

  //提示
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  }
})
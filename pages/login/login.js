//获取应用实例
const app = getApp()

Page({
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        wx.login({
          success: function (result) {
            var wx_user_id = app.globalData.userInfo.id;
            app.bzRequest('wx_user/getUserInfo', {
              code: result.code,
              iv: res.iv,
              encryptedData: res.encryptedData,
              wx_user_id: wx_user_id
            },
              function (res) {
                app.globalData.userInfo = res.data
                wx.setStorageSync('userInfo', res.data)
              }, 'get', false)
          }
        })
      }
    })
  },
})
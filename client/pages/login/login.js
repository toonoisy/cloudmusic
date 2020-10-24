// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * Page initial data
   */
  data: {
    phone: '',
    password: '',
  },

  handleChange(ev) {
    // console.log(ev);
    let type = ev.currentTarget.id
    this.setData({
      [type]: ev.detail.value
    })
  },
  async handleLogin() {
    let {phone, password} = this.data
    const phoneReg = /^1[3-9]\d{9}/
    const pwdReg = /[a-zA-Z0-9]{6,20}/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    // if (!pwdReg.test(password)) {
    //   wx.showToast({
    //     title: '密码格式错误',
    //     icon: 'none'
    //   })
    //   return
    // }
    // 标示当前请求的是登录接口
    const res = await request('/login/cellphone', {phone, password, isLogin: true})
    console.log(res);
    if (res.code === 200) {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
      })
      console.log(res);
      wx.setStorage({
        key: 'userInfo',
        // data可以存对象，但是建议跟随h5标准存成json字符串
        data: JSON.stringify(res.profile),
      })
      wx.switchTab({
        url: '../personal/personal',
      })
    } else {
      wx.showToast({
        title: '手机号或密码不正确',
        icon: 'none',
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
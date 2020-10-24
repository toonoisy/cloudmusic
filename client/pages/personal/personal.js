// pages/personal/personal.js
import request from '../../utils/request'
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    playList: [],
    moveDistance: 0,
    moveTransition: 'none'
  },

  toLogin() {
    if (this.data.userInfo.nickname) return
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  handleTouchStart(ev) {
    // console.log(ev);
    this.startY = ev.touches[0].clientY
    this.setData({
      moveTransition: 'none'
    })
  },
  handleTouchMove(ev) {
    // console.log(ev);
    const moveY = ev.touches[0].clientY
    let moveDistance = Math.floor(moveY - this.startY)
    // 向上滑则不移动（已经有滚动条效果了）
    if (moveDistance < 0) return
    // 最多往下拉80rpx
    if (moveDistance > 80) moveDistance = 80
    this.setData({
      moveDistance
    })
    // console.log(this.data.moveDistance);
  },
  handleTouchEnd() {
    this.setData({
      moveDistance: 0,
      moveTransition: 'transform 400ms'
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: async function () {
    let userInfoStr = wx.getStorageSync('userInfo') // 同步读取，因为下一行代码就要使用
    if (userInfoStr) {
      this.setData({
        userInfo: JSON.parse(userInfoStr)
      })
      const res = await request('/user/record', {uid: this.data.userInfo.userId, type: 1})
      console.log(res);
      this.setData({
        playList: res.weekData
      })
    }
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
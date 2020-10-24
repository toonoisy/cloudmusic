// pages/index/index.js
import request from '../../utils/request'
Page({
  /**
   * Page initial data
   */
  data: {
    bannerList: [],
    recommendList: [],
    rankingList: []
  },
  toRecommendSongs() {
    wx.navigateTo({
      url: '/pages/recommendSongs/recommendSongs',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    request(`/banner`, {type: 2})
    // request('http://localhost:3000/banner', {type: 2})
    .then((res) => {
      this.setData({
        bannerList: res.banners
      })
    })
    request(`/personalized`)
    .then((res) => {
      this.setData({
        recommendList: res.result
      })
    })
    let rankingArr = [1, 11, 12, 21, 22]
    let i = 0
    let rankingList = [] // 不能定义在循环中
    while (i < rankingArr.length) {
      let res = await request(`/top/list`, {idx: rankingArr[i++]})
      let data = {
        name: res.playlist.name,
        tracks: res.playlist.tracks.slice(0, 3)
      }
      rankingList.push(data)
      this.setData({
        rankingList: rankingList
      })
    }
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
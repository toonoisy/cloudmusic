// pages/recommendSongs/recommendSongs.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * Page initial data
   */
  data: {
    songs: [],
    curIndex: '',
    day: null,
    month: null
  },
  toSong(ev) {
    let {id, index} = ev.currentTarget.dataset
    this.setData({
      curIndex: index // 保存当前点击歌曲的下标
    })
    wx.navigateTo({
      url: `/pages/song/song?id=${id}`,
    })
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    if (wx.getStorageSync('cookie')) {
      const res = await request('/recommend/songs')
      // console.log(res);
      this.setData({
        songs: res.recommend
      })
    } else {
      wx.showModal({
        title: '请先登录',
        content: '该功能需要登录帐号',
        cancelText:"回到首页",
        confirmText:"去登录",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            wx.navigateBack()
          }
        }
      })
    }
    PubSub.subscribe('switchType', (msg, data) => {
      console.log(msg, data);
      let {curIndex, songs} = this.data
      let id
      if (data === 'next') {
        if (curIndex === songs.length - 1) {
          curIndex = 0
        } else {
          curIndex ++
        }
      } else if (data === 'pre') {
        if (curIndex === 0) {
          curIndex = songs.length - 1
        } else {
          curIndex --
        }
      }
      this.setData ({
        curIndex
      })
      console.log(curIndex)
      id = this.data.songs[curIndex].id
      PubSub.publish('getSongId', id)
    })
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
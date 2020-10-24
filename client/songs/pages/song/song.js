// pages/song/song.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    isPlaying: false,
    songObj: {},
    id: '',
    songUrl: null,
    curTime: "00:00",
    duration: '--:--',
    curWidth: 0 // 进度条红色宽度
  },
  async handlePlay() {
    this.setData({
      isPlaying: !this.data.isPlaying
    })
    if (this.data.isPlaying  && !this.data.songUrl) {
      await this.getSongUrlData()
    }
    this.playAudio()
  },
  addAudioListener() {
    this.backgroundAudioManager.onPlay(() => {
      appInstance.globalData.playState = true
    })
    this.backgroundAudioManager.onPause(() => {
      appInstance.globalData.playState = false
      this.setData({
        isPlaying: false
      })
    })
    this.backgroundAudioManager.onStop(() => {
      appInstance.globalData.playState = false
      this.setData({
        isPlaying: false
      })
    })
    this.backgroundAudioManager.onTimeUpdate(() => {
      let curTime = this.backgroundAudioManager.currentTime
      let duration = this.backgroundAudioManager.duration
      this.setData({
        curTime: moment(curTime * 1000).format('mm:ss'),
        curWidth: curTime / duration * 100
      })
    })
  },
  async getSongData() {
    const songData = await request('/song/detail', {ids: this.data.id})
    let songObj = songData.songs[0]
    this.setData({
      songObj,
      duration: moment(songObj.dt).format('mm:ss')      
    })    
    console.log(this.data.songObj.dt);
    wx.setNavigationBarTitle({
      title: this.data.songObj.name,
    })
  },
  async getSongUrlData() {
    const songUrlData = await request('/song/url', {id: this.data.id})
    // console.log(songUrlData);
    this.setData({
      songUrl: songUrlData.data[0].url
    })
  },
  playAudio() {
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    const {id, isPlaying, songObj, songUrl} = this.data
    if (isPlaying) {
      this.backgroundAudioManager.src = songUrl,
      this.backgroundAudioManager.title = songObj.name,
      appInstance.globalData.playState = true,
      appInstance.globalData.playId = id
    } else {
      this.backgroundAudioManager.pause(),
      appInstance.globalData.playState = false
    }
  },
  switchSong(ev) {
    PubSub.publish('switchType', ev.currentTarget.id)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    // console.log(options);
    // 路由传参可以从options中获取
    // let id = '1297494227'
    let {id} = options
    this.setData({
      id
    })
    await this.getSongData()
    let {playState, playId} = appInstance.globalData
    if (playState && playId === id) {
      this.setData({
        isPlaying: true
      })
    }
    // console.log(this);
    // 一上来就把背景音乐播放器直接挂在this上
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.addAudioListener()
    PubSub.subscribe('getSongId', async (msg, id) => {
      this.setData({
        id
      })
      this.getSongData()
      await this.getSongUrlData()
      this.setData({
        isPlaying: true
      })
      this.playAudio()
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
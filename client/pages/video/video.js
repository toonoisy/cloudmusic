// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * Page initial data
   */
  data: {
    navList: [],
    videoList: [],
    currentId: null,
    trigger: false,
    playId: null
  },
  async changeId(ev) {
    // console.log(ev);
    this.setData({
      // 标签属性的值一定是字符串类型
      // 自定义属性的值的类型,你传给他什么,他就是什么
      currentId: ev.currentTarget.dataset.id,
      videoList: []
    })
    wx.showLoading({
      title: '加载中，请稍候',
    })
    await this.getVideoListData()
    wx.hideLoading()
  },
  async getVideoListData() {
    /*
      需要先登录
      发请求需要携带用户cookie
    */
   let videoListData = await request('/video/group', {id: this.data.currentId})
   console.log(videoListData);
   this.setData({
     videoList: videoListData.datas
   })
  },
  async refresherRefresh() {
    await this.getVideoListData()
    this.setData({
      trigger: false
    })
  },
  // 没有接口，模拟请求更多数据
  scrollToLower() {
    let data
    setTimeout(() => {
      data = [
        {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
            "alg": "onlineHotGroup",
            "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
            "threadId": "R_VI_62_57B282070780439AB8B7EEBADA7B0BF4",
            "coverUrl": "https://p1.music.126.net/9rQe8QvlonyK_6gjUs-KBw==/109951163405417082.jpg",
            "height": 720,
            "width": 1280,
            "title": "Wake (Live ) - Hillsong Young & Free",
            "description": "该回来的，总会回来",
            "commentCount": 116,
            "shareCount": 356,
            "resolutions": [
              {
                "resolution": 240,
                "size": 34912508
              },
              {
                "resolution": 480,
                "size": 58638761
              },
              {
                "resolution": 720,
                "size": 81994785
              }
            ],
            "creator": {
              "defaultAvatar": false,
              "province": 1000000,
              "authStatus": 0,
              "followed": false,
              "avatarUrl": "http://p1.music.126.net/yX7jUxKx0MQsKKHm09TdKQ==/109951162889224877.jpg",
              "accountStatus": 0,
              "gender": 1,
              "city": 1002700,
              "birthday": 809712000000,
              "userId": 250935934,
              "userType": 0,
              "nickname": "DJGrandMother",
              "signature": "心情如歌",
              "description": "",
              "detailDescription": "",
              "avatarImgId": 109951162889224880,
              "backgroundImgId": 109951164570679090,
              "backgroundUrl": "http://p1.music.126.net/lnHCc8D-vLK3E7AphhCO6w==/109951164570679086.jpg",
              "authority": 0,
              "mutual": false,
              "expertTags": null,
              "experts": null,
              "djStatus": 0,
              "vipType": 11,
              "remarkName": null,
              "avatarImgIdStr": "109951162889224877",
              "backgroundImgIdStr": "109951164570679086",
              "avatarImgId_str": "109951162889224877"
            },
            "urlInfo": {
              "id": "57B282070780439AB8B7EEBADA7B0BF4",
              "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/P8DZRued_1777476644_shd.mp4?ts=1600919817&rid=67045BE5AADF7E81410E9AF64893300E&rl=3&rs=owHvOhzRHwjbLkDlIdLYmEYcpddxViic&sign=33d87cbee10371f85374a1f2bea82a9f&ext=MbQfiMjsqTjGUrkgAnxbxsSylRxH5VhHzFV5ThhjfyiSCkcYqls2QnMPFzPFNGf2TzxMdlMd3x85Re1upgk5GucHgnVYTYzUr%2BxJl2GJta0KMD2nLWP%2BHVZ3D0Kpgp%2BFprsHzNg%2F0k3A8ZmrhP57eQRGhbFLB%2BDO4NukIn%2BPPUcgxDMeBXvSSet8RB2N86GBR%2F0dG%2FSoju1XlcCQhMHVQtP3pMZpRL9aYLx%2Bg8qHbKJqZUsE8IvZefqWchakvvSO",
              "size": 81994785,
              "validityTime": 1200,
              "needPay": false,
              "payInfo": null,
              "r": 720
            },
            "videoGroup": [
              {
                "id": 57106,
                "name": "欧美现场",
                "alg": "groupTagRank"
              },
              {
                "id": 59108,
                "name": "巡演现场",
                "alg": "groupTagRank"
              },
              {
                "id": 1100,
                "name": "音乐现场",
                "alg": "groupTagRank"
              },
              {
                "id": 58100,
                "name": "现场",
                "alg": "groupTagRank"
              },
              {
                "id": 5100,
                "name": "音乐",
                "alg": "groupTagRank"
              }
            ],
            "previewUrl": null,
            "previewDurationms": 0,
            "hasRelatedGameAd": false,
            "markTypes": null,
            "relateSong": [],
            "relatedInfo": null,
            "videoUserLiveInfo": null,
            "vid": "57B282070780439AB8B7EEBADA7B0BF4",
            "durationms": 279173,
            "playTime": 131625,
            "praisedCount": 1308,
            "praised": false,
            "subscribed": false
          }
        }
      ]
      this.setData({
        videoList: [...this.data.videoList, ...data]
      })
    }, 2000);
  },
  // 优化后这个bug不存在了
  // handlePlay(ev) {
  //   // console.log(ev);
  //   let {id} = ev.currentTarget
  //   if (this.vid && this.vid !== id) {
  //     const preVideoContext = wx.createVideoContext(this.vid)
  //     preVideoContext.pause()
  //   }
  //   this.vid = id
  // },
  changePlayId(ev) {
    let {id} = ev.currentTarget
    this.setData({
      playId: id
    })
    const videoContext = wx.createVideoContext(id)
    videoContext.play()
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const navListData = await request('/video/group/list')
    this.setData({
      navList: navListData.data.slice(0, 10),
      currentId: navListData.data[0].id
    })
    this.getVideoListData()
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
  // 参数是一个对象 {from, target}
  onShareAppMessage: function ({from, target}) {
    // console.log(from, target);
    if (from === 'button') {
      // 驼峰自定义属性名会被转成全小写 coverurl
      let {title, coverurl} = target.dataset
      return {
        title,
        path: '/pages/video/video',
        imageUrl: coverurl
      }
    }
    if (from === 'menu') {
      return {
        title: "硅谷云音乐",
        path: '/pages/index/index',
        imageUrl: '/static/images/logo.png'
      }
    }
    
  }
})
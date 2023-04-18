// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js'
import moment from 'moment'
import request from '../../utils/request.js'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail: {},
    isPlay: false,
    musicId: 0,
    musicLink: "",
    startTime: "00:00",
    endTime: "00:00",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    this.songDetail(musicId);
    if(appInstance.globalData.isPlay && appInstance.globalData.musicId === musicId) {
      this.setData({
        isPlay: true
      })
    }
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监听音频播放/暂停/停止事件
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true)
      appInstance.globalData.musicId = musicId;
    })
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false)
    })

    // 监听音频自然播放结束
    this.backgroundAudioManager.onEnded(() => {
       // 发布消息
       subpub('next');
    })

  },
  // 修改播放状态
  changePlayState(isPlay){
    // 修改音乐是否的状态
    this.setData({
      isPlay
    })
  
    // 修改全局音乐播放的状态
    appInstance.globalData.isPlay = isPlay;
  },

  // 获取歌曲详情
  async songDetail(musicId) {
    let result = await request("/song/detail",{ids : musicId});
    if(result.code === 200) {
      this.setData({
        songDetail: result.songs[0]
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.songDetail.name
    })
    // 设置起始时间
    let endTime = moment(this.data.songDetail.dt).format("mm:ss")
    this.setData({
      endTime
    })
  },

  changePlay() {
    let {isPlay, musicLink} = this.data;
    // 控制音乐
    this.musicControl(this.data.musicId,!isPlay,musicLink);
  },
  async musicControl(musicId,isPlay,musicLink) {
    if(isPlay) {
      if(!musicLink) {
        let res = await request("/song/url",{id: musicId})
        musicLink = res.data[0].url;
        this.setData({
          musicLink
        })
      }
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.songDetail.name
    } else {
      // 暂停音乐
      this.backgroundAudioManager.pause()
    }
   

  },
  // 切换歌曲
  switchSong(event) {
    let type = event.currentTarget.id;
    subpub(type);
  },
  subpub(type) {
    PubSub.subscribe('updateMusic',(msg,musicId) => {
      this.songDetail(musicId);
      // 取消订阅
      PubSub.unsubscribe("updateMusic")
    })
    // 发布消息
    PubSub.publish('switchSong', type);
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
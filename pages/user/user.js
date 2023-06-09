// pages/user/user.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:0,
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo:{},
    recentPlayList: []
  },

 
  touchStart(event) {
    this.setData({
      start: event.touches[0].clientY,
      coveTransition: '',
    })
  },
  touchMove(event) {
    let move = event.touches[0].clientY - this.data.start;
    if (move <= 0) {
      return;
    } else if (move > 80) {
      move = 80;
    }
    this.setData({
      coverTransform: `translateY(${move}rpx)`
    })
  },
  touchEnd(event) {
    this.setData({
      start:0,
      coverTransform: 'translateY(0)',
      coveTransition: 'transform 1s linear',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.recordSongs()
  },

  // 获取最近的歌曲
  async recordSongs() {
    let result = await request('/record/recent/song',{limit:10});
    let index = 1;
    let recentPlayList = result.data.list.map((item) => {
      item.id = index++;
      return item;
    })
    this.setData({
      recentPlayList
    })
  },
  
  // 登录
  login() {
    if(!this.data.userInfo.avatarUrl) {
      wx.navigateTo({
        url: '/pages/login/qr/login'
      })
    }
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
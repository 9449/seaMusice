// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    groupId: 0,
    videoList:[],
    vid: 'BB7D543CD8F96499FED40FF13BBBD109'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.gtVideoGroupList();
  },

  // 获取视频标签列表
  async gtVideoGroupList() {
    let result = await request('/video/group/list')
    this.setData({
      videoGroupList: result.data.slice(0,14),
      groupId: result.data[0].id
    })
    this.getVideosGroup(this.data.groupId)
  },

  // 获取视频标签/分类下的视频
  async getVideosGroup(id) {
    let result = await request('/video/group',{id});
    let index = 1;
    let videoList = result.datas.map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      videoList,
      vid: videoList.length? videoList[0].data.vid : ''
    })
    wx.hideLoading()
  },

  changeNav(event) {
    this.setData({
      groupId: event.currentTarget.id * 1
    })
    wx.showLoading({
      title: '正在加载...'
    })
    this.getVideosGroup(this.data.groupId)
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage() {

  // }
})
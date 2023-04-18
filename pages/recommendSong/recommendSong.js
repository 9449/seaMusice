// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: 1,
    month: 1,
    dailySongs:[],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDate();
    this.recommendSongs();
    // 绑定事件
    PubSub.subscribe('switchSong', (msg, type) => {
      let index = this.data.index;
      if (type === "pre") {
        // 上一首
        if(index === 0) {
          index = this.data.dailySongs.length
        }
        index--;
      } else {
        // 下一首
        if(index === this.data.dailySongs.length -1) {
          index = -1;
        }
        index++;
      }
      let musicId = this.data.dailySongs[index].id;
      this.setData({
        index
      })
      // 把id 传回去
      PubSub.publish("updateMusic",musicId);
    });
  },

  getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    this.setData({
      day,
      month
    })
  },

  // 获取每日推荐歌曲
  async recommendSongs() {
    let result = await request('/recommend/songs');
    if(result.code === 200) {
      this.setData({
        dailySongs : result.data.dailySongs
      })
    }
  },
  // 跳转到对应的歌曲详情页
  handSongDetail(event) {
    let {musicid,index} = event.currentTarget.dataset;
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId=' + musicid
    })
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
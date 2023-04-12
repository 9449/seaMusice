// index.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    topList:[],
    topListIds:[19723756,3779629,2884035,3778678]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners();
    this.personalized();
    this.topList();
  },

  // 获取banner图
  async getBanners() {
    let bannerList = await request("/banner",{type:2});
    this.setData({
      banners: bannerList.banners
    })
  },

  // 获取推荐歌曲
  async personalized() {
    let {result} = await request("/personalized",{limit:10})
    this.setData({
    recommends: result
    })
  },

  // 获取热歌排行榜
  async topList() {
    console.log(this.data.topListIds);
    // for(this.)
    // let result = await request("/playlist/detail",{id:0})
    // console.log(result);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

// pages/login/qr/login.js
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrimg: '',
    key:'',
    timeout:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getQrImg()
  },
  async getQrImg() {
    let result = await request('/login/qr/key',{timestamp: Date.now()})
    .then(res => {
      this.setData({
        key:res.data.unikey
      })
      return request('/login/qr/create',{timestamp: Date.now(),qrimg:true,key:res.data.unikey})
    })
    if(result.code === 200) {
      this.setData({
        qrimg: result.data.qrimg
      })
      this.qrCheck(this.data.key)
    }
  },
  // 验证二维码扫描状态
  qrCheck(key) {
    let timer = setInterval(async () => {
      let result = await request('/login/qr/check',{key:key,timestamp: Date.now()});
      if (result.code === 800) {
        // 二维码过期
        this.setData({
          timeout: 'none'
        })
        clearInterval(timer)
      }
      // if (result.code === 801) {
      //   // 等待扫码
      // }
      if (result.code === 802) {
        // 待确认
        wx.showToast({
          title: '请在手机上确认',
          icon: 'none'
        })
      }
      if (result.code === 803) {
        // 授权成功
        clearInterval(timer)
        wx.setStorage({key:'cookie',data:result.cookie})
        wx.showToast({
          title: result.message,
        })
        this.loginStatus()
        // wx.switchTab({
        //   url: '/pages/user/user',
        // })
      }

    }, 3000);
  },
   // 获取登录状态
   async loginStatus() {
    let result = await request('/login/status',{timestamp:Date.now()});
    console.log(result);
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
// pages/login/login.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    dj: '',
    msg: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  handleInput(event){
    this.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },

  async gheCode() {
    let valid = this.validPhone();
    if (valid) {
      let reslut = await request('/captcha/sent',{phone: this.data.phone})
      if(reslut.code === 200 && reslut.data) {
        wx.showToast({
          title: '发送成功',
        })
      }
      this.setData({
        dj: 'none',
        msg: '已发送'
      })
      setTimeout(() => {
        this.setData({
          dj: '',
          msg: '获取验证码'
        })
      }, 3000);
    }
  },

  async submit() {
    if(!this.validPhone) {
      return;
    }
    // if (this.data.code.length !== 6) {
    //   wx.showToast({
    //     title: '请输入正确的验证码',
    //     icon: 'error'
    //   })
    //   return;
    // }
    let result = await request('/login/cellphone',{phone:this.data.phone, captcha:this.data.code})
    console.log(result);
  },

  validPhone() {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if(!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的号码',
        icon: 'error'
      })
      return false;
    }
    return true;
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
import config from "./config"
export default (url,data={},method='GET') => {
  return new Promise((resolve,reject) => {
    console.log(wx.getStorageSync('cookie'));
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync('cookie') ?　wx.getStorageSync('cookie'):''
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
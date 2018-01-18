//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '从小到大',
  },
  //事件处理函数
  startgame: function (e) {
    wx.navigateTo({
      url: '../littletobig/littletobig'
    })
  },
  onLoad: function () {
    
  },
})

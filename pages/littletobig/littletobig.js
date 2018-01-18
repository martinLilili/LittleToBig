// pages/littletobig/littletobig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{ msg: '1' }, { msg: '2' }]
  },

  GetRandomNum: function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.randomdata()
  },

  randomdata: function () {
    var arr = []
    arr.push(this.GetRandomNum(1, 10))
    arr.push(this.GetRandomNum(1, 10))
    arr.push(this.GetRandomNum(1, 10))
    arr.push(this.GetRandomNum(1, 10))
    for (var i in arr) {
      console.log(i + "-----" + arr[i]);
    }
    this.setData({
      array: arr
    })
  },

  clickednum: function(e) {
    console.log(e.target.id)
    var index = Number(e.target.id)
    var num = this.data.array[index]
    var ismin = true
    for (var i in this.data.array) {
      if (num > this.data.array[i]) {
        ismin = false
      }
    } 
    if (ismin == true) {
      this.data.array.splice(index, 1);
      this.setData({
        array: this.data.array
      })
      if (this.data.array.length == 0) {
        this.randomdata()
      }
    } else {

    }
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
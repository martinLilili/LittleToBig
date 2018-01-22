// pages/littletobig/littletobig.js

Array.prototype.contains = function (item) {
  return RegExp("\\b" + item + "\\b").test(this);
};

var timer;

function countdown(that) {
   var second = that.data.second
   if (second <= 0) {
      that.setData({
         second: "Time Out..."
      });
      that.gameover()
      return;
   }
   timer = setTimeout(function () {
      that.setData({
         second: second - 1
      });
      countdown(that);
   }, 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    objects: [],
    taptime: 0,
    level: 1,
    blocknum: 4,
    score: 0,
    second: 30,
    isover: false
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
    var objects = []

    var min = -10 - 5 * this.data.level
    var mix = 10 + 5 * this.data.level
    if (this.data.level < 5) {
      this.data.blocknum = 4
    } else if (this.data.level >= 5 && this.data.level < 10) {
      this.data.blocknum = 5
    } else if (this.data.level >= 10 && this.data.level < 15) {
      this.data.blocknum = 6
    } else if (this.data.level >= 15 && this.data.level < 20) {
      this.data.blocknum = 7
    } else {
      this.data.blocknum = 8
    }

    for (var i = 0; i < this.data.blocknum; i++) {
      var num = this.GetRandomNum(min, mix)
      console.log("random" + num)
      if (arr.contains(Math.abs(num))) {
        console.log("contain"+num)
        i--
      } else {
        console.log("push" + num)
        arr.push(num)
        var ob = new Object()
        ob.num = num
        ob.ishide = false
        ob.top = 60 + 50 * i
        if (i % 2 == 1) {
          ob.left = this.GetRandomNum(1, 13) * 10
        } else {
          ob.left = this.GetRandomNum(19, 30) * 10
        }
        objects.push(ob)
      }
    }

    this.setData({
      array: arr,
      taptime: 0,
      objects: objects,
    })
    clearTimeout(timer);
    countdown(this)
  },

  clickednum: function(e) {
    
    var index = Number(e.target.id)
    var num = this.data.array[index]
    var item = this.data.objects[index]
    var ismin = true
    for (var i in this.data.array) {
      if (num > this.data.array[i] && this.data.objects[i].ishide == false) {
        ismin = false
      }
    } 
    if (ismin == true) {
      item.ishide = true
      this.data.taptime ++
      this.data.score += 10 * this.data.level
      this.setData({
        objects: this.data.objects,
        score: this.data.score,
      })
      console.log(String(this.data.taptime))
      if (this.data.taptime == this.data.blocknum) {
        this.data.second += parseInt(this.data.taptime/2)
        this.data.taptime = 0
        clearTimeout(timer);
        this.data.level += 1
        this.randomdata()
      }
    } else {
      this.data.second -= 2
      this.setData({
        second: this.data.second,
      })
      wx:wx.vibrateLong({
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      clearTimeout(timer);
      countdown(this)
    }
  },

  gameover: function (){
    this.setData({
      isover: true,
    })
  },

  restartgame: function (e) {
    this.setData({
      score: 0,
      second: 30,
      isover: false,
      level: 1,
    })
    this.randomdata()
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
// pages/more-movie/more-movie.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    startIndex: 0,
    total: -1,
    loading: false,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const type = options.type
    this.getData(type);
    this.setData({
      type
    })

  },
  getData(type, isPull) {
    const data = this.data;
    const param = {
      start: this.data.startIndex,
      count: 10
    };
    if(isPull){
      param.start = 0;
      this.setData({
        movies:[],
        startIndex:0
      })
    } else{
      if (data.loading || data.total === 0) {
        return
      }
      if (data.total > 0 && param.end >= data.total) {
        param.end = data.total - 1;
      }
    }
  
   
    this.setData({
      loading: true
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: app.gBaseUrl + type,
      data: param,
      success: (res) => {
        let movies = this.data.movies || [];
        this.setData({
          movies: movies.concat(res.data.subjects)
        })
        this.setData({
          total: res.data.total
        })
        this.setData({
          startIndex: this.data.startIndex + (res.data.subjects && res.data.subjects.length ? res.data.subjects.length : 0)
        })
        this.setData({
          loading: false
        })
        wx.hideNavigationBarLoading();
      },
      fail() {
        this.setData({
          loading: false
        })
        wx.hideNavigationBarLoading();

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
      this.getData(this.data.type, true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getData(this.data.type);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null, address:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //点击选择位置
  chooseMap() {
    wx.chooseLocation({
      success: (e) => {
        this.setData({
          address: e.address,
          latitude: e.latitude,
          longitude: e.longitude,//经度
          addressName: e.name
        })
      }
    })
  },
  saveAddresss(){
   
    if (this.data.username==null) {
     
      this.setData({
        AlertContent: '请输入姓名'
      })
      return
    }
    if (this.data.address == null) {
      
      this.setData({
        AlertContent: '请在地图上选择地址'
      })
      return
    }
    AjaxSaveAddress() ;
  },
  //模态框关闭
  modalClose() {
    this.setData({
      AlertContent: false,
      sureBoole: false
    })
  },
  //输入车牌号
  userNameInput(e) {
    let _value = e.detail.value.toUpperCase();
    this.setData({
      username: _value
    });
  },
  //调用 一键挪车入口用户注册+建立关系
  AjaxSaveAddress() {
    wx.request({
      url: getApp().globalData.url_root + 'BMemberService/moveCarlogin',
      data: {
        username: this.data.username,
        address: this.data.address
      },
      success: res => {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          wx.redirectTo({
            url: '../working/working',
          })
        } else {
          this.setData({
            AlertContent: res.data.trim()
          })
        }
      }
    })
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
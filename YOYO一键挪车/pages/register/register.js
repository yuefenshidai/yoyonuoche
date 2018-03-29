// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	value:'川',
	context:'title',
	comp:false,
	animation: null,
	userPhone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  
  },

  //获取电话号码
  getphonenumber(e){
	//   this.setData({
	// 	comp: true
	//   })
	  if (e.detail.errMsg ==="getPhoneNumber:ok"){
		  this.deCodePhoneNumber(e.detail.encryptedData, e.detail.iv)
	  }
  },

  //模态框关闭
  modalClose(){
	  this.setData({
		  comp: false
	  })
	  wx.navigateTo({
		  url: '../working/working',
	  })
  },

  //解密电话号码
  deCodePhoneNumber(encryptedData, iv){
		wx.request({
			url: getApp().globalData.url_root + 'WeixinService/Xdecoder',
			data:{
				encryptedData: encryptedData,
				iv: iv,
				session_key: JSON.parse(wx.getStorageSync("sessinKey")).session_key
			},
			success:(res)=>{
				this.setData({
					userPhone: JSON.parse(res.data.userInfo).purePhoneNumber
				})
			}
		})
  }
})
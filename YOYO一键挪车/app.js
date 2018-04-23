//app.js
App({
  onLaunch: function () {
	//   let sessinKey = wx.getStorageSync('sessinKey')
	//   if (sessinKey) sessinKey = JSON.parse(sessinKey)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
		wx.request({
			url: this.globalData.url_root+'WeixinService/weixinXgetUnionID',
			data:{
				code: res.code,
				Xname:"NC"
			},
			success:(res)=>{
				wx.setStorageSync('sessinKey', JSON.stringify(res.data))
			}
		})
      }
    })
   // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
	url_root: "https://www.happyinstallment.com/yfsd/"
	// url_root: "http://192.168.1.250:8080/yfsd/"
  }
})
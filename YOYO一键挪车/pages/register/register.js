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
	userPhone:null,
	sureBoole:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//   wx.clearStorageSync()
	  let member = wx.getStorageSync('yfsdmember')
	  if (member) {
		  wx.redirectTo({
			  url: '../working/working'
		  })
	  }
  },


  //获取电话号码
  getphonenumber(e){
	  this.setData({
		  sureBoole: true
	  })
	  setTimeout(()=>{
		  if (this.data.sureBoole){
			  this.setData({
				  sureBoole: false
			  })
		  }
	  },1500)
	if (this.data.value.length!=7){
		this.setData({
			AlertContent: '您输入的车牌号不正确'
		})
	}else{
		wx.showNavigationBarLoading()
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			this.deCodePhoneNumber(e.detail.encryptedData, e.detail.iv,res=>{
				this.AjaxmoveCarlogin(res=>{
					wx.setStorageSync('yfsdmember', res.data.bMemberid)
					this.setData({
						AlertContent: '请妥善保管您的挪车卡,以便其他车主扫描二维码联系到您',
						next:true
					})
				})
			})
		}
	}
  },

  //模态框关闭
  modalClose(){
	  this.setData({
		  AlertContent: false,
		  sureBoole:false
	  },()=>{
		  if (!this.data.next) return
		  wx.redirectTo({
			  url: '../working/working',
		  })
	  })
  },

  //解密电话号码
  deCodePhoneNumber(encryptedData, iv,call){
		wx.request({
			url: getApp().globalData.url_root + 'WeixinService/Xdecoder',
			data:{
				encryptedData: encryptedData,
				iv: iv,
				session_key: JSON.parse(wx.getStorageSync("sessinKey")).session_key
			},
			success:(res)=>{
				let _phone = JSON.parse(res.data.userInfo).purePhoneNumber
				wx.setStorageSync('phone', _phone)
				this.setData({
					userPhone: JSON.parse(res.data.userInfo).purePhoneNumber
				})
				console.log(this.data.userPhone)
				call && call()
			}
		})
  },

  //车牌号输入
  PlateNoInput(e){
	let  _plat = e.detail.value.toUpperCase()
	this.setData({
		value: _plat
	})
	if (this.data.value.length==7){
		this.setData({
			sureBoole: false
		})
	}else{
		this.setData({
			sureBoole: true
		})
	}
  },

  //调用 一键挪车入口用户注册+建立关系
  AjaxmoveCarlogin(call){
	wx.request({
		url: getApp().globalData.url_root + 'BMemberService/moveCarlogin',
		data:{
			phone: this.data.userPhone,
			licenseNo: this.data.value
		},
		success:res=>{
			wx.hideNavigationBarLoading()
			if (res.statusCode == 200){
				call && call(res)
			}else{
				this.setData({
					AlertContent: res.data.trim()
				})
			}
		}
	})
  },

  //下载停车卡
  downloadCard(){
	  wx.showNavigationBarLoading()
	  wx.downloadFile({
		  url: 'http://www.happyinstallment.com/app/feature/画板1.jpg', 
		  success: function (res) {
			  wx.hideNavigationBarLoading()
			  if (res.statusCode === 200) {
				  wx.saveImageToPhotosAlbum({
					  filePath: res.tempFilePath,
					  success(res) {
						
					  }
				  })
			  }
		  }
	  })
  }
})
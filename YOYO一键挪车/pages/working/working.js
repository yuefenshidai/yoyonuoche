// pages/working/working.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	address:null,
	valueOwner:'川',
	valueOffer: '川',
	pickerList:null,
  alerttitle:'提示'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取这个人下面的所有车辆
	this.getCarsByid()
  },
  //点击选择位置
  chooseMap(){
	  wx.chooseLocation({
		  success:(e)=>{
				this.setData({
					address: e.address,
					latitude: e.latitude,
					longitude: e.longitude,//经度
					addressName: e.name
				})
		  }
	  })
  },

  //点击确认按钮
  sure(){
	//   wx.navigateTo({
	// 	  url: '../call/call',
	//   })
	  if (!(this.data.latitude && this.data.longitude)) {
		  this.setData({
			  AlertContent: '车辆位置有误'
		  })
		  return
	  }
	  if (this.data.valueOffer.length != 7) {
		  this.setData({
			  AlertContent: '对方车牌号有误'
		  })
		  return
	  }
	  if (this.data.valueOwner.length!=7){
			this.setData({
				AlertContent:'我的车牌号有误'
			})
			return
	  }
	  if (this.data.valueOwner === this.data.valueOffer){
		  this.setData({
			  AlertContent: '不能挪走自己的车'
		  })
		  return
	  }
	  this.AjaxSubmit()
  },

  //关闭模态框
	modalClose(){
		if(this.data.call){
			wx.makePhoneCall({
				// phoneNumber: '02866004346 '
        phoneNumber: '0289669910'
			})
		}
		this.setData({
			AlertContent: false,
			alerttitle: "提示",
			call:false
		})
	},

  //输入车牌号
  inputKeyIn(e){
	  let _value = e.detail.value.toUpperCase()
	  if (e.target.dataset.type === "owner"){
		  this.setData({
			  valueOwner: _value
		  })
	  }else{
		  this.setData({
			  valueOffer: _value
		  })
	  }
  },

  //下拉选择
  bindPickerChange(e){
    console.log(e);
	  let _idx = (e.detail.value)*1
	  this.setData({
		  valueOwner :this.data.pickerList[_idx]
	  })
  },
  
  //提交信息开始拨打电话
  AjaxSubmit(){
	  wx.showNavigationBarLoading()
	wx.request({
		url: getApp().globalData.url_root +"MoveCarService/reqMoveCar",
		data:{
			frompersonid: wx.getStorageSync('yfsdmember'),
			frompersonlicense: this.data.valueOwner,
			forpersonlicese: this.data.valueOffer,
			location: this.data.longitude + ',' + this.data.latitude,
			locationdetail: this.data.address + ' ' + this.data.addressName
		},
		success:res=>{
			wx.hideNavigationBarLoading()
			if(res.statusCode==200){
				if (res.data.code==0){
					this.setData({
            AlertContent: '请拨打0289669910 ，系统将会为你自动接通车主',
						call: true
					})
				}
			}else{
				this.setData({
					AlertContent:res.data.trim(),
					alerttitle:"很抱歉"
				})
			}
		}
	})
  },

  //获取所有的车辆
  getCarsByid(){
	  wx.showNavigationBarLoading()
	  wx.request({
		  url: getApp().globalData.url_root + 'BCarinformationService/getCarLicensesByMemberId',
		  data:{
			  uid: wx.getStorageSync('yfsdmember')
		  },
		  success: res => {
			  wx.hideNavigationBarLoading()
			  if (res.statusCode == 200) {
					this.setData({
						pickerList:res.data
					})
					if (this.data.pickerList.length >= 1){
						this.setData({
							valueOwner: this.data.pickerList[0]
						})
					}
			  } else {
					wx.showModal({
						title: '提示',
						content: '请求出错了,重启小程序试一试',
						showCancel:false
					})
			  }
		  }
	  })
  },

  //下载挪车卡

  downloadCard() {
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
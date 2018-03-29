// pages/component/alert/alert.js
Component({
  properties: {
	showCancel:{
		type:Boolean,
		value:false
	},
	title: {       
		type: String,  
		value: '友情提示'    
	},
	content: {
		type: String,
		value: '弹窗内容'
	},
	cancelText: {
		type: String,
		value: '取消'
	},
	confirmText: {
		type: String,
		value: '确定'
	} 
  },

  /**
   * 组件的初始数据
   */
  data: {
	  animation:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
	  sure(){
		  this.triggerEvent('sure')
	  }
  },
  ready(){

  }
})

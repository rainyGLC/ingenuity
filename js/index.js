$(function(){
	const cardPage ={
		data:{
			flag:false, //是否按下鼠标
			curmouseX:0,
			curmouseY:0,//鼠标按下时的坐标
			offsetLeft:0,//左偏移量
			offsetTop:0,//上偏移量
			nowmouseX:0,//鼠标移动后的坐标
			nowmouseY:0,
			item:null,
			zindex: 5,
		},
		init:function(){
			this.bind();
		},
		bind:function(){
			// 委托绑定 item项 鼠标按下时候触发
			$('.bless-card').on('mousedown','.bless-item',this.mousedownEvent)
			// 绑定容器，当容器有鼠标滑过就触发
			$('.bless-card').on('mousemove',this.mousemoveEvent)
			// 委托绑定 item项 鼠标按起时候触发
			$('.bless-card').on('mouseup','.bless-item',this.mouseupEvent)
			// 绑定容器，如果鼠标离开触发
			$('.bless-card').on('mouseleave',this.mouseupEvent)
		},
		mousedownEvent:function(event){
			cardPage.data.flag = true; //确认鼠标按下
			let curmouseX = event.clientX;  //记录当前鼠标的X坐标
			let curmouseY = event.clientY; //记录当前鼠标的Y坐标
			cardPage.data.curmouseX = curmouseX;
			cardPage.data.curmouseY = curmouseY;
			let offsetLeft = this.offsetLeft;//记录div当时的左偏移量
			let offsetTop = this.offsetTop;//记录div当时的上偏移量
			cardPage.data.offsetLeft = offsetLeft;
			cardPage.data.offsetTop = offsetTop;
			cardPage.data.item = $(this);
			cardPage.data.zindex ++
			$(this).css({ 'z-index': cardPage.data.zindex })
			// console.log(cardPage.data)
		},
		mousemoveEvent:function(event){	
			let flag =cardPage.data.flag;
			if(flag){
				let nowmouseX = cardPage.data.nowmouseX;
				let nowmouseY = cardPage.data.nowmouseY;
				nowmouseX = event.clientX -cardPage.data.curmouseX; //鼠标在x轴移动
				nowmouseY = event.clientY -cardPage.data.curmouseY; //鼠标在y轴移动
				let left = cardPage.data.offsetLeft + nowmouseX; //div在X轴的偏移量加上鼠标在x轴移动的偏移量
				let top = cardPage.data.offsetTop + nowmouseY;//div在y轴的偏移量加上鼠标在y轴移动的偏移量
				cardPage.data.item.css({
					left:left + "px",
					top:top + "px"
				})
			}
		},
		mouseupEvent:function(){
			cardPage.data.flag = false;
		},
	}
	cardPage.init();
})
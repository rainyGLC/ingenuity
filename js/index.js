$(function(){
  //定义卡片内容
  let cardList = [{name:'小兔兔说:'},{name:'小兔兔说:'},{name:'小兔兔说:'},{name:'小兔兔说:'}];
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
      zindex: 0,
      timestamp:0,//时间执行的事件记录
      timestampOffset:100,//间隔时间毫秒
      headerHeight:550,//头部高度
      borderHeight:19,//卷轴的高度
    },
    init:function(){
      this.bind();
      this.setCard();
      this.resetSectionOffset();//重设高度
      this.actionScrollEvent();//触发设置事件
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
      $('.input-btn').on('click',this.addItem);

      $('.bless-card').on('click', '.bless-close',this.closeItem);
      $('.fixed-nav li').on('click',this.goScroll);//点击右侧导航
      $(window).on('scroll',this.windowScroll)//页面滚动
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
    setCard:function(){
      let background      = ['#f0f5ff','#fdfbe9','#f1fff0','#fff0f0'];
      let containerWidth  = $('.bless-card').width();
      let containerHeight = $('.bless-card').height();
      let itemWidth       = 320;
      let itemHeight      = 158;
      let paddingoffset   = 50;
      let maxWidth        = containerWidth - itemWidth - paddingoffset;
      let maxHeight       = containerHeight - itemHeight -paddingoffset; 
      let html = '';
      cardList.forEach(function(card,index){
        let randomTop = cardPage.randomBetween(paddingoffset,maxHeight);
        let randomLeft = cardPage.randomBetween(paddingoffset,maxWidth);
        let tmp = `<div class = "bless-item" style="
                 background:${background[index%background.length]};
                 top:${randomTop}px;
                 left:${randomLeft}px">
                 ${card.name}
                 <img class="bless-close" src="img/close.png">
                 <p class="bless-desc">耿昌宇老师，我是7月5日购买课程的学员，
                 还有一个视频就全部学会了。你的课程简单易学<br>非常感谢，恰逢新年来临送上我的祝福！
                </p>
                 </div>`;
            html += tmp
      })
      $('.bless-card').append(html);
      cardPage.data.zindex = cardList.length;
    },
    addItem:function(index){
      let value = $('.input-text').val();
      console.log(value);
      if(value){
        let color           = ['#fdfbe9','#f0f5ff','#fdfbe9','#f0f5ff','#fff0f0','#f1fff0'];
        let containerWidth  = $('.bless-card').width();
        let containerHeight = $('.bless-card').height();
        let itemWidth       = 320;
        let itemHeight      = 158;
        let paddingoffset   = 50;
        let maxWidth        = containerWidth - itemWidth - paddingoffset;
        let maxHeight       = containerHeight - itemHeight -paddingoffset;
        let randomTop       = cardPage.randomBetween(paddingoffset,maxHeight);
        let randomLeft      = cardPage.randomBetween(paddingoffset,maxWidth);
        let randomcolor     = Math.floor(Math.random() * 10);
        let background      = $(color).eq(randomcolor)[0];
        console.log(background);
        let html = `<div class = "bless-item" style="z-index:${index+1};
                background:${background};
                top:${randomTop}px;
                left:${randomLeft}px">
                <img class="bless-close" src="img/close.png">
                <p class="bless-avator">小兔兔说：</p>
                <p class ="bless-desc">${value}</p>
                </div>`;
        $('.bless-card').append(html);
      }
    },  
    randomBetween:function(min,max){
      return Math.floor(Math.random() * (max -min)+min);
    },
    closeItem:function(e){
      console.log(e);
      let parent = $(this).parents('.bless-item');
      console.log(parent);
      parent.remove();
    },
    resetSectionOffset:function(){
      //获取需要定位的位置和距离文档顶部的距离（需要滑动多少）
    let sectionKlass = ['section-1','section-2','section-3','section-4'];
    let sectionOffset = sectionKlass.map(klass =>{
      return{
        klass:klass,
        offsetTop:$(`.${klass}`).offset().top
      }
    })
    cardPage.data.sectionOffset = sectionOffset;
    },
    goScroll:function(){
      let klass = $(this).data('nav');
      console.log(klass);
      let borderHeight = cardPage.data.borderHeight;
      let top = $(`.${klass}`).offset().top - borderHeight;
      $("html,body").animate({
        scrollTop:top
      },500,function(){
        cardPage.actionScrollEvent();
      });
    },
    windowScroll:function(e){
      let timestampNow =  Date.now();
      let timestampLast = cardPage.data.timestamp;
      let timestampOffset = cardPage.data.timestampOffset;
      let timeLock = (timestampNow - timestampLast) > timestampOffset;
      if(!cardPage.data.flag && timeLock){
        cardPage.data.timestamp = timestampNow;
        cardPage.actionScrollEvent();
      }
    },
    actionScrollEvent:function(){
      let scrollTop = $(window).scrollTop();
      cardPage.data.flag = false;
      cardPage.toggleNavigatorFixed(scrollTop);
    },
    toggleNavigatorFixed:function(scrollTop){
      //右导航到顶部浏览器的距离
      let navOffset = $('.fixed-nav').offset().top;
      let shouldfixedTop = scrollTop > cardPage.data.headerHeight;
      let hasfixedTop = $('.fixed-nav').hasClass('fixed-top');
      if(shouldfixedTop && !hasfixedTop){
        $('.fixed-nav').addClass('fixed-top');
      }else if(!shouldfixedTop && hasfixedTop){
        $('.fixed-nav').removeClass('fixed-top');
      }
    },
  }
  cardPage.init();
})

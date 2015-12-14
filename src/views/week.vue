<style lang="less">
@import "../less/colors.less";

ul,li,p{
  margin: 0;
  padding: 0;
  list-style-type: none
}
.rin-column{
	width:65px;
	padding:25px;
	box-sizing:border-box;
	color:#fff;
	background:@color-secondary-2-3;
	cursor:pointer;

	display:flex;
	align-items: center;
	justify-content: center;

	>span{
		/*fix firefox error*/
		width:100%;
	}
}
.rin-vertical{
	/*文字竖排*/
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: tb-lr;
  writing-mode: vertical-lr;
  unicode-bidi: bidi-override;
  letter-spacing: 3px;
}
.rin-text-overflow{
	/*文字截断*/
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.rin-week{
	height:100%;
	overflow-y:auto;

	.rin-week-item{
		background: #eee;

		.rin-week-title{
			width:46px;
			padding:15px;
			box-sizing: border-box;
			background:#ddd;
			color:#fff;
			display:flex;
			align-items: center;
			justify-content: center;
			transition:all .2s linear;
			cursor:pointer;
		}
		.title-bgc0{
			background:#f44336;
		}
		.title-bgc1{
			background:#e91e63;
		}
		.title-bgc2{
			background:#9c27b0;
		}
		.title-bgc3{
			background:#2196f3;
		}
		.title-bgc4{
			background:#00bcd4;
		}
		.title-bgc5{
			background:#4caf50;
		}
		.title-bgc6{
			background:#ff5722;
		}

		.rin-week-content{
		  flex-direction: column;
		  flex-wrap: wrap;
			box-sizing: border-box;
			padding:0 10px;
			width:360px;
			transition:all .2s linear;
			overflow:hidden;

			&.off{
				width:0!important;
				padding:0;
			}

			.item{
					background:#fff;
					overflow:hidden;
					padding:10px;
					margin:10px;
					margin-bottom:0;
			    border: 1px solid #E0E0E0;
			    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04);
					border-radius:5px;
					width:300px;
					cursor:pointer;
					transition:all .2s linear;

					&:hover{
						border-color:#c3c3c3;
						transform:translateX(3px);
						box-shadow:0 4px 5px rgba(0, 0, 0, 0.07);
					}

				.preview{
					width:60px;
					height:60px;
					float:left;

					img{
						width:100%;
						height:100%;
						border-radius:5px;
						font-size:12px;
					}
				}

				.content{
					padding-left:68px;
				  font-size: 14px;
					height:60px;

					.title{
						color:#333;
					}

					.date{
				    color: #9C9C9C;
				    padding: 4px 0 0;
				    font-size:12px;
					}
				}
				.teams{
					font-size:12px;

					>span{
					  display:inline-block;
				    height:20px;
				    line-height:20px;
				    padding-right:3px;
				    margin: 0 4px;
						margin-top:8px;
				    background: #eee;
				    border-radius: 3px;
				    color: #6d6d6d;
				    overflow:hidden;

						>img{
							width:20px;
							height:20px;
							vertical-align: top;
							padding-right:3px;
						}

						&:hover{
							color:#fff;
							background:@color-secondary-2-2;
						}
					}
				}
			}

		}
	}
}
</style>
<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);">

		<div class="rin-week rin-row" id="rin-week">
			<div class="rin-column" v-on:click="allSwitch">
				<span class="rin-vertical">{{locale.listName[lang]}}</span>
			</div>

			<div class="rin-week-item rin-row" v-for="item in datas">
				<div class="rin-week-title title-bgc{{$index}}" v-on:click="Switch($index)">
					<span class="rin-vertical">{{locale.week[lang][$index]}}</span>
				</div>
				<div class="rin-week-content rin-row" v-bind:class="{'off':isOff[$index]}">

						<div class="item" v-for="d in item">
							<div class="preview">
								<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/'+d.icon" alt="{{d.name}}">
							</div>
							<div class="content">
								<p class="title rin-text-overflow" title="{{d.tag.locale[lang]}}">{{d.tag.locale[lang]}}</p>
								<p class="date rin-text-overflow" title="{{d.credit}}">{{d.credit}}</p>
								<p class="date">{{locale.time[lang]}} : {{d.startDate | date 'HH:mm'}}</p>
							</div>
							<div class="teams">
									<span v-for="t in d.team">
										<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/'+(t.icon?t.icon:'data/images/2015/01/0fm7ihnu7lh2me3fog6.jpg')" alt="{{t.name}}">
										{{t.name}}
									</span>
							</div>
						</div>

				</div>
			</div>
		</div>

	</div>
</template>
<script>
export default{
  data (){
  	return{
    	lang:"ja",

    	locale:{
    		listName:{
    			zh_cn:"番组列表",
    			zh_tw:"番組列表",
    			en:"Bangumi List",
    			ja:"Bangumi List",
    		},
    		time:{
    			zh_cn:"播放时间",
    			zh_tw:"播放時間",
    			en:"On air",
    			ja:"放送時間",
    		},
    		week:{
	    		zh_cn:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
	    		zh_tw:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
	    		en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	    		ja:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
    		}
    	},
      datas:[],
      isOff:[],
  	}
  },
  filters:{
  	// 日期格式化
  	'date':require('../filters/dateFormat.js')
  },
	methods:{
		//全部列表切换
		allSwitch:function(){
			//如果某个列表处于关闭状态，则全部打开。反之，全部关闭
			if(this.isOff.indexOf(true)){
				for(var i = 0;i<7;i++){
					this.isOff.$set(i,true);
				}
			}else{
				for(var i = 0;i<7;i++){
					this.isOff.$set(i,false);
				}
			}
		},
		//单个列表切换
		Switch:function(index){
			this.isOff.$set(index,!this.isOff[index]);
		},
		setWidth: function(){
			var allItem = document.querySelectorAll(".rin-week-content");
			for(var i = 0;i<allItem.length;i++){
				allItem[i].style.width = (allItem[i].scrollWidth>400 ? allItem[i].scrollWidth+20 : allItem[i].scrollWidth) +"px";
			}
		},
		getData: function(){
			var self = this;

			self.$http.get('https://bangumi.moe/api/v2/bangumi/current',function(data){
				var result = [];
				var teams = data.working_teams;
				var data = data.bangumis;

        for (var i = 0; i < data.length; i++){
        	//往番剧增加字幕组
        	if(teams[data[i].tag_id]){
        		data[i].team = teams[data[i].tag_id];
        	}

        	//按星期生成数组
          if(result[data[i].showOn]){
          		result[data[i].showOn].push(data[i]);
          }else{
          		result[data[i].showOn] = [data[i]];
          }

        }

        self.datas = result;

        setTimeout(function(){
        	self.setWidth();
        },100)

			})
		}
	},
	ready:function(){
		this.getData();



		//横向滚动
		var wrap = document.getElementById("rin-week");
    var eventName = document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
		function mouse_wheel(e){
			var wrapWidth = wrap.scrollWidth/25;

			var e = window.event || e;
			if(e.detail > 0 || e.wheelDelta < 0){
				wrap.scrollLeft += wrapWidth;
			}
			else{
				wrap.scrollLeft -= wrapWidth;
			}
		}
		wrap.addEventListener(eventName,mouse_wheel);

	}
}
</script>
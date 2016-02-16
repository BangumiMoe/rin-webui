<style scoped lang="less">
@import "../less/colors.less";

@color-tr-odd: rgba(233,233,233,0.25);
@color-tr-hover: rgba(200,200,200,0.7);
@color-th: rgba(233,233,233,0.9);
@color-th-bg: rgba(98,137,168,0.8);
@color-inline-tag: #6d6d6d;
@color-inline-tag-bg: #eeeeee;
@color-inline-tag-hover: #6d6d6d;
@color-inline-tag-bg-hover: #eeeeee;

@color-sidebar:#517896;
#rin-main{
	position:relative;
	height: 100%;
	overflow-x: hidden;
  overflow-y: auto;
}

.rin-head{
	position:relative;;
	top:0;
	left:0;
	right:0;
	text-align:center;
	color:#fff;
	background-color: @color-th-bg;
	z-index:1;
	overflow:hidden;
	width:100%;
	margin-right:128px;
	min-height: 53px;
	&.head-fixed{
		position: fixed;
		width: auto;
	}

	h3{
		color:@color-th;
		font-weight:400;
		font-size:16px;
		margin: 14px 0;
   	margin-bottom: 18px;
   	padding:0 65px;
	}
}

.rin-content{
	position:relative;
  width: 100%;

	&.head-fixed{
		padding-top: 53px;
	}

	.rin-details{
		width:100%;
		padding:20px;
  	box-sizing: border-box;

		>.rin-tag{
			border-bottom: 1px solid #ddd;
    	padding-bottom: 20px;
    	text-align: center;
		}

		.rin-details-intro{
	    padding: 30px;
	    margin: 40px;
	    border-left: 4px solid #ddd;
		}

		.rin-details-info{
			text-align:center;
			padding-bottom:10px;
			margin:0;
			color:#6d6d6d
		}
	}
}

	.rin-sidebar{
		opacity:0;
    position: absolute;
    right: 64px;
    bottom: 155px;
		padding-bottom: 4px;
    height: auto;
    z-index: 2;
		flex-direction:column-reverse;
		width:64px;
		border-bottom:1px solid #DE8F9F;

		&.action{
	    animation-duration: 1s;
	    animation-fill-mode: both;
			animation-name: fadeInUp;
		}

		.rin-button {
			margin: 4px 12px;
			text-shadow: 0 0 5px @color-primary-3;

			i { font-size: 32px; }
		}
	}

	.rin-bar-comment{
    position: absolute;
    right:128px;
    bottom: -1px;
    width: 500px;
    height: 335px;
    background: #fff;
		color:#666;
		border:1px solid #EF9EAE;
		border-right:0;
		transform:translate(100%);
		transition:transform .2s ease;
		box-sizing:border-box;
		padding:10px;

		&.active{
			transform:translate(0%)!important;
		}
		&.action{
			transform:translate(80%);
		}
	}
	.rin-team-signature{
		margin: 40px;
    border-left: 4px solid #ddd;
    padding: 0 20px;
    overflow: hidden;
	}

	.rin-bar-comment{
		z-index:1;
	}

	@keyframes fadeInUp {
	  from {
	    opacity: 0;
	    transform: translate3d(0, 100%, 0);
	  }

	  to {
	    opacity: 1;
	    transform: none;
	  }
	}
	.rin-details-intro{
		a {
			padding:0 2px;
			position:relative;
			color:rgba(98,137,168,0.8);
			padding-left: 24px;

			&:before{
			  content: "";
			  position: absolute;
			  z-index: -1;
			  left: 50%;
			  right: 50%;
			  bottom: 0;
			  background: rgba(98,137,168,0.8);
			  height: 1px;
			  transition-property: left, right;
			  transition-duration: 0.3s;
			  transition-timing-function: ease-out;
			}
			&:after{
				position:absolute;
				left:0;
				content:"link";
			  font-family: 'Material Icons';
			  font-weight: normal;
			  font-style: normal;
			  font-size: 22px;
			  line-height: 1;
			  letter-spacing: normal;
			  text-transform: none;
			  display: inline-block;
			  white-space: nowrap;
			  word-wrap: normal;
			  direction: ltr;
			  -webkit-font-feature-settings: 'liga';
			  -webkit-font-smoothing: antialiased;
			}
			&:hover:before{
			  left: 0;
			  right: 0;
			}
		}
	}
.rin-left{
  position: absolute;
  padding: 5px;
  left:0;
  top: 0;
  bottom:0;

	i {	font-size: 24px; }

  &:hover{
		color: #c0ded6;
  	background-color: #7894AB;
		i { color: #c0ded6; }
  }
}
.team-info{
	display:inline-block;
	height:20px;
	line-height:20px;
	overflow:hidden;
	border:1px solid @color-th-bg;
	vertical-align: middle;
	font-size:0;

	>a{
		display:inline-block;
		background:#fff;
		color:@color-th-bg;
		transition:all .2s linear;
		font-size:14px;

		&:hover{
			background:@color-th-bg;
			color:#fff;
		}
	}

	.name{
		padding:0 8px;
		font-weight:normal;
	}
	img{
		float:left;
		width:20px;
		height:20px;
	}
}
</style>
<template>
	<div class="rin-sidebar rin-row" v-bind:class="{'action':!busy}">
		<a class="rin-button" v-bind:href="data.downloadTorrent || ''">
			<i class="material-icons">&#xE2C4;</i>
			<tooltip :info="'torrent' | locale"></tooltip>
		</a>
		<a class="rin-button" v-bind:href="data.magnet">
			<i class="material-icons">&#xE8AB;</i>
			<tooltip :info="'magnet' | locale"></tooltip>
		</a>
		<a class="rin-button" href="javascript:void(0);"
					v-on:click="toggleComment"
					v-on:mouseenter="showComment"
					v-on:mouseleave="hideComment">
			<i class="material-icons">&#xE0B9;</i>
		</a>
	</div>
	<div class="rin-bar-comment" v-bind:class="{'active':isShow,'action':commentStatus}">
		评论内容
	</div>

  <div id="rin-main" style="width: calc(100% - 128px);" v-on:scroll="fixHeader">
    <div is="rin-loader" :progress="progress" v-show="busy" transition="rin-fade"></div>
		<div class="rin-head" v-show="!busy" transition="rin-fade" style="margin-right:{{getScrollWidth()+128}}px;" v-bind:class="{ 'head-fixed' : headerFixed}">
			<h3>
        <a class="rin-button rin-left" href="javascript:void(0)" @click="backHomepage">
          <i class="material-icons">&#xE5C4;</i>
        </a>
        <span>{{data.title || 'loading...'}}</span>
      </h3>
		</div>
		<div class="rin-content" v-show="!busy" transition="rin-fade" v-bind:style="{ paddingTop :( headerFixed ? getHeadHeight() :0) +'px'}">
			<div class="rin-details">
				<p class="rin-details-info">

					<span class="team-info">
						<a class="team" v-link="'/team/' + data.team._id" v-if="data.team.name">
							<img v-if="data.team.icon" v-bind:src="'//bangumi-moe.phoenixstatic.com/'+data.team.icon">
							<img src="../assets/akarin.jpg" v-if="!data.team.icon"/>
							<b class="name">{{data.team.name}}</b>
						</a>
						<a class="member" v-link="'/user/' + data.uploader._id">
							<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/avatar/'+data.uploader.emailHash">
							<b class="name">{{data.uploader.username}}</b>
						</a>
					</span>
					 {{'submitted' | locale}} {{data.publish_time | date 'yyyy/MM/dd HH:mm'}}
				</p>
				<div class="rin-tag">
					<a v-for="t in data.tags" v-link="'/tag/'+t._id" v-bind:class="{ 'haspic' : (t.type == 'bangumi' || t.type == 'team') }">
						<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/'+t.bangumi.icon" alt="{{t | locale}}" v-if="t.type == 'bangumi'">
						<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/'+t.team.icon" alt="{{t | locale}}" v-if="(t.type == 'team' && t.team.icon)">
						<img src="../assets/akarin.jpg" v-if="(t.type == 'team' && (!t.team || !t.team.icon))"/>
						<span>{{t | locale}}</span>
					</a>
				</div>

				<div class="rin-details-intro">
					{{{data.introduction}}}
				</div>
				<div class="rin-team-signature">
					{{{data.team.signature}}}
				</div>
				<div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			data:{},
			isShow:false,
			commentStatus:false,
			busy:true,
			headerFixed:false
		}
	},
	methods:{
		toggleComment:function(){
			this.isShow = !this.isShow;
			this.commentStatus = false;
		},
		showComment:function(){
			this.commentStatus = true;
		},
		hideComment:function(){
			this.commentStatus = false;
		},
    backHomepage () {
			if (window.history.lentgh>1){
				window.history.back()
			}else{
				this.$route.router.go({name:"index"});
			}

    },
		getScrollWidth () {
			var noScroll, scroll, oDiv = document.createElement("DIV");
			oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
			noScroll = document.body.appendChild(oDiv).clientWidth;
			oDiv.style.overflowY = "scroll";
			scroll = oDiv.clientWidth;
			document.body.removeChild(oDiv);
			return noScroll-scroll;
		},
		getHeadHeight(){
		 return	document.getElementsByClassName('rin-head')[0].clientHeight + 3;
		},
		resizeImage () {
			var wrapper=document.getElementsByClassName('rin-details-intro')[0],
					images=wrapper.getElementsByTagName('img'),
					wrapperWidth=wrapper.clientWidth-60;
			if (images.length == 0 || wrapperWidth<5) return;
			for (let img of images){
				if (!img.attributes['style']) break;
				let style=img.attributes['style'].value,styleWidth,styleHeight;
				[styleWidth,styleHeight]= [style.match(/width\s*?:\s*?([0-9]*?)px/i)[1] || (img.attributes['width'] ? img.attributes['width'].value : null), style.match(/height\s*?:\s*?([0-9]*?)px/i)[1] || (img.attributes['height'] ? img.attributes['width'].value : null)];
				if ((!styleWidth || !styleHeight)) break;
				if (!img.getAttribute('data-origin-width')) {
					img.setAttribute('data-origin-width',styleWidth);
				}
				if (img.getAttribute('data-origin-width') > wrapperWidth){
					styleHeight=Math.round(styleHeight * wrapperWidth / styleWidth);
					styleWidth=wrapperWidth;
					img.style.width=styleWidth+'px';
					img.style.height=styleHeight+'px';
				}
			}
		},
		fixHeader (e){
			if (e.target.scrollTop==0){
				if (this.headerFixed) this.headerFixed=false;
			}else if (!this.headerFixed){
				this.headerFixed=true;
			}
		}
	},
	route: {
		data (t) {
			var id = this.$route.params.key;
      return { id: id}
		}
	},
  filters:{
  	'date':require('../filters/dateFormat.js')
  },
  components: {
    'rin-loader': require('./../components/rin-loader'),
		'tooltip': require('./../components/nav-tooltip')
  },
  ready () {
    let self = this;
		self.$http.get("https://bangumi.moe/api/v2/torrent/"+this.id,{},function(data){
			self.data = data;
			//torrent文件
			self.data.downloadTorrent = "/download/torrent/" + self.id + "/" + data.infoHash + ".torrent";
			self.busy = false;
			setTimeout(()=>{
				self.resizeImage();
				window.addEventListener('resize',()=>{
					self.resizeImage();
				});
			},100)



		});

  }
}
</script>

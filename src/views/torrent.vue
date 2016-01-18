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
}

.rin-head{
	position:absolute;
	top:0;
	right:0;
	left:0;
	text-align:center;
	color:#fff;
	background-color: @color-th-bg;

	h3{
		color:@color-th;
		font-weight:400;
		font-size:16px;
	}
}

.rin-content{
	position:relative;
  margin-top: 53px;
  width: 100%;
  flex: 1;
  overflow-y:auto;
  overflow-x:hidden;

	.rin-details{
		width:100%;
		padding:20px;
  	box-sizing: border-box;

		.rin-tag{
			vertical-align:sub;
			vertical-align: -webkit-baseline-middle;
		}

		>.rin-tag{
			border-bottom: 1px solid #ddd;
    	padding-bottom: 20px;
    	text-align:center;

    	>span{
    		padding:0 5px;
    	}
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
		}
	}
}

	.rin-bar-btn{
		position:relative;
		display:block;
		height: 60px;
    line-height: 80px;
		text-align:center;
		cursor:pointer;
	  color: #fff;
	  text-shadow: 0 0 5px #DC778B;

	  i.material-icons{
	  	font-size:32px;
	  }

	  &:hover{
    	color: #F8D7DE;
	  }

	  &.rin-tip:hover:after{
	  	line-height:initial;
	  	right: 100%;
    	bottom: 22%;
	  }
	  &.rin-tip:hover:before{
			right: 84%;
    	bottom: 38%;
	  }
	}
	.rin-sidebar{
		opacity:0;
    position: absolute;
    right: 64px;
    bottom: 155px;
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
	}
	.rin-bar-comment{
    position: absolute;
    right:128px;
    bottom: 0;
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
</style>
<template>
	<div class="rin-sidebar rin-row" v-bind:class="{'action':!busy}">
		<a class="rin-bar-btn rin-tip left" v-bind:href="data.downloadTorrent" data-tool="{{locale.torrent[lang]}}"><i class="material-icons">&#xE2C4;</i></a>
		<a class="rin-bar-btn rin-tip left" v-bind:href="data.magnet" data-tool="{{locale.magnet[lang]}}"><i class="material-icons">&#xE8AB;</i></a>
		<a class="rin-bar-btn" href="javascript:void(0);"
					v-on:click="toggleComment"
					v-on:mouseenter="showComment"
					v-on:mouseleave="hideComment">
			<i class="material-icons">&#xE0B9;</i>
		</a>
	</div>
	<div class="rin-bar-comment" v-bind:class="{'active':isShow,'action':commentStatus}">
		评论内容
	</div>

  <div id="rin-main" class="rin-row" style="width: calc(100% - 128px);">
    <div is="rin-loader" :progress="progress" v-show="busy" transition="rin-fade"></div>
		<div class="rin-head" v-show="!busy" transition="rin-fade">
			<h3>
        <a class="rin-button rin-left" href="javascript:void(0)" @click="backHomepage">
          <i class="material-icons">&#xE5C4;</i>
        </a>
        <span>{{data.title || 'loading...'}}</span>
      </h3>
		</div>
		<div class="rin-content" v-show="!busy" transition="rin-fade">
			<div class="rin-details">
				<p class="rin-details-info">

					<a class="rin-tag">
						<span>
							<img v-bind:src="'https://bangumi-moe.phoenixstatic.com/'+data.team.icon">
							{{data.team.name}} | @{{data.uploader.username}}
						</span>
					</a>
					 提交于 {{data.publish_time | date 'yyyy-MM-dd HH:mm'}}
				</p>
				<div class="rin-tag">
					<span v-for="t in data.tags">
						<a v-bind:href="'/tag/'+t._id">{{t.locale[lang] ? t.locale[lang] : t.name}}</a>
					</span>
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
import RLoader from '../components/rin-loader';

export default {
	data(){
		return {
			data:{},
			isShow:false,
			commentStatus:false,
			busy:true,
    	lang:"ja",
    	locale:{
    		magnet:{
    			zh_cn:"磁力链接",
    			zh_tw:"磁力連結",
    			en:"MAGNET",
    			ja:"MAGNET",
    		},
    		comment:{
    			zh_cn:"评论",
    			zh_tw:"評論",
    			en:"COMMENTS",
    			ja:"COMMENTS",
    		},
    		torrent:{
    			zh_cn:"种子下载",
    			zh_tw:"種子下載",
    			en:"TORRENT",
    			ja:"TORRENT",
    		},
    	}
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
      window.history.back()
    },
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
    'rin-loader': RLoader
  },
  ready () {
    let self = this;
		self.$http.get("https://bangumi.moe/api/v2/torrent/"+this.id,{},function(data){
			self.data = data;
			//torrent文件
			self.data.downloadTorrent = "/download/torrent/" + self.id + "/" + data.infoHash + ".torrent";

			self.busy = false;
		});
  }
}
</script>
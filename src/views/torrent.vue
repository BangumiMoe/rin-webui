<style scoped lang="less">
@import "../less/colors.less";

@color-tr-odd: rgba(233,233,233,0.25);
@color-tr-hover: rgba(200,200,200,0.7);
@color-th: rgba(233,233,233,0.9);
@color-th-bg: rgba(98,137,168,1);
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
}

.rin-content{
	position:relative;
  margin-top: 54px;
  width: 100%;
  flex: 1;
  overflow-y:auto;
  overflow-x:hidden;

	.rin-details{
		width:100%;
		padding:20px;
  	box-sizing: border-box;

		.rin-tag{
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
	  color: #F4BCC7;
	  text-shadow: 0 0 5px #DC778B;

	  i.material-icons{
	  	font-size:32px;
	  }

	  &:hover{
    	color: #F8D7DE;
	  }
	}
	.rin-sidebar{
    position: absolute;
    right: -64px;
    bottom: 155px;
    height: auto;
    z-index: 2;
		flex-direction:column-reverse;
		width:64px;
		border-bottom:1px solid #DE8F9F;
	}
	.rin-bar-comment{
    position: absolute;
    right:0;
    bottom: 155px;
    width: 500px;
    height: 180px;
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
</style>
<template>
  <div id="rin-main" class="rin-row" style="width: calc(100% - 128px);">
    <div is="rin-loader" :progress="progress" v-if="busy" transition="rin-fade"></div>
		<div class="rin-head">
			<h3>{{data.title || 'loading...'}}</h3>
		</div>
		<div class="rin-sidebar rin-row">
			<a class="rin-bar-btn" v-bind:href="data.downloadTorrent"><i class="material-icons">&#xE2C4;</i></a>
			<a class="rin-bar-btn" v-bind:href="data.magnet"><i class="material-icons">&#xE8AB;</i></a>
			<a class="rin-bar-btn" href="javascript:void(0);"
						v-on:click="toggleComment" 
						v-on:mouseenter="showComment"
						v-on:mouseleave="hideComment">
				<i class="material-icons">&#xE0B9;</i>
			</a>
		</div>
		<div class="rin-content">
			<div class="rin-bar-comment" v-bind:class="{'active':isShow,'action':commentStatus}">
				评论内容
			</div>
			<div class="rin-details">
				<p class="rin-details-info">
					{{data.uploader.username}} @[{{data.team.name}}] 提交于 {{data.publish_time | date 'yyyy-MM-dd HH:mm'}}
				</p>
				<div class="rin-tag">
					<span v-for="t in data.tags">
						<a v-bind:href="'/tag/'+t._id">{{t.name}}</a>
					</span>
				</div>

				<div class="rin-details-intro">
					{{{data.introduction}}}
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
		}
	},
	route: {
		data (t) {
			var id = this.$route.params.key;
      return { id: id, content: null }
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
			console.log(data);
			self.data = data;
			//torrent文件
			self.data.downloadTorrent = "/download/torrent/" + self.id + "/" + data.infoHash + ".torrent";

			self.busy = false;
		});
  }
}
</script>
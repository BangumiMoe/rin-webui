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
  padding-top: 54px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;

	.rin-sidebar{
		flex-direction:column-reverse;
		background:@color-sidebar;
		width:65px;
	}

	.rin-details{
		width:100%;
		padding:20px;
	}
	.rin-bar-btn{
		position:relative;
		height: 60px;
    line-height: 73px;
		border-top:1px solid @color-sidebar;
		background:@color-th-bg;
		color:#fff;
		text-align:center;
		cursor:pointer;

		.rin-bar-content{
			position:absolute;
			top:0;
			bottom:0;
			width:500px;
			height:181px;
			background:#fff;
			color:#666;
			border:1px solid @color-th-bg;
			border-left:0;
			left:60px;
			z-index: -1;
		}
	}
}

</style>
<template>
  <div id="rin-main" class="rin-row" style="width: calc(100% - 128px);">
		<div class="rin-head">
			<h3>种子标题</h3>
		</div>
		<div class="rin-content rin-row">
			<div class="rin-sidebar rin-row">
				<div class="rin-bar-btn"><i class="material-icons">&#xE2C4;</i></div>
				<div class="rin-bar-btn"><i class="material-icons">&#xE8AB;</i></div>
				<div class="rin-bar-btn">
					<i class="material-icons">&#xE0B9;</i>
					<div class="rin-bar-content">
						评论内容
					</div>
				</div>
			</div>
			<div class="rin-details">
				内容
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {

		}
	},
	route:{
		data:function(t){
			var id = this.$route.params.key;
			// this.$http.post("https://bangumi.moe/api/torrent/fetch",{"_id":id},function(data){
			// 	console.log(data);
			// })
		}
	}

}
</script>
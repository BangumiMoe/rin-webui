<template>
<div class="upload-editor">
	<div class="torrent-title rin-form-group">
		<label class="rin-form-label">Title: </label>
		<input type="text" class="rin-form-control" placeholder="Title">
	</div>
	<div class="torrent-info">
		<div class="rin-form-group torrent-category">
			<label class="rin-form-label">
				Category: 
			</label>
			<select name="" id="" class="rin-form-control">
				<option value="0" label="[Collection]">[Collection]</option>
				<option value="1" label="Movie">Movie</option>
				<option value="2" label="Music">Music</option>
				<option value="3" label="Comic">Comic</option>
				<option value="4" label="Game">Game</option>
				<option value="5" selected="selected" label="Animation">Animation</option>
				<option value="6" label="Other">Other</option>
				<option value="7" label="Dorama">Dorama</option>
			</select>
		</div>

		<div class="torrent-tags rin-form-group">
			<label class="rin-form-label">Tags: </label>
			<div class="new-tag-control">
				<input type="text" class="rin-form-control" placeholder="tags">
				<button class="rin-button2 new-tag-button">
					+
				</button>		
			</div>
		</div>
	</div>
	<div class="torrent-description rin-form-group">
		<label class="rin-form-label">Content: </label>
		<textarea name="" id="" cols="30" rows="10" class="rin-form-control" placeholder="content"></textarea>
	</div>
	<div class="torrent-content rin-form-group">
		
	</div>

	<div class="torrent-description rin-form-group">
		<label class="rin-form-label">{{ "btsync key" | locale }}: </label>
		<input type="text" class="rin-form-control" placeholder="btsync key">
	</div>

	<div class="torrent-publish">
		<button class="rin-button2 rin-button2-primary">{{ "Publish" | locale }}</button>
	</div>
</div>
</template>
<style scoped lang="less">
  @import "../less/colors.less";

.rin-form-group{
	margin-bottom: 15px;
}
.rin-form-control{
  display: block;
  width: 100%;
  height: 35px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  transition: border-color ease-in-out .15s;
  box-sizing: border-box;
  outline: 0;

  &:hover,&:focus{
  	border-color: @color-primary-4;
  }

}

textarea.rin-form-control{
	height: auto;
}

.rin-form-label{
	padding: 5px;
	padding-left: 0;
	color: @color-primary-4;
}

.new-tag-control{
	>input{
		display: inline-block;
		width: 160px;
	}
	.new-tag-button{
		display: inline-block;
	}
}

.rin-button2{
	background: none;
	outline: 0;
	border: 1px solid #bdbdbd;
	height: 35px;
	padding: 0 12px;
  transition: all ease-in-out .15s;
  border-radius: 3px;
	color: @color-primary-4;

	&:hover{
		background: #eee;
		border-color: @color-primary-4;
	}
	&:active{
    background: #ddd;
	}

	&.rin-button2-primary{
		background: @color-primary-3;
		border-color: @color-primary-3;
		color: #fff;

		&:hover{
			background: lighten(@color-primary-3, 10%);
		}
		&:active{
			background: @color-primary-4;
		}
	}
}

.torrent-category{
	select{
		width: 160px;
	}
}
.torrent-publish{
	text-align: center;
}

</style>
<script>
</script>
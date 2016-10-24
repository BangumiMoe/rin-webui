<template>
<div class="upload">  
  
  <div class="uploader">
    <p class="publish">{{ $t('Publish Identity') }}</p>
    <div class="avatar">
      <img src="../assets/akarin.jpg" alt="avatar">
    </div>
    <p class="username">Akarin</p>
  </div>

  <div class="upload-box"
    @dragenter="dragStatus = true"
    @dragleave="dragStatus = false"
    :class="{'hovered': dragStatus}"
  >
    <input type="file" 
      id="torrentFile"
      @change="onFileChange"
    >
  	<div class="icons" :class="iconName">
      <Loading v-if="isShowLoading"></Loading>
      <i class="material-icons icon-upload" v-if="!isShowLoading">{{ iconName }}</i> 
    </div>
    <p class="text">
      {{ $t('Please select your team first.') }}
      <br>
      <span class="plain">{{ $t('Then drop a torrent file or select a file here.') }}</span>
    </p>
    <p class="text">
      {{ statusText }}
    </p>
  </div>

  <Editor></Editor>  
</div>
</template>
<script>
import Loading from './rin-loading';
import Editor from './rin-upload-editor';

export default {
  name: 'RinUploadBox',
  components: {
    Loading,
    Editor,
  },
  data() {
    return {
      iconName: 'cloud_upload',
      dragStatus: false,
      statusText: '',
      isShowLoading: false,
    };
  },
  methods: {
    cilckUpload() {
      const file = document.getElementById('torrentFile');
      file.click();
    },
    onFileChange(e) {
      e.preventDefault();
      this.dragStatus = false;
      const files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }

      console.log(files);

      // 后缀名判断
      const name = files[0].name;
      const nameArr = name.split('.');
      const suffix = nameArr[nameArr.length - 1];
      if (suffix !== 'torrent') {
        this.iconName = 'cloud_off';
        return;
      }

      this.statusText = name;
      // upload
      this.isShowLoading = true;

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('team_id', null);
      this.$http.post('https://bangumi.moe/api/v2/torrent/upload', formData)
        .then((result) => {
          this.isShowLoading = false;

          const { message } = result.data;

          if (result.data.success) {
            this.iconName = 'cloud_done';
          } else {
            this.iconName = 'cloud_off';
            this.statusText = message || name;
          }
        });
    },
  },
};
</script>
<style scoped lang="less">
  @import "../less/colors.less";
  @import "../less/framework.less";

.upload{
  margin: 0 auto;
}
.uploader{
  text-align: center;
  .publish{
    font-size: 16px;
    color: @color-primary-2;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  .avatar{
    img{
      width: 50px;
      height: 50px;
      border-radius: 50px;
      border: 2px solid @color-primary-0;
    }
  }
  .username{
    margin-top: .3em;
    color: @color-primary-0;
  }
}

.upload-box{
  position: relative;
  border: 3px dashed #ddd;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 3px;
  text-align: center;
  background: #f9f9f9;
  cursor: pointer;
  margin-bottom: 3em;

  #torrentFile{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  &.hovered{
    border-color: @color-primary-0;
    background: #d0f1ff;
  }

  .icons{
    padding-top: 40px;
    color: #bbb;

    i{
      font-size: 100px;
    }

    &.cloud_off{
      color: #e24f4f;
    }
    &.cloud_done{
      color: @color-primary-0;
    }
  }
  >.text{
    font-size: 18px;
    padding: 0 20px;
    color: #666;
    .plain{
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
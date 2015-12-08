<style lang="less">
  @import "../less/colors.less";
  
  #rin-toolbar {
    background-color: @color-secondary-1-4;
    color: @color-secondary-1-0;
    
    .rin-logo {
      display: inline-block;
      margin: 16px 4px;
      img {
        border-radius: 28px;
        border: 4px solid @color-secondary-1-1;
        width: 48px;
      }
    }
    
    .rin-search {
      position: absolute;
      right: 8px;
      bottom: 8px;
      
      i {
        font-size: 48px;
      }
    }
  }
</style>

<template>
<div id="rin-toolbar" class="rin-main-bar rin-col">

  <span class="rin-logo">
    <img src="../assets/user-demo.png" />
  </span>
  
  <span class="rin-search">
    <i class="material-icons">&#xE8B6;</i>
  </span>
  
</div>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          username: 'Demo Rin User'
        }
      };
    }
  };
</script>

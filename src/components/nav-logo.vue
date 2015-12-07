<style lang="less">
  @import "../less/colors.less";
  
  #rin-logo {
    background-color: @color-primary-3;
    color: @color-primary-0;
    
    .logo {
      display: block;
      
      img {
        position: absolute;
        top: 48px;
        right: -46px;
        height: 68px;
        -ms-transform:rotate(270deg);
        -moz-transform:rotate(270deg);
        -webkit-transform:rotate(270deg);
        -o-transform:rotate(270deg);
      }
    }
    
    .copyright {
      position: absolute;
      right: 6px;
      bottom: 1em;
      writing-mode: vertical-lr;
      -ms-transform:rotate(180deg);
      -moz-transform:rotate(180deg);
      -webkit-transform:rotate(180deg);
      -o-transform:rotate(180deg);
    }
  }
</style>

<template>
<div id="rin-logo" class="rin-main-bar rin-col rin-right">

  <span class="logo">
    <img src="../assets/logo-20150506.png" />
  </span>
  
  <span class="copyright">
    © 2015 Bangumi.moe. All rights reserved.
  </span>
  
</div>
</template>

<script>
  export default {};
</script>

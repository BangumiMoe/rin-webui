<style lang="less">
  @import "../less/colors.less";

  .rin-infobox p{
    white-space: nowrap;
    color: aliceblue;
    margin-left: 10px;
  }

  .rin-logo .rin-infobox {
    border-radius: 20px;
    width: 220px;
    height: 150px;
    background-color: @color-secondary-1-0;
    color: blue;
    position: absolute;
    top: 20px;
    left: 0px;
    -webkit-transition: all 0.2s ease-out;
  }

  .rin-logo:hover .rin-infobox {
    left: -235px;
  }

  .rin-logo .rin-infobox:after {
    content: "";
    width: 0; 
    height: 0; 
    border-top: 25px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 15px solid @color-secondary-1-0;
    position: absolute;
    top: 8px;
    right: -10px;
    display: block;
  }

</style>

<template>
  <div class="rin-infobox">
    <p>username: <span>{{user.username}}</span></p>

    <p> 信息 </p>
    <p> 提示 </p>
  </div>
</template>

<script>
  export default {
    props: ['user'],
    data () {
      return {};
    },
  }
</script>

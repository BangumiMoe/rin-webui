<style lang="less">
  @import "../less/colors.less";

  .rin-infobox p{
    white-space: nowrap;
    color: aliceblue;
    margin-left: 5px;
  }

  .rin-logo .rin-infobox {
    border-radius: 4px;
    width: 0px;
    height: 150px;
    background-color: @color-secondary-1-0;
    color: blue;
    position: absolute;
    top: 20px;
    left: 0px;
    -webkit-transition: all 0.2s ease-out;
  }

  .rin-logo:hover .rin-infobox {
    left: -210px;
    width: 200px;
  }

  .rin-logo .rin-infobox:after {
    content: "";
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid @color-secondary-1-0;
    position: absolute;
    top: 20px;
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

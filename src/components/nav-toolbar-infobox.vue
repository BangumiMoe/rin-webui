<style lang="less">
  @import "../less/colors.less";

  .rin-infobox-wrap {
    position: absolute;
    top: 20px;
    left: 0px;
    transition: all 0.2s ease-out;
    width: 0px;
    overflow: hidden;
  }

  .rin-logo:hover .rin-infobox-arrow-right {
    left: -235px;
    width: 235px;
  }

  .rin-infobox {
    border-radius: 10px;
    border-width: 1px 4px 3px 2px;
    border-color: @color-primary-2;
    border-style: solid;
    padding: 15px 0px;
    width: 220px;
    min-height: 40px;
    max-height: 300px;
    background-color: @color-primary-4;
    color: @color-primary-2;
    position: relative;
  }

  .rin-infobox:after {
    content: "";
    width: 0; 
    height: 0; 
    position: absolute;
    top: 8px;
    display: block;
  }

  .rin-infobox-arrow-right .rin-infobox:after {
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid @color-primary-4;
    right: -10px;
  }

  .rin-infobox-arrow-left .rin-infobox:after {
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid @color-primary-4;
    left: -10px;
  }

  .rin-infobox-arrow-left .rin-infobox{
    right: -15px;
  }

  .rin-infobox p{
    white-space: nowrap;
    color: aliceblue;
    margin-left: 10px;
  }

</style>

<template>
  <div class="rin-infobox-wrap rin-infobox-arrow-{{arrow}}">
    <div class="rin-infobox">
      <p>Hi, {{user.username || "Anonymous" }}!</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['user', 'arrow'],
    data () {
      return {};
    }
  }
</script>

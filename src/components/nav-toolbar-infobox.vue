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
    left: -237px;
    width: 237px;
  }

  .rin-infobox-inner{
    position: relative;
    width: 224px;
    border: 2px solid #681558;
    border-radius: 10px;
  }

  .rin-infobox {
    border-radius: 10px;
    border: 2px solid #fff;
		z-index: 1;
    padding: 15px 0px;
    width: 220px;
    min-height: 40px;
    max-height: 300px;
    background-color: @color-primary-4;
    color: @color-primary-2;
    position: relative;
  }

  .rin-infobox-inner:after {
    content: "";
    width: 9px; 
    height: 10px; 
    border-top: 2px solid #681558;
    border-right: 2px solid #681558;
    transform: rotate(45deg);
    background: white;
    position: absolute;
    top: 10px;
    display: block;
  }

  .rin-infobox-arrow-right .rin-infobox-inner:after {
    top: 10px;
    right: -5px;
    top: 10px;
    z-index: 0;
  }

  .rin-infobox-arrow-left .rin-infobox-inner:after {
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
    <div class="rin-infobox-inner">
      <div class="rin-infobox">
        <slot></slot>
        <p>Hi, {{user.username || "Anonymous" }}!</p>
      </div>
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

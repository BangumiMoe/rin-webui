<template>
  <div class="system-navigation">

    <span class="web-logo">
      <img src="@/assets/logo-20150506.png" alt="web logo">
    </span>

    <span class="web-copyright">©2015~2018 Bangumi.moe. All rights reserved.</span>

  </div>
</template>

<script>
export default {
  name: "SystemNavigation",
  props: {}
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

.system-navigation {
  width: 64px;
  height: 100vh;
  background-color: @color-4;

  .web-logo {
    // position: relative;
    img {
      position: absolute;
      display: inline-block;
      top: 142px;
      width: 142px;
      margin-top: .2rem;
      transform-origin: 0 0;
      transform: rotate(270deg);
    }
  }

  .web-copyright {
    position: absolute;
    font-size: 14px;
    color: @color-3;
    right: .8rem;
    bottom: .6rem;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
}
</style>

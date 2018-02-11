<template>
  <div class="system-toolbar grid-x grid-padding-x">
    <div class="cell auto">
      &nbsp;
    </div>

    <div class="cell medium-3 large-2 text-right">
      <a>Sign In</a>
      <span class="split">|</span>
      <a>Regsiter</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemToolbar",
  props: {}
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

.system-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(~"100vw - 64px");

  height: 32px;
  font-size: 16px;
  color: @color-3;
  background-color: @color-4;

  .split {
    color: @color-3;
    height: 32px;
    font-size: 16px;
    line-break: 32px;
  }
  a {
    display: inline-block;
    color: @color-3;
    height: 24px;
    margin: 4px;
    font-size: 13px;
    line-height: 24px;

    &:hover {
      color: @color-2;
    }
  }
}
</style>

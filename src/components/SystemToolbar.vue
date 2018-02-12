<template>
  <div class="system-toolbar grid-x grid-padding-x">
    <div class="cell auto">
      <router-link :to="{ name: 'Index' }">Index</router-link>
    </div>

    <div class="cell medium-3 large-2 text-right">

      <router-link :to="{ name: 'UserSignIn' }" v-if="!user.isSignIn()">Sign In</router-link>
      <!-- <router-link :to="{ name: 'UserProfile' }" v-if="user.isSignIn()">{{user.name}}</router-link> -->

      <span class="split">|</span>
      <a>Regsiter</a>
    </div>
  </div>
</template>

<script>
import { user } from "@/modules/user";

export default {
  name: "SystemToolbar",
  props: {},
  data() {
    return { user };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

.system-toolbar {
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;

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

<template>
  <div class="system-toolbar grid-x grid-padding-x">
    <div class="cell auto">
      <router-link :to="{ name: 'Index' }">Index</router-link>
    </div>

    <div class="cell right-bar text-right" v-if="!user.isSignIn">
      <router-link :to="{ name: 'UserSignIn' }">Sign In</router-link>
      <span class="split">|</span>
      <a>Regsiter</a>
    </div>

    <div class="cell right-bar text-right" v-if="user.isSignIn">
      <UserLink :user="user"></UserLink>
      <span class="split">|</span>
      <a>Out</a>
    </div>
  </div>
</template>

<script>
import { user } from "@/modules/user";
import UserLink from "@/components/UserLink";

export default {
  name: "SystemToolbar",
  components: { UserLink },
  props: {},
  data() {
    return { user };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@bar_height: 32px;
@item_height: 22px;

.system-toolbar {
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;

  height: @bar_height;
  border-right: 0.5rem solid @color-4;
  box-shadow: inset 0px -2px 1px #efefef;
  // border-bottom: 1px solid @color-1;

  .right-bar {
    width: 16rem;
  }

  .split {
    height: 32px;
    font-size: 16px;
    line-break: 32px;
  }
  a {
    display: inline-block;
    height: @item_height;
    margin: 4px;
    font-size: round(@item_height * 0.6);
    line-height: @item_height;
  }
}
</style>

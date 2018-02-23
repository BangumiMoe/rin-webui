<template>
  <div class="system-toolbar grid-x grid-padding-x">
    <div class="cell auto">
      <div class="grid-x">

        <div class="cell link">
          <router-link :to="{ name: 'Index' }">Index</router-link>
          <router-link :to="{name: 'MyTorrents'}" v-if="user.isSignIn">My Torrents</router-link>
        </div>

        <GlobalFilter class="cell auto"></GlobalFilter>

      </div>

    </div>

    <div class="cell right-bar text-right" v-if="!user.isSignIn">
      <router-link :to="{ name: 'UserSignIn' }">Sign In</router-link>
      <span class="split">|</span>
      <a>Regsiter</a>
    </div>

    <div class="cell right-bar text-right" v-if="user.isSignIn">
      <UserLink :user="user"></UserLink>
    </div>
  </div>
</template>

<script>
import { user } from "@/modules/user";
import UserLink from "@/components/UserLink";
import GlobalFilter from "@/components/GlobalFilter";

export default {
  name: "SystemToolbar",
  components: { UserLink, GlobalFilter },
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
  height: @bar_height;
  border-right: 0.5rem solid @color-4;
  box-shadow: inset 0px -2px 1px #efefef;

  .right-bar {
    width: 16rem;
  }

  .split {
    height: 32px;
    font-size: 16px;
    line-break: 32px;
  }

  .link {
    display: inline-block;
    height: @bar_height;
    font-size: round(@item_height * 0.6);
    line-height: @bar_height;
    padding: 0 .5rem;
    width: 6rem;

  }
}
</style>

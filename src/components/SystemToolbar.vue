<template>
  <div class="system-toolbar grid-x grid-padding-x">

    <div class="cell logo">
      <router-link :to="{ name: 'Index' }">
        <img src="@/assets/logo-20150506.png" alt="logo">
      </router-link>

      <!-- <router-link :to="{name: 'MyTorrents'}" v-if="user.isSignIn">My Torrents</router-link> -->
    </div>

    <GlobalFilter class="cell auto"></GlobalFilter>

    <div class="cell medium-4 right-bar text-right">
        <router-link class="button small" :to="{ name: 'UserSignIn' }" v-if="!user.isSignIn">Sign In</router-link>
        <UserLink :user="user" v-if="user.isSignIn"></UserLink>
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

@bar_height: 6rem;

.system-toolbar {
  height: @bar_height;
  box-shadow: inset 0px -2px 1px #efefef;
  padding-top: @bar_height * 0.15;

  .logo {
    width: 12rem;
    a {
      img {
        display: inline-block;
        width: 100%;
      }
    }
  }

  .right-bar {
    .button {
      margin: 0;
    }
  }
}
</style>

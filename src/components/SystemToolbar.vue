<template>
  <div class="system-toolbar grid-x grid-padding-x">

    <div class="cell logo small-12 medium-3 large-2">
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
  box-shadow: inset 0px -3px 6px #eee;

  /* Small only */
  @media screen and (max-width: 39.9375em) {
    min-height: @bar_height * 2;
    line-height: @bar_height;
    padding-top: 2rem;

    .logo a img {
      width: 100%;
      height: auto;
      text-align: center;
    }
  }

  /* Medium and up */
  @media screen and (min-width: 40em) {
    min-height: @bar_height;
    line-height: @bar_height;

    .logo a img {
      display: inline-block;
      height: @bar_height * 0.66;
    }
  }

  .right-bar {
    .button {
      margin: 0;
    }
  }
}
</style>

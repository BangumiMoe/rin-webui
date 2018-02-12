<template>
  <div id="app" class="grid-x">
    <div class="cell auto main-content">
      <SystemToolbar class="toolbar"></SystemToolbar>
      <router-view class="router-view"></router-view>
    </div>

    <SystemNavigation class="cell"></SystemNavigation>
  </div>
</template>

<script>
import { user } from "@/modules/user";

import SystemNavigation from "@/components/SystemNavigation";
import SystemToolbar from "@/components/SystemToolbar";

export default {
  name: "app",
  props: {
    user
  },
  components: {
    SystemNavigation,
    SystemToolbar
  },
  mounted() {
    if (!user.isSignIn) {
      user.checkSignIn().then(user => {
        if (user !== null) {
          console.info(`${user} is sign in.`);
        }
      });
    }
  }
};
</script>

<style lang="less">
body {
  /* from https://github.com/zenozeng/fonts.css */
  font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L",
    Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei",
    "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei,
    "WenQuanYi Zen Hei Sharp", sans-serif;
}

.toolbar {
  height: 32px;
}

.router-view {
  height: calc(~"100vh - 32px");
}
</style>

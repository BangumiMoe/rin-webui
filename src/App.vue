<template>
  <div id="app">
    <SystemToolbar class="toolbar"></SystemToolbar>
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
import { user } from "@/modules/user";

// import SystemNavigation from "@/components/SystemNavigation";
import SystemToolbar from "@/components/SystemToolbar";

export default {
  name: "app",
  components: {
    // SystemNavigation,
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
@import url(https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/web-fonts-with-css/css/fontawesome-all.min.css);

.breadcrumbs li:not(:last-child)::after {
  position: inherit;
}

.font-hei() {
  font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L",
    Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei",
    "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei,
    "WenQuanYi Zen Hei Sharp", sans-serif;
}

body {
  /* from https://github.com/zenozeng/fonts.css */
  font-family: font-hei();
}

.toolbar {
  z-index: 2;
}
.main-content {
  z-index: 1;
  height: calc(~"100vh - 6rem");
}
</style>

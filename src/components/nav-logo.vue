<style scoped lang="less">
  @import "../less/colors.less";
  #rin-logo {
    background-color: @color-primary-4;
    color: @color-primary-0;
    z-index: 1;
    flex-shrink: 0;
    .logo {
      display: block;
      cursor: pointer;
      img {
        position: absolute;
        top: 48px;
        right: -46px;
        height: 68px;
        max-width: 1024px;
        transform: rotate(270deg);
      }
    }
    .copyright {
      position: absolute;
      right: 6px;
      bottom: 1em;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
    }
  }
</style>

<template>
<div id="rin-logo" class="rin-main-bar rin-col" >

  <span class="logo" >
    <router-link :to="{name:'index'}">
      <img src="../assets/logo-20150506.png" />
    </router-link>
  </span>

  <nav-logo-language></nav-logo-language>

  <span class="copyright">
    © 2015 Bangumi.moe. All rights reserved.
  </span>

</div>
</template>

<script>
  import NavLogoLanguage from './nav-logo-language';
  export default {
    name: 'NavLogo',
    components: {
      'nav-logo-language': NavLogoLanguage,
    },
    methods: {
      // modalDemo() {
      //   this.$dispatch('open-modal', {
      //     modalId: 'modal-demo',
      //     danger: false,
      //     noCancel: false,
      //   });
      // },
      chooseLanguage(ev) {
        this.$emit('chooseLanguage', ev);
      },
    },
  };
</script>
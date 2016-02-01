<style scoped lang="less">
  @import "../less/colors.less";

  #rin-logo {
    background-color: @color-primary-4;
    color: @color-primary-0;
    z-index:1;
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
        transform:rotate(270deg);
      }
    }

    .copyright {
      position: absolute;
      right: 6px;
      bottom: 1em;
      writing-mode: vertical-lr;
      transform:rotate(180deg);
    }
  }
</style>

<template>
<div id="rin-logo" class="rin-main-bar rin-col" >

  <span class="logo" >
    <a v-link="{name:'index'}"><img src="../assets/logo-20150506.png" /></a>
  </span>

  <nav-logo-language></nav-logo-language>

  <span class="copyright" v-on:click="modalDemo">
    © 2015 Bangumi.moe. All rights reserved.
  </span>

</div>
</template>

<script>
  export default {
    components: {
      'nav-logo-language': require('./nav-logo-language'),
    },
    methods:{
      modalDemo: function (event) {
        this.$dispatch("open-modal",{
          modalId:"modal-demo",
          danger:false,
          noCancel:false
        });
      },
      modalDemoSimple:function(event){
        this.$dispatch("open-modal",{
          title:"你好，世界~",
          content:"唉，我也替你们着急呀，真的。 你们就——我以为整天的—— 你们有一个好——全世界跑到什么地方，你们比其他的西方记者，跑得还快！但是问来问去的问题呀，都too simple!啊~ sometimes naive! ？！ <br>the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog"
        })
      },
      chooseLanguage (ev) {
        this.$broadcast('chooseLanguage', ev);
      }
    }
  };
</script>

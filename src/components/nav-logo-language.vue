<style scoped media="screen" lang="less">
@keyframes fadeToUp {
  0% { opacity: 0; transform: translate3d(0, 100%, 0) }
  75% { opacity: 0.6; transform: none; }
  100% { opacity: 1; }
}
#rin-language {
  position: absolute;
  bottom: 1.2em;
  left: 7px;

  a i{font-size: 28px}

  .chooser {
    font-family: fantasy;
    display: none;
    z-index: 100;

    &.show {
      display: inline-block;
      animation: fadeToUp 1s 1;
    }
  }
}
</style>

<template>
  <div id="rin-language">
    <div class="chooser" :class="{show: toggleFlag}">
        <button class="rin-button" @click="changeLang('zh_cn')">简</button>
        <button class="rin-button" @click="changeLang('zh_tw')">繁</button>
        <button class="rin-button" @click="changeLang('en')">EN</button>
    </div>
    <a class="rin-button round rin-tip left"
      href="javascript:void(0)"
      data-tool="{{'Choose language'|locale}}"
      @click="toggleChooser">
      <i class="material-icons">&#xE894;</i>
    </a>
  </div>
</template>

<script>
  export default {
    data () { return {
      toggleFlag: false,
    }},
    methods:{
      toggleChooser (ev) {
        this.toggleFlag =! this.toggleFlag;
      },
      changeLang (lng) {
        this.$dispatch('changeLang', lng);
      }
    }
  };
</script>

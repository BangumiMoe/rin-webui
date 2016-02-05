<style scoped media="screen" lang="less">
@keyframes fadeToUp {
  0% { opacity: 0; transform: translate3d(0, 100%, 0) }
  75% { opacity: 0.6; transform: none; }
  100% { opacity: 1; }
}
@keyframes fadeToBom {
  0% { opacity: 1;  }
  75% { opacity: 0.6; transform: none; }
  100% { opacity: 0; transform: translate3d(0, 100%, 0)}
}
#rin-language {
  position: absolute;
  bottom: 1.2em;
  left: 7px;
  width: 32px;

  a i{font-size: 20px}

  .chooser {
    font-family: fantasy;
    //display: none;
    z-index: 100;

    &.choice-enter {
      animation: fadeToUp 1s 1;
    }
    &.choice-leave {
      animation: fadeToBom 1s 1;
    }
  }
  
  /* fix tooltip position */
  .rin-tooltip-wrap.rin-tooltip-right {
    right: 0;
  }
}
</style>

<template>
  <div id="rin-language">
    <div class="chooser" v-if="toggleFlag" transition="choice">
        <button class="rin-button" @click="changeLang('zh_cn')">简</button>
        <button class="rin-button" @click="changeLang('zh_tw')">繁</button>
        <button class="rin-button" @click="changeLang('en')">EN</button>
    </div>
    <a class="rin-button round rin-button-small"
      href="javascript:void(0)"
      @click="toggleChooser">
      <i class="material-icons">&#xE894;</i>
      <tooltip :info="'Choose language' | locale"></tooltip>
    </a>
  </div>
</template>

<script>
  export default {
    data () { return {
      toggleFlag: false,
    }},
    components: {
      'tooltip': require('./nav-tooltip')
    },
    methods:{
      toggleChooser (ev) {
        this.toggleFlag =! this.toggleFlag;
      },
      changeLang (lng) {
        this.$dispatch('changeLang', lng);
        this.toggleChooser()
      }
    }
  };
</script>

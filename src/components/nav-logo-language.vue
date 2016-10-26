<style scoped lang="less">
  @import "../less/colors.less";
  @keyframes fadeToUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
    75% {
      opacity: 0.6;
      transform: none;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes fadeToBom {
    0% {
      opacity: 1;
    }
    75% {
      opacity: 0.6;
      transform: none;
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
  }
  
  #rin-language {
    position: absolute;
    bottom: 1em;
    left: 7px;
    width: 32px;
    a i {
      font-size: 20px
    }
    .chooser {
      font-family: fantasy;
      z-index: 100;
      &.choice-enter, &.choice-enter-active {
        animation: fadeToUp 1s 1;
      }
      &.choice-leave, &.choice-leave-active {
        animation: fadeToBom 1s 1;
      }
      .rin-button {
        color: @color-primary-0;
        &:hover {
          color: @color-primary-1;
          i {
            color: @color-primary-2
          }
        }
      }
    }
    > .rin-button {
      text-shadow: 0 0 5px @color-primary-3;
    }
    .rin-button {
      width: 20px;
      height: 20px;
      margin: 6px 6px;
    }
  }
</style>

<template>
  <div id="rin-language">
    <transition name="choice">
    <div class="chooser" v-show="toggleFlag">
        <button class="rin-button" @click="change_lang('zh_cn')">简</button>
        <button class="rin-button" @click="change_lang('zh_tw')">繁</button>
        <button class="rin-button" @click="change_lang('en')">en</button>
    </div>
    </transition>

    <a class="rin-button round rin-button-small"
      @click.stop="toggle_chooser">
      <i class="fa fa-language"></i>
      <tooltip :info="$t('Choose language')"></tooltip>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'NavLogoLanguage',
    data() {
      return {
        toggleFlag: false,
      };
    },
    components: {
      tooltip: require('./nav-tooltip.vue'),
    },
    methods: {
      toggle_chooser() {
        this.toggleFlag = !this.toggleFlag;
      },
      change_lang(lng) {
        this.$root.$emit('LanguageSelected', lng);
        this.toggle_chooser();
      },
    },
  };
</script>
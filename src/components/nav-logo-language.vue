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
      &.choice-enter {
        animation: fadeToUp 1s 1;
      }
      &.choice-leave {
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
  import tooltip from './nav-tooltip';
  export default {
    name: 'NavLogoLanguage',
    data() {
      return {
        toggleFlag: false,
      };
    },
    components: {
      tooltip,
    },
    methods: {
      toggleChooser() {
        this.toggleFlag = !this.toggleFlag;
      },
      changeLang(lng) {
        this.$dispatch('changeLang', lng);
        this.toggleChooser();
      },
    },
  };
</script>
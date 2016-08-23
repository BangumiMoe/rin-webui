<style lang="less" src="./less/framework.less"></style>
<style lang="less" src="./less/colors.less"></style>
<style lang="less" src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>
    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>
    <rin-modal></rin-modal>
    <rin-user></rin-user>
    <modal-signin></modal-signin>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Cookies from 'js-cookie';

  Vue.config.lang = 'zh-tw';
  Vue.locales = {};

  Vue.filter('locale', (value) => {
    if (!value) {
      return value;
    }
    // method 1
    if (value.locale) {
      let text = value.locale[Vue.config.lang];
      // if(!text) text = value.locale[this.$root.lang_default];
      if (!text) text = value.name; // 再找不到的话就取默认值，16/01/24  @zzetao
      return text;
    }
    if ((typeof value) === 'string') {
      const locale = Vue.locales[Vue.config.lang];
      if (locale) {
        let text = locale[value];
        if (!text) text = value;
        return text;
      }
    }

    return value;
  });

  export default {
    name: 'RinWebApp',
    data() {
      return {
        displaySigninForm: false,
        locales: {},
        lang: 'en',
        lang_default: 'en',
      };
    },
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
      'rin-modal': require('./components/rin-modal'),
      'rin-user': require('./components/rin-user'),
      'modal-signin': require('./components/modal-signin'),
    },
    methods: {
      updateLocales(lng) {
        // TODO busy controller
        try {
          Vue.locales[lng] = require(`./i18n/${lng}.json`);
          Vue.config.lang = lng;

          // site title update
          document.title = this.locales[lng]['番組、萌え'];
          Cookies.set('locale', lng);

          this.$broadcast('LangChanged', lng);
        } catch (err) {
          this.$broadcast('LangChangedFail', lng);
        }
      },
    },
    events: {
      'open-modal' (opt) {
        this.$broadcast('open-modal', opt);
      },
      'open-modal-blur' () {
        this.$broadcast('open-modal-blur');
      },
      'close-modal-blur' () {
        this.$broadcast('close-modal-blur');
        if (this.displaySigninForm) {
          this.displaySigninForm = false;
        }
      },

      // display sign in form modal
      displaySigninForm() {
        if (this.displaySigninForm) {
          return;
        }
        this.displaySigninForm = true;
        this.$dispatch('open-modal', {
          modalId: 'modal-signin',
        });
      },

      UserSignIn(form) {
        this.$broadcast('rinUserSignIn', form);
      },
      UserSignInOK(user) {
        this.$broadcast('UserSignInOK', user);
        if (this.displaySigninForm) {
          this.displaySigninForm = false;
          this.$broadcast('close-modal');
        }
      },
      UserSignInFailed(...args) {
        this.$broadcast('UserSignInFailed', ...args);
      },
      UserSignOut() {
        this.$broadcast('rinUserSignOut');
        this.$broadcast('UserSignOutOK');
      },

      changeLang(lng) {
        this.updateLocales(lng);
      },
    },
    ready() {
      const lang = Cookies.get('locale');
      if (lang) {
        Vue.config.lang = lang;
      }

      // if (!Vue.config.lang) {
      //   const languageList = ['zh_tw', 'zh_cn', 'en'];
      //   // 获取浏览器语言
      //   let getLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();

      //   if (getLanguage) {
      //     getLanguage = getLanguage.replace(/^en(-.+)/, 'en').replace('-', '_');
      //     if (languageList.indexOf(getLanguage) >= 0) {
      //       Vue.config.lang = getLanguage;
      //     } else {
      //       Vue.config.lang = 'zh_tw';
      //     }
      //   } else {
      //     // 获取不到浏览器语言，给予默认值
      //     Vue.config.lang = 'zh_tw';
      //   }
      // }
      this.updateLocales(this.lang);
    },
  };
</script>
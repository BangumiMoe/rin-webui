<style lang="less" src="./less/framework.less"></style>
<style lang="less" src="./less/colors.less"></style>
<style lang="less" src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>
    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>

    <!--<rin-modal></rin-modal>
    <rin-user></rin-user>
    <modal-signin></modal-signin>-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import { user } from './modules/user';

  export default {
    name: 'RinWebApp',
    // data() {
    //   return {
    //     displaySigninForm: false,
    //   };
    // },
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
      // 'rin-modal': require('./components/rin-modal'),
      // 'rin-user': require('./components/rin-user'),
      // 'modal-signin': require('./components/modal-signin'),
    },
    methods: {
      updateLocales(lng) {
        try {
          localStorage.setItem('rin-locale', lng);
          Vue.config.lang = lng;
          // site title update
          document.title = this.$t('番組、萌え');
        } catch (err) {
          console.log(`[main.updateLocales]fail with error ${err}`);
        }
      },
    },
    // events: {
    //   'open-modal' (opt) {
    //     this.$emit('open-modal', opt);
    //   },
    //   'open-modal-blur' () {
    //     this.$emit('open-modal-blur');
    //   },
    //   'close-modal-blur' () {
    //     this.$emit('close-modal-blur');
    //     if (this.displaySigninForm) {
    //       this.displaySigninForm = false;
    //     }
    //   },

    //   // display sign in form modal
    //   displaySigninForm() {
    //     if (this.displaySigninForm) {
    //       return;
    //     }
    //     this.displaySigninForm = true;
    //     this.$dispatch('open-modal', {
    //       modalId: 'modal-signin',
    //     });
    //   },

    //   UserSignIn(form) {
    //     this.$emit('rinUserSignIn', form);
    //   },
    //   UserSignInOK(user) {
    //     this.$emit('UserSignInOK', user);
    //     if (this.displaySigninForm) {
    //       this.displaySigninForm = false;
    //       this.$emit('close-modal');
    //     }
    //   },
    //   UserSignInFailed(...args) {
    //     this.$emit('UserSignInFailed', ...args);
    //   },
    //   UserSignOut() {
    //     this.$emit('rinUserSignOut');
    //     this.$emit('UserSignOutOK');
    //   },
    // },
    mounted() {
      user.check();
      document.title = this.$t('番組、萌え');
    },
    created() {
      let lang = localStorage.getItem('rin-locale');
      if (lang === null) {
        const languageList = ['zh_tw', 'zh_cn', 'en'];
        // 获取浏览器语言
        let getLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
        if (getLanguage) {
          getLanguage = getLanguage.replace(/^en(-.+)/, 'en').replace('-', '_');
          if (languageList.indexOf(getLanguage) >= 0) {
            lang = getLanguage;
          } else {
            lang = 'zh_tw';
          }
        } else {
          // 获取不到浏览器语言，给予默认值
          lang = 'zh_tw';
        }
      }

      console.log(`[main.created]locale use ${lang}`);
      this.updateLocales(lang);
      this.$root.$on('LanguageSelected', this.updateLocales);
    },
  };

</script>
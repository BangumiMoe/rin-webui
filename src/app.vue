<style src="./less/colors.less"></style>
<style src="./less/framework.less"></style>
<style src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>

    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>
    <rin-modal></rin-modal>
    <rin-user></rin-user>
    <!-- <modal-demo></modal-demo> -->
    <modal-signin></modal-signin>
    <modal-lang></modal-lang>
  </div>
</template>

<script>
  import Vue from 'vue';

  Vue.filter('locale', function(value) {
    // method 1
    if(value.locale) {
      let text = value.locale[this.$root.lang];
      if(!text) text = value.locale[this.$root.lang_default];
      if(!text) text = value;
      return text

    } if ((typeof value) == 'string') {
      console.log('found value is string', value);
      let locale = this.$root.locales[this.$root.lang];
      if(locale) {
        let text = locale[value];
        if(!text) text = value;
        return text;
      }
    }

    return value;
  });

  export default {
    data () {
      return {
        displaySigninForm: false,
        locales: {}, lang: 'en', lang_default: 'en' }
    },
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
      'rin-modal': require('./components/rin-modal'),
      'rin-user': require('./components/rin-user'),
      // 'modal-demo':require('./components/modal-demo'),
      'modal-signin':require('./components/modal-signin'),
      'modal-lang':require('./components/modal-lang'),
    },
    methods: {
      updateLocales (lng) {
        let self = this;
        self.$http.get('https://bangumi.moe/i18n/'+ lng +'.json', {}, function(data) {
          self.locales[lng] = data;
          self.lang = lng;

          // site title update
          document.title = self.locales[lng]['番組、萌え'];
          Cookies.set('locale', lng);

          self.$broadcast('LangChanged', lng);
        }, function() {
          self.$broadcast('LangChangedFail', lng);
        });
      }
    },
    events:{
      "open-modal":function(opt){
        this.$broadcast("open-modal",opt);
      },
      "open-modal-blur":function(){
        this.$broadcast("open-modal-blur");
      },
      "close-modal-blur":function(){
        this.$broadcast("close-modal-blur");
        if(this.displaySigninForm) {
          this.displaySigninForm = false;
        }
      },

      // display sign in form modal
      'displaySigninForm' () {
        if(this.displaySigninForm) { return; }
        this.displaySigninForm = true;
        this.$dispatch("open-modal", {modalId: 'modal-signin' });
      },

      'UserSignIn' (form) {
        this.$broadcast('rinUserSignIn', form);
      },
      'UserSignInOK' (user) {
        this.$broadcast('UserSignInOK', user);
        if(this.displaySigninForm) {
          this.displaySigninForm = false;
          this.$broadcast("close-modal");
        }
      },
      'UserSignInFailed' () {
        this.$broadcast('UserSignInFailed');
      },
      'UserSignOut' () {
        this.$broadcast('rinUserSignOut');
        this.$broadcast('UserSignOutOK');
      },

      'changeLang' (lng) {
        // TODO busy?
        updateLocales(lng);
      },
    },
    ready () {
      this.lang = Cookies.get('locale');
      if(!this.lang) { this.lang = 'zh_tw'; }
      this.updateLocales(this.lang);
      // DEBUG
      // this.$dispatch("open-modal", {modalId: 'modal-lang' });
    }
  };
</script>

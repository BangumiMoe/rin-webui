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
    <modal-demo></modal-demo>
    <modal-signin></modal-signin>
  </div>
</template>

<script>
  export default {
    data: { 
      displaySigninForm: false
    },
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
      'rin-modal': require('./components/rin-modal'),
      'rin-user': require('./components/rin-user'),
      'modal-demo':require('./components/modal-demo'),
      'modal-signin':require('./components/modal-signin')
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
      'UserSignInOk' (user) {
        this.$broadcast('UserSignInOk', user);
      },
      'UserSignInFailed' () {
        this.$broadcast('UserSignInFailed');
      }
    }
  };
</script>

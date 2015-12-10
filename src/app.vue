<style src="./less/colors.less"></style>
<style src="./less/framework.less"></style>
<style src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>

    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>
    <rin-modal></rin-modal>
    <modal-demo></modal-demo>
  </div>
</template>

<script>
  export default {
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
      'rin-modal':require('./components/rin-modal'),
      'modal-demo':require('./components/modal-demo')
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
      }
    }
  };
</script>

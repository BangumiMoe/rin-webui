<style src="./less/colors.less"></style>
<style src="./less/framework.less"></style>
<style src="./less/app.less"></style>

<template>
  <div id="app" class="rin-row">
    <router-view></router-view>
    <nav-toolbar></nav-toolbar>
    <nav-logo></nav-logo>
  </div>
</template>

<script>
  export default {
    components: {
      'nav-toolbar': require('./components/nav-toolbar'),
      'nav-logo': require('./components/nav-logo'),
    }
  };
</script>

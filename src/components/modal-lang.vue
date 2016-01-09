
<template>
<rin-modal modal-id="modal-lang">
  <h1>{{'Choose language'|locale}}</h1>
  <div>
      <button class="rin-button" @click="changeLang('zh_cn')">简体中文(Chinese)</button>
      <button class="rin-button" @click="changeLang('zh_tw')">繁体中文(Taiwan)</button>
      <button class="rin-button" @click="changeLang('en')">English</button>
      <!-- <button class="rin-button" @click="changeLang('jpn')">日本語(Japanese)</button> -->
  </div>

</rin-modal>
</template>

<script>
  export default {
    components:{
      'rin-modal': require('./rin-modal'),
    },
    methods:{
      'changeLang' (lng) { this.$dispatch('changeLang', lng); }
    },
  };
</script>

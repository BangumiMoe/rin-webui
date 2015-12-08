<style lang="less">
  @keyframes waves-l2r {
      0% { background-position:    0   0 }
      5% { background-position:   64px 0 }
     45% { background-position:  960px 0 }
     50% { background-position: 1024px 0 }
     55% { background-position:  960px 0 }
     95% { background-position:   64px 0 }
    100% { background-position:    0   0 }
  }
  
  .rin-loader {
    display: block;
    height: 100%;
    background: white;
    opacity: 0.88;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 128px;
    z-index: 10;
    
    .rin-wrapper {
      position: relative;
      top: 50%;
      overflow: hidden;
      width: 512px;
      margin: -64px auto 0 auto;

      .rin-moe {
        position: relative;
        z-index: 10;
        
        img {
          display: block;
          width: 100%;
        }
      }   
      
      .rin-water-1, .rin-water-2 {
        position: absolute;
        bottom: 0;
        
        height: 50px;
        width: 1024px;
        background: url("../assets/rin-loader-water.png") repeat-x bottom;
        
        left: 0;
        animation: waves-l2r 9.6s linear infinite;
        z-index: 0.8;
      }
      
      .rin-water-2 {
        height: 64px;
        width: 2048px;
        animation: waves-l2r 6.4s linear infinite;
        z-index: 2;
        opacity: 0.8;
      }
    }
    
  }

</style>

<template>
<div class="rin-loader">
  <div class="rin-wrapper">
    <div class="rin-moe"><img src="../assets/rin-loader-moe.png" /></div>
    <div class="rin-water-1"></div>
    <div class="rin-water-2"></div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        progress: 0.0
      };
    },
    methods: {
      start: function() {
        
      }
    } 
  };
</script>

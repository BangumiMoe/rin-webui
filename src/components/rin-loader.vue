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
    background: white;
    opacity: 0.8;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;

    .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25%;
      min-width: 128px;
      transform: translateX(-50%) translateY(-50%);
      overflow: hidden;

      .rin-moe {
        position: relative;
        z-index: 10;

        img {
          display: inline;
          width: 100%;
        }
      }

      .rin-water-1, .rin-water-2, .rin-water-3 {
        position: absolute;
        bottom: 0;

        height: 40%;
        width: 99%;
        background-repeat: repeat-x;
        background-position: bottom;

        left: 0;
        animation: waves-l2r 19.2s linear infinite;
        z-index: 1;
      }

      /* fix unkown broder in bottom */
      .rin-water-1 {
        border-bottom: 1px solid white;
      }

      .rin-water-2 {
        height: 60%;
        width: 99%;
        animation: waves-l2r 12.8s linear infinite;
        z-index: 2;
        opacity: 0.8;
      }

      .rin-water-3 {
        height: 0;
        width: 99%;
        animation: waves-l2r 9.6s linear infinite;
        z-index: 3;
        opacity: 0.9;
      }
    }

  }

</style>

<style media="screen" scoped>
  .rin-water-1, .rin-water-2, .rin-water-3 {
    background-image: url("../assets/rin-loader-water.png");
  }
</style>

<template>
<div class="rin-loader">
  <div class="wrapper">
    <div class="rin-moe"><img src="../assets/rin-loader-moe.png" /></div>
    <div class="rin-water-1"></div>
    <div class="rin-water-2"></div>
    <div class="rin-water-3" :style="{height: progress + '%'}"></div>
  </div>
</div>
</template>

<script>
  export default {
    progs: ['progress']
  };
</script>

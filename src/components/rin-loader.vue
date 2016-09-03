<style lang="less">
  @keyframes waves-l2r {
    0% {
      background-position: 0 0
    }
    5% {
      background-position: 64px 0
    }
    45% {
      background-position: 960px 0
    }
    50% {
      background-position: 1024px 0
    }
    55% {
      background-position: 960px 0
    }
    95% {
      background-position: 64px 0
    }
    100% {
      background-position: 0 0
    }
  }
  
  @keyframes waves-up-1 {
    0% {
      height: 5%;
    }
    100% {
      height: 50%;
    }
  }
  
  @keyframes waves-up-2 {
    0% {
      height: 10%;
    }
    100% {
      height: 75%;
    }
  }
  
  @keyframes waves-up-3 {
    0% {
      height: 15%;
    }
    100% {
      height: 96%;
    }
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
      max-width: 350px;
      transform: translateX(-50%) translateY(-50%);
      overflow: hidden;
      .rin-moe {
        position: relative;
        z-index: 10;
        overflow: hidden;
        img {
          max-width: 350px;
          display: inline;
          overflow: hidden;
        }
      }
      .rin-water-1,
      .rin-water-2,
      .rin-water-3 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        background-repeat: repeat-x;
        background-position: bottom;
      }
      /* fix unkown broder in bottom */
      .rin-water-1 {
        height: 15%;
        border-bottom: 1px solid white;
        transition: height 1400ms ease-in-out;
        animation: waves-l2r 19.2s linear infinite;
      }
      .rin-water-2 {
        height: 10%;
        z-index: 2;
        opacity: 0.4;
        animation: waves-l2r 12.8s linear infinite;
        transition: height 1200ms ease-in-out;
      }
      .rin-water-3 {
        height: 5%;
        z-index: 3;
        opacity: 0.7;
        transition: height 800ms ease-in-out;
        animation: waves-l2r 9.6s linear infinite;
      }
    }
  }
</style>

<style lang="css" scoped>
  .rin-water-1,
  .rin-water-2,
  .rin-water-3 {
    background-image: url("../assets/rin-loader-water.png");
  }
</style>

<template>
<div class="rin-loader">
  <div class="wrapper">
    <div class="rin-moe"><img src="../assets/rin-loader-moe.png" /></div>
    <div class="rin-water-1" :style="{height: `${progress - 50}%`}"></div>
    <div class="rin-water-2" :style="{height: `${progress - 25}%`}"></div>
    <div class="rin-water-3" :style="{height: `${progress}%`}"></div>
  </div>
</div>
</template>

<script>
  export default {
    props: [
      'progress',
    ],
  };
</script>
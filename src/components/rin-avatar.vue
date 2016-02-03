<style scoped>
  /*copied from https://github.com/tengattack/tri-circles-effect/*/
  @keyframes circle1 {
    0% { transform: translate(-3.755%, -10.991%); }
    1.587% { transform: translate(-4.941%, -10.795%); }
    3.175% { transform: translate(-5.177%, -8.852%); }
    4.762% { transform: translate(-4.131%, -5.675%); }
    6.349% { transform: translate(-1.782%, -1.995%); }
    7.937% { transform: translate(1.543%, 1.413%); }
    9.524% { transform: translate(5.230%, 3.907%); }
    11.111% { transform: translate(8.512%, 5.121%); }
    12.698% { transform: translate(10.642%, 5.031%); }
    14.286% { transform: translate(11.071%, 3.936%); }
    15.873% { transform: translate(9.587%, 2.362%); }
    17.460% { transform: translate(6.374%, 0.909%); }
    19.048% { transform: translate(1.986%, 0.083%); }
    20.635% { transform: translate(-2.773%, 0.162%); }
    22.222% { transform: translate(-7.016%, 1.121%); }
    23.810% { transform: translate(-9.968%, 2.635%); }
    25.397% { transform: translate(-11.132%, 4.170%); }
    26.984% { transform: translate(-10.392%, 5.128%); }
    28.571% { transform: translate(-8.022%, 5.012%); }
    30.159% { transform: translate(-4.617%, 3.571%); }
    31.746% { transform: translate(-0.939%, 0.889%); }
    33.333% { transform: translate(2.258%, -2.615%); }
    34.921% { transform: translate(4.402%, -6.266%); }
    36.508% { transform: translate(5.222%, -9.283%); }
    38.095% { transform: translate(4.795%, -10.960%); }
    39.683% { transform: translate(3.499%, -10.835%); }
    41.270% { transform: translate(1.900%, -8.809%); }
    42.857% { transform: translate(0.585%, -5.182%); }
    44.444% { transform: translate(0.007%, -0.594%); }
    46.032% { transform: translate(0.360%, 4.104%); }
    47.619% { transform: translate(1.526%, 8.040%); }
    49.206% { transform: translate(3.108%, 10.505%); }
    50.794% { transform: translate(4.535%, 11.107%); }
    52.381% { transform: translate(5.222%, 9.847%); }
    53.968% { transform: translate(4.731%, 7.103%); }
    55.556% { transform: translate(2.904%, 3.535%); }
    57.143% { transform: translate(-0.075%, -0.075%); }
    58.730% { transform: translate(-3.700%, -3.012%); }
    60.317% { transform: translate(-7.247%, -4.781%); }
    61.905% { transform: translate(-9.938%, -5.214%); }
    63.492% { transform: translate(-11.122%, -4.483%); }
    65.079% { transform: translate(-10.434%, -3.036%); }
    66.667% { transform: translate(-7.893%, -1.462%); }
    68.254% { transform: translate(-3.906%, -0.326%); }
    69.841% { transform: translate(0.000%, 0.000%); }
    71.429% { transform: translate(4.650%, -0.467%); }
    73.016% { transform: translate(8.437%, -1.710%); }
    74.603% { transform: translate(10.685%, -3.305%); }
    76.190% { transform: translate(11.048%, -4.671%); }
    77.778% { transform: translate(9.576%, -5.231%); }
    79.365% { transform: translate(6.690%, -4.577%); }
    80.952% { transform: translate(3.075%, -2.590%); }
    82.540% { transform: translate(-0.488%, 0.503%); }
    84.127% { transform: translate(-3.301%, 4.160%); }
    85.714% { transform: translate(-4.907%, 7.642%); }
    87.302% { transform: translate(-5.180%, 10.177%); }
    88.889% { transform: translate(-4.332%, 11.142%); }
    90.476% { transform: translate(-2.836%, 10.215%); }
    92.063% { transform: translate(-1.288%, 7.465%); }
    93.651% { transform: translate(-0.237%, 3.345%); }
    95.238% { transform: translate(-0.041%, -1.398%); }
    96.825% { transform: translate(-0.764%, -5.880%); }
    98.413% { transform: translate(-2.164%, -9.275%); }
    100% { transform: translate(-3.755%, -10.991%); }
  }

  @keyframes circle2 {
    0% { transform: translate(-10.392%, 5.128%); }
    1.587% { transform: translate(-8.022%, 5.012%); }
    3.175% { transform: translate(-4.617%, 3.571%); }
    4.762% { transform: translate(-0.939%, 0.889%); }
    6.349% { transform: translate(2.258%, -2.615%); }
    7.937% { transform: translate(4.402%, -6.266%); }
    9.524% { transform: translate(5.222%, -9.283%); }
    11.111% { transform: translate(4.795%, -10.960%); }
    12.698% { transform: translate(3.499%, -10.835%); }
    14.286% { transform: translate(1.900%, -8.809%); }
    15.873% { transform: translate(0.585%, -5.182%); }
    17.460% { transform: translate(0.007%, -0.594%); }
    19.048% { transform: translate(0.360%, 4.104%); }
    20.635% { transform: translate(1.526%, 8.040%); }
    22.222% { transform: translate(3.108%, 10.505%); }
    23.810% { transform: translate(4.535%, 11.107%); }
    25.397% { transform: translate(5.222%, 9.847%); }
    26.984% { transform: translate(4.731%, 7.103%); }
    28.571% { transform: translate(2.904%, 3.535%); }
    30.159% { transform: translate(-0.075%, -0.075%); }
    31.746% { transform: translate(-3.700%, -3.012%); }
    33.333% { transform: translate(-7.247%, -4.781%); }
    34.921% { transform: translate(-9.938%, -5.214%); }
    36.508% { transform: translate(-11.122%, -4.483%); }
    38.095% { transform: translate(-10.434%, -3.036%); }
    39.683% { transform: translate(-7.893%, -1.462%); }
    41.270% { transform: translate(-3.906%, -0.326%); }
    42.857% { transform: translate(0.000%, 0.000%); }
    44.444% { transform: translate(4.650%, -0.467%); }
    46.032% { transform: translate(8.437%, -1.710%); }
    47.619% { transform: translate(10.685%, -3.305%); }
    49.206% { transform: translate(11.048%, -4.671%); }
    50.794% { transform: translate(9.576%, -5.231%); }
    52.381% { transform: translate(6.690%, -4.577%); }
    53.968% { transform: translate(3.075%, -2.590%); }
    55.556% { transform: translate(-0.488%, 0.503%); }
    57.143% { transform: translate(-3.301%, 4.160%); }
    58.730% { transform: translate(-4.907%, 7.642%); }
    60.317% { transform: translate(-5.180%, 10.177%); }
    61.905% { transform: translate(-4.332%, 11.142%); }
    63.492% { transform: translate(-2.836%, 10.215%); }
    65.079% { transform: translate(-1.288%, 7.465%); }
    66.667% { transform: translate(-0.237%, 3.345%); }
    68.254% { transform: translate(-0.041%, -1.398%); }
    69.841% { transform: translate(-0.764%, -5.880%); }
    71.429% { transform: translate(-2.164%, -9.275%); }
    73.016% { transform: translate(-3.755%, -10.991%); }
    74.603% { transform: translate(-4.941%, -10.795%); }
    76.190% { transform: translate(-5.177%, -8.852%); }
    77.778% { transform: translate(-4.131%, -5.675%); }
    79.365% { transform: translate(-1.782%, -1.995%); }
    80.952% { transform: translate(1.543%, 1.413%); }
    82.540% { transform: translate(5.230%, 3.907%); }
    84.127% { transform: translate(8.512%, 5.121%); }
    85.714% { transform: translate(10.642%, 5.031%); }
    87.302% { transform: translate(11.071%, 3.936%); }
    88.889% { transform: translate(9.587%, 2.362%); }
    90.476% { transform: translate(6.374%, 0.909%); }
    92.063% { transform: translate(1.986%, 0.083%); }
    93.651% { transform: translate(-2.773%, 0.162%); }
    95.238% { transform: translate(-7.016%, 1.121%); }
    96.825% { transform: translate(-9.968%, 2.635%); }
    98.413% { transform: translate(-11.132%, 4.170%); }
    100% { transform: translate(-10.392%, 5.128%); }
  }

  @keyframes circle3 {
    0% { transform: translate(10.642%, 5.031%); }
    1.587% { transform: translate(11.071%, 3.936%); }
    3.175% { transform: translate(9.587%, 2.362%); }
    4.762% { transform: translate(6.374%, 0.909%); }
    6.349% { transform: translate(1.986%, 0.083%); }
    7.937% { transform: translate(-2.773%, 0.162%); }
    9.524% { transform: translate(-7.016%, 1.121%); }
    11.111% { transform: translate(-9.968%, 2.635%); }
    12.698% { transform: translate(-11.132%, 4.170%); }
    14.286% { transform: translate(-10.392%, 5.128%); }
    15.873% { transform: translate(-8.022%, 5.012%); }
    17.460% { transform: translate(-4.617%, 3.571%); }
    19.048% { transform: translate(-0.939%, 0.889%); }
    20.635% { transform: translate(2.258%, -2.615%); }
    22.222% { transform: translate(4.402%, -6.266%); }
    23.810% { transform: translate(5.222%, -9.283%); }
    25.397% { transform: translate(4.795%, -10.960%); }
    26.984% { transform: translate(3.499%, -10.835%); }
    28.571% { transform: translate(1.900%, -8.809%); }
    30.159% { transform: translate(0.585%, -5.182%); }
    31.746% { transform: translate(0.007%, -0.594%); }
    33.333% { transform: translate(0.360%, 4.104%); }
    34.921% { transform: translate(1.526%, 8.040%); }
    36.508% { transform: translate(3.108%, 10.505%); }
    38.095% { transform: translate(4.535%, 11.107%); }
    39.683% { transform: translate(5.222%, 9.847%); }
    41.270% { transform: translate(4.731%, 7.103%); }
    42.857% { transform: translate(2.904%, 3.535%); }
    44.444% { transform: translate(-0.075%, -0.075%); }
    46.032% { transform: translate(-3.700%, -3.012%); }
    47.619% { transform: translate(-7.247%, -4.781%); }
    49.206% { transform: translate(-9.938%, -5.214%); }
    50.794% { transform: translate(-11.122%, -4.483%); }
    52.381% { transform: translate(-10.434%, -3.036%); }
    53.968% { transform: translate(-7.893%, -1.462%); }
    55.556% { transform: translate(-3.906%, -0.326%); }
    57.143% { transform: translate(0.000%, 0.000%); }
    58.730% { transform: translate(4.650%, -0.467%); }
    60.317% { transform: translate(8.437%, -1.710%); }
    61.905% { transform: translate(10.685%, -3.305%); }
    63.492% { transform: translate(11.048%, -4.671%); }
    65.079% { transform: translate(9.576%, -5.231%); }
    66.667% { transform: translate(6.690%, -4.577%); }
    68.254% { transform: translate(3.075%, -2.590%); }
    69.841% { transform: translate(-0.488%, 0.503%); }
    71.429% { transform: translate(-3.301%, 4.160%); }
    73.016% { transform: translate(-4.907%, 7.642%); }
    74.603% { transform: translate(-5.180%, 10.177%); }
    76.190% { transform: translate(-4.332%, 11.142%); }
    77.778% { transform: translate(-2.836%, 10.215%); }
    79.365% { transform: translate(-1.288%, 7.465%); }
    80.952% { transform: translate(-0.237%, 3.345%); }
    82.540% { transform: translate(-0.041%, -1.398%); }
    84.127% { transform: translate(-0.764%, -5.880%); }
    85.714% { transform: translate(-2.164%, -9.275%); }
    87.302% { transform: translate(-3.755%, -10.991%); }
    88.889% { transform: translate(-4.941%, -10.795%); }
    90.476% { transform: translate(-5.177%, -8.852%); }
    92.063% { transform: translate(-4.131%, -5.675%); }
    93.651% { transform: translate(-1.782%, -1.995%); }
    95.238% { transform: translate(1.543%, 1.413%); }
    96.825% { transform: translate(5.230%, 3.907%); }
    98.413% { transform: translate(8.512%, 5.121%); }
    100% { transform: translate(10.642%, 5.031%); }
  }

  .container {
    width: 480px;
    margin: 20px auto;
  }

  .h-block {
    height: 200px;
  }

  .tri-circles-container {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .tri-circles-bg-circle, .tri-circles-content {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  .tri-circles-content {
    z-index: 20;
    background-color: black;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .tri-circles-bg-circle {
    position: absolute;
    z-index: -1;
    transition: all 0.2s;
    top: 0;
    left: 0;
    transition: all .3s 1s;
  }

  .tri-circles-bg-circle.top {
    transform: translate(-3.755%, -10.991%);
    background: linear-gradient(135deg, #FEDFE1 0%, red 100%);
    animation: circle1 6.3s infinite;
  }

  .tri-circles-bg-circle.left {
    transform: translate(-10.392%, 5.128%);
    background: linear-gradient(180deg, #86C166 0%, green 100%);
    animation: circle2 6.3s infinite;
  }

  .tri-circles-bg-circle.right {
    transform: translate(10.642%, 5.031%);
    background: linear-gradient(45deg, #FAD689 0%, yellow 100%);
    animation: circle3 6.3s infinite;
  }
  .stop .right, .stop .left, .stop .top{
    animation: none;
    transform: translate(0, 0);
  }
  .tri-circles-container::after{
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: white;
    transform-origin: center;
    content: "";
    border-radius: 50%;
    z-index: -1;
    transition: all .6s .6s;
  }
  .tri-circles-container.stop::after{
    transform: scale(1.07);
  }

</style>

<template>
  <div class="tri-circles-container"  v-bind:class="{'stop': finished}">
    <div class="tri-circles-bg" transition="rin-fade" v-show="!finished">
      <div class="tri-circles-bg-circle top"></div>
      <div class="tri-circles-bg-circle left"></div>
      <div class="tri-circles-bg-circle right"></div>
    </div>
    <div class="tri-circles-content" v-bind:style="{ backgroundImage: display }">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    hash: {
      type: String,
      required: true,
      twoWay: true,
    }
  },
  data(){
    return {
      loaded: false,
      // todo, check if is already loaded
      avatarUrl: "//bangumi.moe/avatar/",
      finished: false,
      display: null
    }
  },
  computed: {
    content(){
      return `${this.avatarUrl}${this.hash}?s=200`
    }
  },
  watch: {
    hash: function(n, o){
      if(n != o && n ){
        let img = new Image()
        this.loaded = false
        this.finished = false
        this.display = null
        img.src = this.content
        img.onload = function(){
          this.$set('loaded', true)
          this.$set('display', `url(${this.content})`)
          setTimeout(()=>{
            this.$set('finished', true)
            this.$dispatch("avatar.loaded")
            // 等两秒钟，放一会动画
          }, 2000)
        }.bind(this)
      }

    }
  }
}
</script>

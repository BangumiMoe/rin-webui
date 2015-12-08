<style lang="less">
  @import "../less/colors.less";
  #modal-wrapper{
    width: calc(~"100% - 128px");
    height:100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.72);
    top:0;
    left:0;
    #rin-modal{
      width: 100%;
      height:60%;
      left:0;
      background-color: @color-primary-1;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      .alert-line{
        position:absolute;
        width:100%;
        height:30px;
        background: linear-gradient(to 135deg, /* or 90deg */
          yellow 25%, black 0, black 50%,
          yellow 0, yellow 75%, black 0);
    background-size: 200px 200px;
      }
      .clearfix{
        overflow: auto;
        zoom: 1;
      }
      .modal-content{
        height: calc(~"100% - 100px");
        width:calc(~"70% - 100px");
        background-color: gray;
        padding:50px;
        float:left;
      }
      .alert-line-up{
        top:0;
      }
      .alert-line-down{
        bottom:0;
      }
      .alert-line-scroll{
        animation:line-scroll 2.5s linear infinite;
      }
      @keyframes line-scroll{
        from {background-position-y :0px;}
        to {background-position-y:200px;}
      }

    }
  }



</style>

<template>
  <div id="modal-wrapper">
    <div id="rin-modal" class="clearfix">
      <div class="alert-line alert-line-up alert-line-scroll"></div>
      <div class="modal-content">
          这里显示提示内容
      </div>
      <div class="alert-line alert-line-down alert-line-scroll"></div>
    </div>
  </div>

</template>

<script>
  export default {};
</script>

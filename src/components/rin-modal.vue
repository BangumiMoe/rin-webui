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
        width:calc(~"80% - 100px");
        background: white;
        padding:50px;
        float:left;
      }
      .modal-button{
        float: left;
        height: 100%;
        width:10%;
        border: none;
        outline:none;

      }
      .modal-button-ok:hover circle.animate{
        stroke-dashoffset: 0;
      }
      .modal-button-ok:hover circle.normal{
        opacity: 0;
      }
      .modal-button-ok{
        background-color: #55C14E;
        circle.animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 5s ;

        }
        circle.normal {
          transition: opacity 0.7s;
        }
      }
      .modal-button-cancel{
        background-color: #B9B9B9;
        path.animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 5s ;
        }
        path.normal {
          transition: opacity 0.7s;
        }
      }
      .modal-button-cancel:hover path.animate{
        stroke-dashoffset: 0;
      }
      .modal-button-cancel:hover path.normal{
        opacity: 0;
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
  <div id="modal-wrapper" v-if="modalCtrl.visible">
    <div id="rin-modal" class="clearfix">
      <div class="alert-line alert-line-up alert-line-scroll"></div>
      <div class="modal-content">
          这里显示提示内容
      </div>
      <button type="button" name="button" class="modal-button modal-button-ok">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 130" overflow="visible" enable-background="new 0 0 130 130" width="50px" height="50px">
       <circle class="normal" fill="none" stroke="#66ccff" stroke-width="12" stroke-miterlimit="12" cx="64.8" cy="64.8" r="59.8"></circle>
       <circle class="animate" fill="none" stroke="#66ccff" stroke-width="12" stroke-miterlimit="12" cx="64.8" cy="64.8" r="59.8"></circle>

   </svg>

      </button>
      <button type="button" name="button" class="modal-button modal-button-cancel" v-on:click="closeModal">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 130" overflow="visible" enable-background="new 0 0 130 130" width="50px" height="50px">
       <path class="normal" fill="none" stroke="#FF7F00" stroke-width="12" stroke-miterlimit="12" d="M0 0 L130 130 M130 0 L0 130"></path>
       <path class="animate" fill="none" stroke="#FF7F00" stroke-width="12" stroke-miterlimit="12" d="M0 0 L130 130 M130 0 L0 130"></path>

   </svg>
      </button>
      <div class="alert-line alert-line-down alert-line-scroll"></div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        modalCtrl: {
          visible: false
        }
      };
    },
    events:{
      "open-modal":function(){
        this.openModal();
      },
      "close-modal":function(){
        this.closeModal();
      }
    },
    methods:{
      "closeModal":function(){
        this.modalCtrl.visible=false;
      },
      "openModal":function(){
        this.modalCtrl.visible=true;
      }
    }
  };
</script>

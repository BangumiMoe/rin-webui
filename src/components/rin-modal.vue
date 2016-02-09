<style scoped lang="less">
  @import "../less/colors.less";
  .modal-wrapper{
    width:calc(~"100% - 128px");
    z-index: 99;
    height:100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.72);
    top:0;
    left:0;
    .rin-modal{
      overflow-y: hidden;
      width: 100%;
      height:60%;
      left:0;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      .alert-line{
        position:absolute;
        width:200%;
        height:30px;
      }
      .black-yellow-up{
        background: linear-gradient(135deg,yellow 25%, black 0, black 50%,yellow 0, yellow 75%, black 0);
        background-size: 200px 200px;
      }
      .black-yellow-down{
        background: linear-gradient(135deg,black 25%, yellow 0, yellow 50%,black 0, black 75%, yellow 0);
        background-size: 200px 200px;
      }
      .black-red-up{
        background: linear-gradient(135deg,red 25%, black 0, black 50%,red 0, red 75%, black 0);
        background-size: 200px 200px;
      }
      .black-red-down{
        background: linear-gradient(135deg,black 25%, red 0, red 50%,black 0, black 75%, red 0);
        background-size: 200px 200px;
      }
      .clearfix{
        overflow: auto;
        zoom: 1;
      }
      .modal-content{
        height: calc(~"100% - 100px");
        width:calc(~"80% - 100px");
        background: rgba(255,255,255,0.5);
        padding:50px;
        float:left;
        .modal-content-inner{
          color: white;
          font-size: 22px;
          padding-left: 10%;
          max-height: 100%;
          overflow-y: auto;
          p{
            line-height: 1.3;
          }

        }
      }
      .modal-button{
        float: left;
        height: 100%;
        width:10%;
        border: none;
        outline:none;

      }
      .only-button{
        width: 20%;
      }
      .modal-button-ok:hover circle.animate{
        transition: stroke-dashoffset 2s ease 0.3s;
        stroke-dashoffset: 0;
      }
      .modal-button-ok:hover circle.normal{
        transition: opacity 0.3s;
        opacity: 0;
      }
      .modal-button-ok{
        background-color: rgb(81, 175, 97);
        circle.animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
        circle.loading{
          transform-origin: 50% 50%;
          animation:loading 1s infinite linear;
        }

      }
      .modal-button-cancel{
        background-color: #737373;
        path.animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      }
      .modal-button-cancel:hover path.animate{
        stroke-dashoffset: 0;
      }
      .modal-button-cancel:hover path.animate.cross-1{
        transition: stroke-dashoffset 1s ease 0.5s;
      }
      .modal-button-cancel:hover path.animate.cross-2{
        transition: stroke-dashoffset 1s ease 0.3s;
      }
      .modal-button-cancel:hover path.normal{
        transition: opacity 0.3s;
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
        from {
          transform: translateX(-200px);
        }
        to {
          transform: translateX(0px);
        }
      }

    }
  }
.modal-animate-enter{
  animation: bg-fadein .5s;
  .modal-content-inner{
    overflow-y: hidden !important;
  }
}
.modal-animate-enter.rin-modal{
  opacity: 0;
  animation: modal-fadein .5s ease .5s;
}
.modal-animate-leave{
  animation: bg-fadeout .5s ease .5s;
  .modal-content-inner{
    overflow-y: hidden !important;
  }
}
.modal-animate-leave.rin-modal{
  animation: modal-fadeout .5s;
}
@keyframes loading{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes bg-fadein{
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes modal-fadein{
  0% {
    opacity: 1;
    height: 60px;
  }
  100% {
    height: 60%;
    opacity: 1;

  }
}
@keyframes bg-fadeout{
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes modal-fadeout{
  0% {
    opacity: 1;
    height: 60%;
  }
  100% {
    height: 60px;
    opacity: 1;

  }
}
</style>

<template>
  <div class="modal-wrapper" v-show="modalCtrl.visible" transition="modal-animate">
    <div  class="clearfix rin-modal" v-show="modalCtrl.visible" transition="modal-animate">
      <div class="alert-line alert-line-up alert-line-scroll" v-bind:class="[modalCtrl.danger ? 'black-red-up' : 'black-yellow-up' ]"></div>
      <div class="modal-content">
          <div class="modal-content-inner">
            <slot>
            <h1>{{modalContent.title}}</h1>
            <p>
              {{{modalContent.content}}}
            </p>
          </slot>
          </div>
      </div>
      <button type="button" name="button" class="modal-button modal-button-ok" v-bind:class="{'only-button':modalCtrl.noCancel}" v-on:click="doOK" vi-disabled="modalCtrl.loading">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 135 135" overflow="visible" enable-background="new 0 0 135 135" width="50px" height="50px">
       <circle v-bind:class="{'normal':!modalCtrl.loading}" fill="none" stroke-linecap="round" stroke="#66ccff" stroke-width="12" stroke-miterlimit="12" cx="64.8" cy="65" r="58"></circle>
       <circle class="animate" v-if="!modalCtrl.loading" fill="none" stroke-linecap="round"  stroke="#66ccff" stroke-width="12" stroke-miterlimit="12" cx="64.8" cy="65" r="58"></circle>
       <circle class="loading" transition="loading" v-if="modalCtrl.loading" fill="none" stroke-linecap="round" stroke="#51af61" stroke-width="15" stroke-miterlimit="15" cx="64.8" cy="65" r="58" stroke-dashoffset="900" stroke-dasharray="1000"></circle>
   </svg>

      </button>
      <button type="button" name="button" class="modal-button modal-button-cancel" v-on:click="closeModal" v-if="!modalCtrl.noCancel">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 130" overflow="visible" enable-background="new 0 0 130 130" width="40px" height="40px">
       <path class="normal" fill="none" stroke="#FF7F00" stroke-width="12" stroke-miterlimit="12" d="M0 0 L130 130 M130 0 L0 130"></path>
       <path class="animate cross-1" fill="none" stroke="#FF7F00" stroke-width="12" stroke-miterlimit="12" d="M0 0 L130 130 "></path>
       <path class="animate cross-2" fill="none" stroke="#FF7F00" stroke-width="12" stroke-miterlimit="12" d="M130 0 L0 130"></path>

   </svg>
      </button>
      <div class="alert-line alert-line-down alert-line-scroll " v-bind:class="[modalCtrl.danger ? 'black-red-down' : 'black-yellow-down' ]"></div>
    </div>
  </div>

</template>

<script>
  export default {
    props:['modal-id'],
    data () {
      return {
        modalCtrl: {
          visible: false,
          danger:false,
          noCancel:false,
          loading:false
        },
        modalContent:{
          title:"Hello Modal",
          content:"Hi~~"
        }
      };
    },
    events:{
      "open-modal":function(opt){
        console.log(this.modalId,opt.modalId);
        if (this.modalId==opt.modalId){

          this.openModal(opt);
          console.log("Ready2Show");
        }
      },
      "close-modal":function(){
        this.closeModal();
      },
      "modal-start-loading":function(){
        console.log("Ready2Loading");
        this.startLoading();
      },
      "modal-stop-loading":function(){
        console.log("Ready2StopLoading");
        this.stopLoading();
      }
    },
    methods:{
      "startLoading":function(){
        this.modalCtrl.loading=true;
      },
      "stopLoading":function(){
        this.modalCtrl.loading=false;
      },
      "closeModal":function(){
        let self=this;
        this.modalCtrl.visible=false;
        self.$dispatch("modal-closed");
        setTimeout(function() {
          self.$dispatch("close-modal-blur");
          self.modalCtrl.loading=false;
          self.modalCtrl.danger=false;
        }, 500);

        document.body.removeEventListener('keyup', this.keyListener);
      },
      "openModal":function(opt){
        if (opt){
          this.modalCtrl.danger=opt.danger;
          this.modalCtrl.noCancel=opt.noCancel;
          this.modalContent.title=opt.title;
          this.modalContent.content=opt.content;
        }
        this.$dispatch("open-modal-blur");
        this.modalCtrl.visible=true;

        document.body.addEventListener('keyup', this.keyListener = keyListener.bind(this));
      },
      "doOK":function(){
        var evt="modal-ok-click";
        if (this.modalCtrl.noCancel &&! this.modalCtrl.loading){
          this.closeModal();
        }
        if (this.modalCtrl.loading){
          evt="modal-ok-click-loading";
        }
        this.$dispatch(evt);
      }
    }
  };

  function keyListener(event) {
    switch(event.keyCode) {
      case 13://enter
        this.doOK();
      break;
      case 27://escape
        if(this.modalCtrl.noCancel) {
          break;
        }
        this.closeModal();
      break;
    }
  }
</script>

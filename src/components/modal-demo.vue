
<style lang="less">
  input{
    color:black;
  }
  button{
    background-color: gray;
  }
</style>


<template>
<rin-modal modal-id="modal-demo">
  <h1>
    Hello {{name}}.
  </h1>
  <input type="text" v-model="name" placeholder="name">
  <button type="button" name="button" v-on:click="ML">modal Loading</button>
  <button type="button" name="button" v-on:click="CM">close Modal</button>

</rin-modal>

</template>


<script>
  export default {
    components:{
      'rin-modal':require('./rin-modal')
    },
    data () {
      return{
        name:"World",
        loading:false
      }

    },
    methods:{
      "ML":function(){
        if (!this.loading){
          this.$emit("modal-start-loading");
          this.loading=true;
        }else{
          this.$emit("modal-stop-loading");
          this.loading=false;
        }

      },
      "CM":function(){
        this.$emit("close-modal");
      }
    },
    events:{
      "modal-ok-click":function(){
        // alert("modal-ok-click");
      },
      "modal-ok-click-loading":function(){
        // alert("modal-ok-click-loading");
      },
      "modal-closed":function(){
        // alert("modal-closed");
      }
    }
  };
</script>

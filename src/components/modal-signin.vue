
<style lang="less">
  input{
    color:black;
  }
  button{
    background-color: gray;
  }
</style>

<template>
<rin-modal modal-id="modal-signin">
  <h1>Welcome Signin Form</h1>
  <form>
    <div>
      <label for="signin_username">Username</label>
      <input id="signin_username" type="text" v-model="username" placeholder="Username">
    </div>
    
    <div>
      <label for="signin_password">Password</label>
      <input id="signin_password" type="password" v-model="password" placeholder="Password">
    </div>
  </form>

</rin-modal>
<rin-user></rin-user>
</template>

<script>
  import RUser from './rin-user'
  
  export default {
    components:{
      'rin-modal': require('./rin-modal'),
      'rin-user': RUser
    },
    data () {
      return { username: null, password: null };
    },
    methods:{
      'cancel' () { return 0; }
    },
    events:{
      'modal-ok-click' () {
        this.$dispatch('rinSingIn', {});
      },
      'modal-closed' () {}
    }
  };
</script>


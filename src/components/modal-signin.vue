
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
  <h1>Welcome Bangumi.moe</h1>
  <form>
    <div class="rin-message rin-error" v-if="message">{{ message }}</div>
  
    <div class="rin-input">
      <label for="signin_username">Username</label>
      <input id="signin_username" type="text" v-model="username" placeholder="nickname or email">
    </div>
    
    <div class="rin-input">
      <label for="signin_password">Password</label>
      <input id="signin_password" type="password" v-model="password" placeholder="please input your passsword">
    </div>
  </form>

</rin-modal>
</template>

<script>
  export default {
    components:{
      'rin-modal': require('./rin-modal'),
    },
    data () {
      return { username: null, password: null, message: null };
    },
    methods:{
      'cancel' () { return 0; }
    },
    events:{
      'modal-ok-click' () {
        this.$dispatch('UserSignIn', {
          username: this.username,
          password: this.password
        });
      },
      'modal-closed' () {},
      
      'UserSignInOk' (user) {
        if(user.username == this.username) {
          this.$broadcast('close-modal');
        }
      },
      'UserSignInFailed' (msg) {
        this.message = msg;
      }
    }
  };
</script>


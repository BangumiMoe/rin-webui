<style scoped lang="less">
  input {
    color: white;
  }
  
  button {
    background-color: gray;
  }
</style>

<template>
<rin-modal modal-id="modal-signin" v-on:keyup="onKeyup">
  <h1>{{$t("Welcome to Bangumi.moe")}}</h1>
  <form>
    <div class="rin-message rin-error" v-if="message">{{ $t(message)}}</div>

    <div class="rin-row">
      <div class="rin-col">
        <span class="rin-input">
          <label for="signin_username">{{$t("Username")}}</label>
          <input id="signin_username" type="text" v-model="username"
            :placeholder="$t('nickname or email')">
        </span>
      </div>

      <div class="rin-col" style="margin-left:0.3em;">
        <span class="rin-input">
          <label for="signin_password">{{$t("Password")}}</label>
          <input id="signin_password" type="password" v-model="password" 
            :placeholder="$t('please input your passsword')">
        </span>
      </div>
    </div>

    <div class="rin-checkbox">
      <input id="signin_cookie" type="checkbox" v-model="store_in_cookie">
      <label for="signin_cookie">{{$t("Save account info locally")}}</label>
    </div>

  </form>

</rin-modal>
</template>

<script>
  import RinModel from './rin-modal';
  export default {
    name: 'ModalSignIn',
    components: {
      'rin-modal': RinModel,
    },
    data() {
      return {
        username: null,
        password: null,
        message: null,
        loading: false,
        store_in_cookie: true,
      };
    },
    methods: {
      cancel() {
        return 0;
      },
      onKeyup() {
        this.message = '';
      },
    },
    events: {
      'modal-ok-click' () {
        if (this.loading) return;

        this.$emit('modal-start-loading');
        this.loading = true;
        this.$dispatch('UserSignIn', {
          username: this.username,
          password: this.password,
        });
      },
      'modal-closed' () {
        this.$emit('modal-stop-loading');
        this.loading = false;
      },

      UserSignInOk(user) {
        if (user.username === this.username) {
          this.$emit('close-modal');
        }

        this.loading = false;
        this.$emit('modal-stop-loading');
      },
      UserSignInFailed(msg) {
        this.$emit('modal-stop-loading');
        this.loading = false;
        this.message = msg;
      },
    },
  };
</script>
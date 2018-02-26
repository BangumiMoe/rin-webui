<template>
<div class="user-signin grid-x grid-padding-x">
    <div class="cell small-10 small-offset-1 large-4 large-offset-4 medium-6 meidum-offset-3">
        <form  v-on:submit.prevent="doSignIn">

            <label>
                User
                <input type="text" placeholder="User Name or Email" v-model="username">
            </label>

            <label>
                Password
                <input type="password" v-model="password">
            </label>

            <button class="button">Sign In</button>
        </form>
    </div>
</div>
</template>

<script>
import { user } from "@/modules/user";

export default {
  props: ["login_result"],
  name: "UserSignIn",
  data() {
    return {
      user,
      username: "",
      password: ""
    };
  },
  methods: {
    doSignIn() {
      const key = this.username;
      const pwd = this.password;

      user.name = key;
      user.doSignIn(pwd).then(result => {
        if (!result) {
          console.error(`${user} sign in failed`);
          return;
        }

        console.info(`${user} is sign in ok.`);
        this.$router.push({ name: "Index" });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";
</style>

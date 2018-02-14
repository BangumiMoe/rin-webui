import Vue from "vue";
import Router from "vue-router";

// DEMO
// import Hello from "@/components/HelloWorld";

import Index from "@/components/Index";
import MyTorrents from "@/components/MyTorrents";
import UserSignIn from "@/components/UserSignIn";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // DEMO
    // {
    //   path: "/",
    //   name: "Hello",
    //   component: Hello
    // }

    // Seed List Component
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/user/torrents",
      name: "MyTorrents",
      component: MyTorrents
    },
    {
      path: "/user/login",
      name: "UserSignIn",
      component: UserSignIn
    },
    {
      path: "/user/profile",
      name: "UserProfile",
      component: UserSignIn
    },
  ]
});

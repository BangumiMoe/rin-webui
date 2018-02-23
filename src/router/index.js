import Vue from "vue";
import Router from "vue-router";

import Index from "@/components/Index";
import Search from "@/components/Search";
import MyTorrents from "@/components/MyTorrents";
import UserSignIn from "@/components/UserSignIn";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/search/:query",
      name: "Search",
      component: Search
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
    }
  ]
});

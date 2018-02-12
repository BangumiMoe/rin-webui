import Vue from "vue";
import Router from "vue-router";

// DEMO
// import Hello from "@/components/HelloWorld";

import Index from "@/components/Index";
import UserSignIn from "@/components/UserSignIn";

Vue.use(Router);

export default new Router({
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
      path: "/user/login",
      name: "UserSignIn",
      component: UserSignIn
    }
  ]
});

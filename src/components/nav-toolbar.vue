<style lang="less">
  @import "../less/colors.less";

  #rin-toolbar {
    background-color: @color-secondary-1-4;
    color: @color-secondary-1-0;

    .rin-logo {
      cursor: pointer;
      display: inline-block;
      margin: 16px 4px;

      img {
        border-radius: 28px;
        border: 4px solid @color-secondary-1-1;
        width: 48px;
      }
    }

    .rin-search {
      cursor: pointer;
      position: absolute;
      right: 8px;
      bottom: 8px;

      i {
        font-size: 48px;
      }
    }
  }
</style>

<template>
<div id="rin-toolbar" class="rin-main-bar rin-col">

  <div class="rin-logo">
    <div class="img-wrap" @click="userSignAction($event)">
      <img src="../assets/user-demo.png" v-if="!user.username" />
      <img src="https://bangumi.moe/avatar/{{ user.emailHash }}" v-if="user.username" />
    </div>
    <info-box :user="user" arrow="right"></info-box>
  </div>

  <span class="rin-search" v-on:mouseenter="searchBarShow" v-on:mouseleave="searchBarHide" v-on:click="searchBarToggle">
    <i class="material-icons">&#xE8B6;</i>
  </span>

  <!-- Search Added By LancerComet at 23:07, 2015.12.08. -->
  <search-bar v-bind:class="{'show': searchBar.visible, 'fixed': searchBar.fixed, 'hide': !searchBar.visible && !searchBar.fixed}"></search-bar>

</div>
</template>

<script>
  import RUser from '../components/rin-user.vue'
  export default {
    data () {
      return {
        user: {},
        searchBar: {
          visible: false,
          fixed: false
        }
      };
    },
    methods: {
      // Definition: 搜索栏显示事件.
      searchBarShow: function (event) {
        this.searchBar.visible = true;
        this.$broadcast("recentProgramRequest");  // 广播至 search-bar.
      },

      // Definition: 搜索栏隐藏事件.
      searchBarHide: function (event) {
        this.searchBar.visible = false;
      },

      // Definition: 搜索图标点击 Toggle 事件.
      searchBarToggle: function (event) {
        this.searchBar.fixed = !this.searchBar.fixed;
      },
      
      userSignAction (ev) {
        if(!this.user._id) {
          this.$dispatch('displaySigninForm');
        } else {
          this.$dispatch('UserSignOut');
        }
      } 
    },
    components: {
      'search-bar': require('./nav-toolbar-search'),
      'info-box': require('./nav-toolbar-infobox')
    },
    events: {
      'UserSignInOK' (user) {
        this.user = user;
      },
      'UserSignInFailed' () {
        this.user = {};
      },
      'UserSignOutOK' () {
        this.user = {};
      }
    }
  };

</script>

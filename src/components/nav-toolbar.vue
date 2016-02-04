<style scoped lang="less">
  @import "../less/colors.less";

  #rin-toolbar {
    background-color: @color-primary-0;
    color: @color-primary-2;
    z-index:1;

    .rin-button {
      width: 40px;
      height: 40px;
      margin: 8px 8px;
      color: @color-primary-2;
      background: @color-primary-3;
      border: 4px solid @color-primary-2;

      i {
        font-size: 2em;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        color: @color-primary-1;
        background: @color-primary-4;
        border: 4px solid @color-primary-1;

        i {color: @color-primary-1;}
      }
    }

    .rin-logo {
      cursor: pointer;
      .img-wrap {
        width: 48px;
        height: 48px;
        margin-left: 4px;
        margin-right: 4px;

        img {
          border-radius: 50%;
          width: 48px;
        }
      }
    }

    .rin-search, .rin-week, .rin-torrents {
      text-shadow: 0 0 5px @color-primary-3;
      background-color: transparent !important;
      border-color: transparent !important;
      position: absolute;

      i { font-size: 32px; }
    }

    .rin-search { bottom: 0; }
    .rin-week { bottom: 48px; }
    .rin-torrents { bottom: 96px; }
  }
</style>

<template>
<div id="rin-toolbar" class="rin-main-bar rin-col">

  <div class="rin-logo">
    <div class="rin-button round img-wrap" @click="userSignAction($event)">
      <img src="../assets/akarin.jpg" v-if="!user._id" />
      <img :src="'https://bangumi.moe/avatar/'+ user.emailHash" v-if="user._id" />
    </div>

    <info-box :user="user" arrow="right"></info-box>
  </div>

  <div class="user-toolbar" v-if="user._id">
    <a class="rin-button round rin-tip left" data-tool="团队">
      <i class="material-icons">&#xE7FC;</i>
    </a>
    <a class="rin-button round rin-tip left" data-tool="发布">
      <i class="material-icons">&#xE89D;</i>
    </a>
    <a class="rin-button round rin-tip left" data-tool="自定义RSS">
      <i class="material-icons">&#xE03B;</i>
    </a>
    <a class="rin-button round rin-tip left" data-tool="退出" @click="userSignout">
      <i class="material-icons">&#xE0E4;</i>
    </a>
  </div>

  <a class="rin-button rin-torrents rin-tip left" data-tool="返回首页" v-link="'/'">
    <i class="material-icons">&#xE5C4;</i>
  </a>

  <a class="rin-button rin-week rin-tip left" data-tool="番组表" v-link="'/bangumi/list'">
    <i class="material-icons">&#xE8EF;</i>
  </a>

  <span class="rin-button rin-search rin-tip left" data-tool="搜索" id="rin-search"
    @mouseenter="searchBarShow"
    @mouseleave="searchBarHide"
    @click="searchBarToggle">
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
        },
        signin_form_opened: false,
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
          this.signin_form_opened = true;
          this.$dispatch('displaySigninForm');
        }else{
          this.$router.go("/user/" + this.user._id)
        }

        /* } else {
          this.$dispatch('UserSignOut');
        }*/
      },

      userSignout (ev) {
        if(this.user._id) {
          this.$dispatch('UserSignOut');
        }
      }
    },
    components: {
      'search-bar': require('./nav-toolbar-search'),
      'info-box': require('./nav-toolbar-infobox')
    },
    events: {
      UserSignInOK (user) {
        this.user = user;
        if(this.signin_form_opened) {
          this.signin_form_opened = false;
          this.$dispatch('hideSigninForm');
        }
      },
      UserSignInFailed () { this.user = {};   },
      UserSignOutOK ()    { this.user = {};   },
    },
    ready () {
      let self = this;

      /**** 点击其他地方时，关闭搜索 ****/
      let el = document.querySelectorAll(".rin-search-bar")[0];
      let openSearchBtn = document.getElementById("rin-search"); //打开搜索的按钮
      let openSearchIcon = openSearchBtn.children[0]; //按钮内的icon

      document.onclick = event => {
        //判断点击的目标是不是[搜索]
        if( !(el !== event.target && el.contains(event.target)) && event.target !== openSearchBtn && event.target !== openSearchIcon ) {
            self.searchBar.fixed = false;
        }

      };

    }
  };
</script>

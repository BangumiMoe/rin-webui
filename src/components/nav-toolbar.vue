<style scoped lang="less">
  @import "../less/colors.less";

  #rin-toolbar {
    background-color: @color-primary-0;
    color: @color-primary-2;
    z-index:1;

    .rin-button {
      margin: 8px;
      text-shadow: 0 0 5px @color-primary-3;
      z-index:2;
    }

    .user-toolbar, .rin-logo {
      .rin-button {
        text-shadow: none;
        background: @color-primary-3;
        border: 4px solid @color-primary-2;

        i {
          z-index: 2;
          width: 40px;
          border-radius: 20px;
          background: @color-primary-3;
          transition: all .2s;
        }

        &:hover {
          background: @color-primary-4;
          border: 4px solid @color-primary-1;

          i { background: @color-primary-4; }
        }

        .rin-tooltip-wrap {
          z-index: 1;
        }
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
          z-index: 2;
        }
      }
    }

    .rin-search, .rin-week, .rin-torrents {
      position: absolute;
      margin: 4px 12px;

      i { font-size: 32px; }
    }

    .rin-search { bottom: 8px; }
    .rin-week { bottom: 56px; }
    .rin-torrents { bottom: 104px; }
  }
</style>

<template>
<div id="rin-toolbar" class="rin-main-bar rin-col">

  <div class="rin-logo">
    <div class="rin-button round img-wrap" @click="userSignAction($event)">
      <img src="../assets/akarin.jpg" v-if="!user._id" />
      <img :src="'https://bangumi.moe/avatar/'+ user.emailHash" v-if="user._id" />
      <tooltip :info="'Login' | locale" v-if="!user._id"></tooltip>
    </div>

    <info-box :user="user" arrow="right" v-if="user._id"></info-box>
  </div>

  <div class="user-toolbar" v-if="user._id">
    <a class="rin-button round">
      <i class="material-icons">&#xE7FC;</i>
      <tooltip :info="'Team' | locale"></tooltip>
    </a>
    <a class="rin-button round">
      <i class="material-icons">&#xE89D;</i>
      <tooltip :info="'Publish' | locale"></tooltip>
    </a>
    <a class="rin-button round">
      <i class="material-icons">&#xE03B;</i>
      <tooltip :info="'Customize RSS' | locale"></tooltip>
    </a>
    <a class="rin-button round" @click="userSignout">
      <i class="material-icons">&#xE0E4;</i>
      <tooltip :info="'Logout' | locale"></tooltip>
    </a>
  </div>

  <a class="rin-button rin-torrents" v-show="!is_homepage" v-link="{ path: '/', exact: true }">
    <i class="material-icons">&#xE5C4;</i>
    <tooltip :info="'Back to Index' | locale"></tooltip>
  </a>

  <a class="rin-button rin-week" v-link="'/bangumi/list'">
    <i class="material-icons">&#xE8EF;</i>
    <tooltip :info="'Bangumi List' | locale"></tooltip>
  </a>

  <span class="rin-button rin-search" id="rin-search"
    @mouseenter="searchBarShow"
    @mouseleave="searchBarHide"
    @click="searchBarToggle">
    <i class="material-icons">&#xE8B6;</i>
    <tooltip :info="'Search' | locale"></tooltip>
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
        is_homepage: (location.pathname == "/"),
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

        /**** 点击其他地方时，关闭搜索 ****/
        if(this.searchBar.fixed){
          let el = document.querySelectorAll(".rin-search-bar")[0];
          let openSearchBtn = document.getElementById("rin-search"); //打开搜索的按钮
          let openSearchIcon = openSearchBtn.children[0]; //按钮内的icon
          let self = this;

          function search(event){
            //判断点击的目标是不是[搜索]
            if( !(el !== event.target && el.contains(event.target)) && event.target !== openSearchBtn && event.target !== openSearchIcon && event.target.className.indexOf("recommendTags") == -1) {
              self.searchBar.fixed = false;
              //移除监听事件
              document.removeEventListener("click",search,false)
            }
          }
          document.addEventListener("click",search,false);
        }


      },
      /* backHomepage () {
  			if (window.history.length>1){
  				window.history.back()
  			}else{
  				this.$route.router.go({name:"index"});
  			}
      },*/

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
      },

    },
    components: {
      'search-bar': require('./nav-toolbar-search'),
      'info-box': require('./nav-toolbar-infobox'),
      'tooltip': require('./nav-tooltip')
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
    watch: {
      '$route' ()  {
        this.is_homepage = (location.pathname == "/");
      }
    }
  };
</script>

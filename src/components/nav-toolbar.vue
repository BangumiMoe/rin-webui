<style scoped lang="less">
  @import "../less/colors.less";
  @team-avatar-size: 80px;
  #rin-toolbar {
    display: block;
    width: 64px;
    padding-top: 1rem;
    background-color: @color-primary-0;
    color: @color-primary-2;
    z-index: 1;
    .rin-button {
      height: 52px;
      width: 52px;
      margin: 6px;
      padding: 12px;
      font-size: 28px;
      line-height: 52px;
      color: @color-primary-1;
      &:hover {
        color: @color-primary-4;
      }
    }
    .rin-user-face {
      span {
        position: relation;
        display: inline-block;
        width: 52px;
        height: 52px;
        margin: -12px;
        border: 4px solid @color-primary-1;
        border-radius: 50%;
        background-image: url(../assets/akarin.jpg);
        background-size: cover;
      }
      &:hover {
        span {
          border-color: @color-primary-3;
        }
      }
    }
  }
</style>

<template>
  <div id="rin-toolbar" class="rin-col">

    <a class="rin-button rin-user-face" @click.stop="userSignAction($event)">
      <span>
      <img :src="user|icon_url" v-if="user._id" />
    </span>

      <tooltip :info="$t('Login')"></tooltip>
    </a>

    <!--
  <div class="user-toolbar" v-if="user._id">
    <a class="rin-button round" v-if="user.info && user.info.teams.length > 0">
      <span class="team">
        <span class="team-icon" :style="{'background-image': 'url(' + getIcon(user.info.teams[0]) +')'}"></span>
      </span>
      <tooltip>
        <div class="teams" :style="{width: (48 * (user.info.teams.length - 1) - 4) + 'px' }" slot="html" v-if="user.info">
            <span class="team" v-for="i in user.info.teams.slice(1)">
                <span class="team-icon" :style="{'background-image': 'url(' + getIcon(i) +')'}"></span>
            </span>
        </div>
      </tooltip>
    </a>
    <router-link class="rin-button round" to="/torrent/upload">
      <i class="fa fa-plus"></i>
      <tooltip :info="$t('Publish')"></tooltip>
    </router-link>
    <a class="rin-button round">
      <i class="fa fa-rss"></i>
      <tooltip :info="$t('Customize RSS')"></tooltip>
    </a>
    <a class="rin-button round" @click="userSignout">
      <i class="fa fa-sign-out"></i>
      <tooltip :info="$t('Logout')"></tooltip>
    </a>
  </div>-->

    <router-link class="rin-button rin-torrents" v-show="!is_homepage" :to="{ path: '/', exact: true }">
      <i class="fa fa-arrow-left"></i>
      <tooltip :info="$t('Back to Index')"></tooltip>
    </router-link>

    <router-link class="rin-button rin-week" to="/bangumi/list">
      <!--<i class="material-icons">&#xE8EF;</i>-->
      <i class="fa fa-list"></i>
      <tooltip :info="$t('Bangumi List')"></tooltip>
    </router-link>

    <a class="rin-button rin-rss" href="https://bangumi.moe/rss/latest" target="_blank">
      <!--<i class="material-icons" style="transform: rotate(45deg);padding-top: 1px;padding-left: 1px;">&#xE63E;</i>-->
      <i class="fa fa-rss"></i>
      <tooltip :info="$t('RSS')"></tooltip>
    </a>

    <a class="rin-button rin-search" id="rin-search" @mouseenter="searchBarShow" @mouseleave="searchBarHide" @click="searchBarToggle">
      <!--<i class="material-icons">&#xE8B6;</i>-->
      <i class="fa fa-search"></i>
      <tooltip :info="$t('Search')"></tooltip>
    </a>

    <!-- Search Added By LancerComet at 23:07, 2015.12.08. -->
    <!--<search-bar v-bind:class="{'show': searchBar.visible, 'fixed': searchBar.fixed, 'hide': !searchBar.visible && !searchBar.fixed}"></search-bar>-->

  </div>
</template>

<script>
  import NavToolbarSearch from './nav-toolbar-search';
  import NavToolbarInfobox from './nav-toolbar-infobox';
  import NavTooltip from './nav-tooltip';

  export default {
    name: 'NavToolbar',
    data() {
      return {
        user: {},
        searchBar: {
          visible: false,
          fixed: false,
        },
        signin_form_opened: false,
        is_homepage: (location.pathname === '/'),
      };
    },
    filter: {
      icon_url(user) {
        return `https://static.bangumi.moe/avatar/${user.emailHash}`;
      },
    },
    methods: {
      // Definition: 搜索栏显示事件.
      searchBarShow() {
        this.searchBar.visible = true;
        this.$emit('recentProgramRequest'); // 广播至 search-bar.
      },
      // Definition: 搜索栏隐藏事件.
      searchBarHide() {
        this.searchBar.visible = false;
      },
      // 判断el是否在selector内
      closest(el, selector) {
        let matchesFn;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some((fn) => {
          if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
          }
          return false;
        });

        // traverse parents
        let ele = el;
        while (ele !== null) {
          const parent = ele.parentElement;
          if (parent !== null && parent[matchesFn](selector)) {
            return parent;
          }
          ele = parent;
        }

        return null;
      },
      // Definition: 搜索图标点击 Toggle 事件.
      searchBarToggle() {
        this.searchBar.fixed = !this.searchBar.fixed;

        /* *** 点击其他地方时，关闭搜索 *** */
        if (this.searchBar.fixed) {
          const el = document.querySelectorAll('.rin-search-bar')[0];
          const openSearchBtn = document.getElementById('rin-search'); // 打开搜索的按钮
          const openSearchIcon = openSearchBtn.children[0]; // 按钮内的icon

          function search(ev) {
            if (el !== ev.target && !ev.target.closest('.rin-search-bar') && ev.target !== openSearchIcon) {
              this.searchBar.fixed = false;
              search.bind(this);
              document.removeEventListener('click', search, false);
            }
          }
          search.bind(this);
          document.addEventListener('click', search, false);
        }
      },

      // sigin or jump to user info page
      userSignAction() {
        if (!this.user._id) {
          this.signin_form_opened = true;
          // this.$dispatch('displaySigninForm');
        } else {
          this.$router.go(`/user/${this.user._id}`);
        }
      },

      userSignout() {
        if (this.user._id) {
          this.$dispatch('UserSignOut');
        }
      },


      getUserInfo() {
        // console.log(this.user)
        this.$http.get(`https://bangumi.moe/api/v2/user/${this.user._id}`).then((response) => {
          this.$set('user.info', response.data);
        });
      },

      getIcon(i) {
        return i.icon ? `https://bangumi-moe.phoenixstatic.com/${i.icon}` : require('../assets/akarin.jpg');
      },

    },
    components: {
      'search-bar': NavToolbarSearch,
      'info-box': NavToolbarInfobox,
      tooltip: NavTooltip,
    },
    events: {
      UserSignInOK(user) {
        this.user = user;
        this.getUserInfo();
        if (this.signin_form_opened) {
          this.signin_form_opened = false;
          // this.$dispatch('hideSigninForm');
        }
      },
      UserSignInFailed() {
        this.user = {};
      },
      UserSignOutOK() {
        this.user = {};
      },
    },
    watch: {
      '$route'() {
        this.is_homepage = (location.pathname === '/');
      },
    },
  };

</script>
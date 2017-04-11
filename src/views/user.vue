<style scoped lang="less">
@import "../less/colors.less";
.rin-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;

  /* user face size 128x128px */
  .user-face {
    display: inline-block;
    width: 6rem;
    height: 6rem;
    margin-top: 2rem;
    border: 0.3rem solid @color-primary-0;
    border-radius: 50%;
    overflow: hidden;
    background-size: contain;
  }

  .user-info {
    height: 10.6rem;
    background-color: @color-primary-2;

    /* TODO small display use it */
    .user-basic-info {
      height: 100%;
      padding: 1rem;
      background-color: @color-primary-0;

      .teams {
        .name {
          font-size: 12px;
          color: @color-primary-1;
          border-bottom: 1px solid @color-primary-1;
          margin-bottom: .3rem;
        }

        .rin-team {
          color: @color-primary-3;
          background-color: @color-primary-1;
          &:hover {
            color: @color-primary-1;
            background-color: @color-primary-3;
          }
        }
      }
      .tags {
        padding-top: 0;

        .name {
          font-size: 12px;
          color: @color-primary-1;
          border-bottom: 1px solid @color-primary-1;
          margin-bottom: .3rem;
        }
      }
    }
  }

  .user-torrents {
    height: ~"calc(100vh - 10.6rem)";
  }

  .rin-table {
    width: 100%;
    height: ~"calc(100vh - 10.6rem)";
  }
}
</style>

<template>
  <div class="rin-wrapper">
  
    <div class="user-info row expanded">
      <div class="columns medium-2 small-3" style="text-align:center">
        <span class="user-face" :style="{'background-image': `url(//bangumi.moe/avatar/${user.emailHash}?s=200)`}"></span>
        <div class="username">{{user.username}}</div>
      </div>
  
      <div class="user-basic-info medium-10 small-9 columns">
        <div>
          <!-- teams -->
          <div class="teams"
               v-if="loaded"
               transition="rin-fade">
            <div class="name">Teams</div>

            <router-link class="rin-team rin-inline-tag haspic"
                         v-for="team in user.teams"
                         :to="{name: 'team-profile', params: {id: team._id}}">
              <img v-if="team.icon"
                   :src="`//bangumi.moe/${team.icon}`" />
              <img src="../assets/akarin.jpg"
                   v-else />
              <span>{{team.tag|locale}}</span>
            </router-link>
          </div>
  
          <!-- auditing teams -->
          <!--<div class="teams"
               v-if="loaded"
               transition="rin-fade">
            <div class="name">Auditing Teams</div>

            <router-link class="rin-team rin-inline-tag haspic"
                         v-for="team in user.auditing_teams"
                         :to="{name: 'team-profile', params: {id: team._id}}">
              <img v-if="team.icon"
                   :src="`//bangumi.moe/${team.icon}`" />
              <img src="../assets/akarin.jpg"
                   v-else />
              <span>{{team.tag|locale}}</span>
            </router-link>
          </div>-->
  
          <!-- tags -->
          <!-- TODO tags search -->
          <div class="tags"
               v-if="loaded"
               transition="rin-fade">
            <div class="name">Tags</div>

            <div class="rin-tag">
              <router-link to="/tag/id"
                           class="haspic"
                           v-for="i in user.bangumi">
                <img class="icon"
                     :src="`//bangumi.moe/${i.icon}`"
                     v-if="i.icon" />
                <span v-text="getBangumiTagLocale(i)"></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="user-torrents">
      <rin-torrents-table :torrents="user.torrents.data"
                          :hide_uploader="true"
                          :need_more="fetch_next_torrents"></rin-torrents-table>
    </div>
  
    <!--<div class="rin-avatar">
        <div class="auditing_teams" transition="rin-fade" v-show="loaded">
        </div>
    
        <rin-avatar v-bind:hash="user.emailHash"></rin-avatar>
    
        <div class="teams" v-show="loaded" transition="rin-fade">
          <router-link :title="team.name"
            :to="{name: 'team-profile', params: {id: team._id}}"
            v-for="team in user.teams">
            <span class="team-icon" :style="{'background-image': 'url(' + getIcon(team) +')'}"></span>
          </router-link>
        </div>
      </div>
    
      <div class="background" v-if="loaded" transition='rin-fade'></div>
      <div class="content" v-if="loaded" transition="rin-fade">
        <h1 class="name">{{user.username}}</h1>
        
        <h2>{{$t("Last Teams")}}</h2>
        <div class="rin-tag">
          <router-link to="/tag/id" class="haspic" v-for="i in user.bangumi">
            <img v-bind:src="'//bangumi.moe/' + i.icon" v-if="i.icon" class="icon" alt="" />
            <span v-text="getBangumiTagLocale(i)"></span>
          </router-link>
        </div>
    
        <h2>{{$t("Last Torrents")}}</h2>
    
        <div class="table-wrapper">
          
        </div>
      </div>-->
  </div>
</template>

<script>
/* 只加载。不处理加载完成的事件 */
function cacheImage(link) {
  const tmp = new Image();
  tmp.src = link;
}

import Vue from 'vue';
import moment from 'moment';
import RinTorrentsTable from '../components/rin-torrents-table';
import RinAvatar from '../components/rin-avatar';

export default {
  name: 'User',
  components: {
    RinTorrentsTable,
    RinAvatar,
  },
  data() {
    return {
      busy: false,
      loaded: false,
      user: {
        id: '',
        _id: '',
        active: false,
        group: '',
        emailHash: '',
        auditing_teams: [],
        regDate: 0,
        team_ids: null,
        teams: [],
        username: 'loading',
        torrents: {
          data: [],
          page_num: 1,
          page_count: 0,
          page_limit: 30, // FIXME check server this params default value
        },
        bangumi: [],
      },
      resources: {
        user_info: this.$resource('//bangumi.moe/api/v2/user{/id}'),
        user_torrent: this.$resource('//bangumi.moe/api/v2/torrent/user{/id}'),
        user_bangumi: this.$resource('//bangumi.moe/api/v2/bangumi/user{/id}'),
      },
    };
  },
  filters: {
    locale(val) {
      return val.locale[Vue.config.lang];
    },
  },
  methods: {
    getBangumiTagLocale(bangumi) {
      return bangumi.tag.locale[this.$lang];
    },
    getIcon(i) {
      if (i.icon) {
        return `//bangumi.moe/${i.icon}`;
      }

      return require('../assets/akarin.jpg');
    },
    getUserInfo() {
      return this.resources.user_info.query({
        id: this.user.id,
      }).then((resp) => {
        resp.json().then(
          info => {
            this.user._id = info._id;
            this.user.active = info.active;
            this.user.group = info.group;
            this.user.emailHash = info.emailHash;
            this.user.auditing_teams.push(...info.auditing_teams);
            this.user.regDate = moment(info.regDate);
            this.user.team_ids = info.team_ids;
            this.user.teams.push(...info.teams);
            this.user.username = info.username;
            this.loaded = true;

            console.log(info);

            // console.log(`[User.getUserInfo]user ${this.user.username} info loaded`);
            // load other extra info
            this.getUserTorrent(this.user.torrents.page_num);
            this.getUserBangumi();
            // this.aggressiveCaching();
          }
        );
      });
    },
    getUserTorrent(page_num) {
      if (this.busy) {
        return;
      }
      this.busy = true;
      this.resources.user_torrent.query({
        id: this.user.id,
        p: page_num,
        limit: this.user.torrents.page_limit,
      }).then((resp) => {
        resp.json().then(
          data => {
            this.user.torrents.page_count = data.page_count;
            this.user.torrents.data.push(...data.torrents);
            this.busy = false;
            console.log(`[User.getuserTorrent]user ${this.user.username} torrent page ${page_num} loaded`);
          }
        );
      });
    },
    getUserBangumi() {
      this.user.bangumi.splice(0);
      return this.resources.user_bangumi.query({
        id: this.user.id,
      }).then(
        resp => {
          const data = resp.data;
          this.user.bangumi.push(...data);
          console.log(`[User.getUseBangumi]user ${this.user.username} bangumi loaded`);
        });
    },
    aggressiveCaching() {
      this.user.teams.forEach((t) => {
        if (t.icon) cacheImage(`//bangumi.moe/${t.icon}`);
      });
    },
    canModify(torrent) {
      const uid = this.user._id;
      if (uid === undefined) return false;

      if (torrent.uploader._id === uid) {
        return true;
      }

      for (const i of this.user.teams) {
        if (i._id === torrent.team._id) {
          for (const j of i.admin_ids) {
            if (uid === j) {
              return true;
            }
          }
          break;
        }
      }

      return false;
    },
    resetUserInfo() {
      this.user._id = '';
      this.user.active = false;
      this.user.group = '';
      this.user.emailHash = '';
      this.user.auditing_teams.splice();
      this.user.regDate = 0;
      this.user.team_ids = null;
      this.user.teams.splice();
      this.user.username = 'loading';
      this.user.torrents.page_num = 1;
      this.user.torrents.page_count = 0;
      this.user.torrents.data.splice();
      this.user.bangumi.splice();
    },
    fetch_next_torrents() {
      if (this.busy) {
        return;
      }

      if (this.user.torrents.page_num + 1 >= this.user.torrents.page_count) {
        return;
      }
      this.user.torrents.page_num += 1;
      this.getUserTorrent(this.user.torrents.page_num);
    },
  },
  mounted() {
    this.loaded = false;
    this.user.id = this.$route.params.id || 'session';

    // reset and load user info from remote server
    this.resetUserInfo();
    this.getUserInfo();
    console.log('[UserPage]loaded');
  },
};
</script>
<style scoped lang="less">
  @import "../less/colors.less";
  @color-inline-tag: #6d6d6d;
  @color-inline-tag-bg: #eeeeee;
  @user-avatar-size: 160px;
  @team-avatar-size: 80px;
  @team-avatar-border: 0.06 * @team-avatar-size;
  .rin-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
    div {}
    .rin-avatar {
      position: absolute;
      top: 40vh;
      margin-top: -80px;
      width: 100%;
      display: flex;
      z-index: 20;
    }
    .background {
      height: 40vh;
      width: 100%;
    }
    .content {
      padding: 80px 100px 0 100px;
      max-width: 960px;
      margin: auto;
      margin-bottom: 100px;
    }
    .name {
      text-align: center;
    }
    .teams {
      text-align: left;
      a {
        margin-left: 20px
      }
    }
    .auditing_teams {
      text-align: right;
      a {
        margin-right: 20px;
        text-align: center;
        .team-icon {
          color: white;
          font-size: @team-avatar-size * 0.7;
          line-height: @team-avatar-size;
          background-color: #ddd;
        }
      }
      &.rin-fade-transition {
        transition: transform .6s .6s, opacity .6s .6s;
        &.rin-fade-enter,
        &.rin-fade-leave {
          opacity: 0;
          .team-icon {
            transform: scale(.6);
          }
        }
      }
    }
    .teams,
    .auditing_teams {
      flex: 1;
      height: @team-avatar-border * 2 + @team-avatar-size;
      align-self: center;
      a {
        display: inline-block;
        .team-icon {
          transition: transform .6s .6s;
          height: @team-avatar-size;
          background-size: cover;
          background-repeat: no-repeat;
          width: @team-avatar-size;
          border-radius: 50%;
          border: solid @team-avatar-border white;
          display: inline-block;
        }
      }
    }
    .table-wrapper {
      height: 600px;
      display: block;
    }
  }
</style>

<template>
<div class="rin-wrapper">
  <div class="rin-avatar">
    <div class="auditing_teams" v-show="loaded" transition="rin-fade">
      <a title="{{i.name}}" class="team" v-link="'/team/'+i._id" v-for="i in user.auditing_teams">
        <span class="team-icon">
            {{i.name.slice(0, 1)}}
          </span>
      </a>
    </div>
    <rin-avatar v-bind:hash="user.emailHash"></rin-avatar>
    <div class="teams" v-show="loaded" transition="rin-fade">
      <a title="{{i.name}}" class="team" v-link="'/team/'+i._id" v-for="i in user.teams">
        <span class="team-icon" :style="{'background-image': 'url(' + getIcon(i) +')'}">
          </span>
      </a>
    </div>
  </div>

  <div class="background" v-show="loaded" transition='rin-fade'></div>
  <div class="content" v-show="loaded" transition="rin-fade">
    <h1 class="name">{{user.username}}</h1>
    
    <h2>{{"Last Teams" | locale}}</h2>
    <div class="rin-tag">
      <a class="haspic" v-link="'/tag/' + i.tag._id" v-for="i in bangumi">
        <img v-bind:src="'//bangumi.moe/' + i.icon" v-if="i.icon" class="icon" alt="" />
        <span>{{ i.tag | locale }}</span>
      </a>
    </div>

    <h2>{{"Last Torrents" | locale}}</h2>

    <div class="table-wrapper">
      <rin-torrents-table :torrents="torrents.data" :torrents_total="torrents.total" :hide_uploader="true"></rin-torrents-table>
    </div>
  </div>
</div>
</template>

<script>
  /* 只加载。不处理加载完成的事件 */
  function cacheImage(link) {
    const tmp = new Image();
    tmp.src = link;
  }

  import RinTorrentsTable from '../components/rin-torrents-table';
  import RinAvatar from '../components/rin-avatar';

  export default {
    name: 'User',
    data() {
      return {
        currentPage: 1,
        currentLimit: 25,
        user: {},
        busy: false,
        loaded: false,
        torrents: {
          data: [],
          offset: 0,
          limit: 100,
          total: 0,
        },
        bangumi: {},
        host: '//bangumi.moe/',
      };
    },
    components: {
      RinTorrentsTable,
      RinAvatar,
    },
    filters: {
      date: require('../filters/dateFormat.js'),
    },
    methods: {
      getIcon(i) {
        if (i.icon) {
          return `${this.host}${i.icon}`;
        }

        return require('../assets/akarin.jpg');
      },
      getUserInfo() {
        const user_id = this.$route.params.id || 'session';
        return this.$http.get(`${this.host}api/v2/user/${user_id}`);
      },
      getUserTorrent() {
        if (this.busy) return;
        this.busy = true;
        const user_id = this.$route.params.id || 'session';
        const url = `${this.host}api/v2/torrent/user/${user_id}`;
        this.$http.get(url, {
          p: this.torrents.offset,
          limit: this.torrents.limit,
        }).then((resp) => {
          const result = resp.json();
          this.torrents.data = result.torrents;
          this.torrents.offset++;
          this.torrents.total = result.page_count * this.torrents.limit;
          this.busy = false;
        });
      },
      getUserBangumi() {
        return this.$http.get(`${this.host}api/v2/bangumi/user/${this.$route.params.id}`).then((response) => {
          this.$set('bangumi', response.json());
        });
      },
      aggressiveCaching() {
        this.user.teams.forEach((t) => {
          if (t.icon) cacheImage(`${this.host}${t.icon}`);
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
    },
    events: {
      'avatar.loaded' () {
        this.$set('loaded', true);
      },
    },
    route: {
      // canReuse: false,
      data() {
        console.log('[UserPage]loaded');
        this.getUserInfo().then((resp) => {
          this.$set('user', resp.json());
          this.getUserTorrent();
          this.getUserBangumi();
          this.aggressiveCaching();
        });
      },
    },
  };
</script>
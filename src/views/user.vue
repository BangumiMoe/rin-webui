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
      background-color: @color-primary-2;
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
      position: relative;
      /*left: ~"calc(50% + 80px)";*/
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
    <div class="auditing_teams" transition="rin-fade" v-show="loaded">
      <router-link :title="team.name"
        :to="{name: 'team-profile', params: {id: team._id}}"
        v-for="team in user.auditing_teams">
        <span class="team-icon">
          {{team.name.slice(0, 1)}}
        </span>
      </router-link>
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
      <rin-torrents-table :torrents="user.torrents.data" :hide_uploader="true"></rin-torrents-table>
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

  import moment from 'moment';
  import RinTorrentsTable from '../components/rin-torrents-table';
  import RinAvatar from '../components/rin-avatar';

  export default {
    name: 'User',
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
          username: '',
          torrents: {
            data: [],
            page_num: 0,
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
    components: {
      RinTorrentsTable,
      RinAvatar,
    },
    filters: {
      date: require('../filters/dateFormat.js'),
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
        /* other user info json response(not session) */
        /* {
          "_id":"581b4379ee98e9ca20730e99",
          "username":"LoliHouse",
          "emailHash":"e1fb451bfc1b738fb97091a367a2a617",
          "active":true,
          "regDate":1478181753743,
          "team_ids":null,
          "group":"member",
          "teams":[
              {
                "_id":"581b44bfee98e9ca20730e9a",
                "name":"LoliHouse",
                "tag_id":"581be821ee98e9ca20730eae",
                "signature":"",
                "icon":"data/images/2016/11/39wf4vv2py84i2624t7.jpg",
                "admin_id":"581b4379ee98e9ca20730e99",
                "admin_ids":[
                    "581b4379ee98e9ca20730e99"
                ],
                "editor_ids":[
                    "57fddd8fee98e9ca207307af"
                ],
                "member_ids":[
                    "581b4379ee98e9ca20730e99",
                    "570945dc2165b9ba0c48456e",
                    "57fddd8fee98e9ca207307af"
                ],
                "auditing_ids":[

                ],
                "regDate":"2016-11-03T14:07:59.512Z",
                "approved":true,
                "tag":{
                    "_id":"581be821ee98e9ca20730eae",
                    "name":"LoliHouse",
                    "type":"team",
                    "synonyms":[
                      "LoliHouse"
                    ],
                    "locale":{

                    },
                    "syn_lowercase":[
                      "lolihouse"
                    ],
                    "activity":992
                }
              }
          ],
          "auditing_teams":[

          ]
        }*/
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

              console.log(`[User.getUserInfo]user ${this.user.username} info loaded`);
              // load other extra info
              this.getUserTorrent(this.user.torrents.page_num);
              this.getUserBangumi();
              // this.aggressiveCaching();
            }
          );
        });
      },
      getUserTorrent(page_num) {
        return this.resources.user_torrent.query({
          id: this.user.id,
        }, {
          p: page_num,
          limit: this.user.torrents.page_limit,
        }).then((resp) => {
          resp.json().then(
            data => {
              this.user.torrents.page_count = data.page_count;
              this.user.torrents.data.push(...data.torrents);
              console.log(`[User.getuserTorrent]user ${this.user.username} torrent page ${page_num} loaded`);
            }
          );
        });
      },
      getUserBangumi() {
        return this.resources.user_bangumi.query({
          id: this.user.id,
        }).then(
          (response) => {
            response.json().then(
              data => {
                this.user.bangumi.push(...data);
                console.log(`[User.getUseBangumi]user ${this.user.username} bangumi loaded`);
              });
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
        this.user.username = '';
        this.user.torrents.page_num = 0;
        this.user.torrents.page_count = 0;
        this.user.torrents.data.splice();
        this.user.bangumi.splice();
      },
    },
    created() {
      this.$on('avatar.loaded', () => {
        this.loaded = true;
      });
    },
    mounted () {
      this.busy = true;
      this.loaded = false;
      this.user.id = this.$route.params.id || 'session';

      // reset and load user info from remote server
      this.resetUserInfo();
      this.getUserInfo();
      console.log('[UserPage]loaded');
    },
  };
</script>
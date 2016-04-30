<style scoped lang="less">
@import "../less/colors.less";
@color-inline-tag: #6d6d6d;
@color-inline-tag-bg: #eeeeee;
@user-avatar-size: 160px;
@team-avatar-size: 80px;
@team-avatar-border: 0.06 * @team-avatar-size;

    .page-nav{
      width: 250px;
      right: 190px;
      height: 40px;
      position: fixed;
      bottom:40px;
      text-align: center;
      line-height: 40px;
      font-size: 1.2em;
      box-shadow: 1px 1px 25px 1px #DC7788;
      border-radius: 5px;
      overflow: hidden;

      .page-nav-inner{
        width:100%;
        float: right;
        transition: width .5s;
      }

      .page-nav-btn{
        cursor: pointer;
        color: white;
        transition: background-color .2s;

        i { line-height: 40px; transition: font-size .2s }

        &.btn-up{ background-color: @color-primary-2 }
        &.btn-up-first{ background-color: @color-primary-2 }
        &:not(.disabled):hover{
          background-color: @color-primary-3;

          i{ font-size:2em; }
        }

        &.btn-down{ background-color: @color-primary-2; }
        &.btn-down-last{ background-color: @color-primary-2; }
      }

      .page-nav-num{color: @color-primary-0; }
      .page-nav-num.cur{
        color: @color-secondary-1-3;
        background-color: @color-secondary-1-2 !important;
        cursor:default;
      }
      .page-nav-num{
        background-color: @color-primary-1;
        font-size: 0.9em;
      }
      .page-nav-num:nth-child(odd){
        background-color: @color-primary-2;
      }
      .disabled{ cursor: default; }
    }

.rin-wrapper{
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  position: relative;
  .rin-avatar{
    position: absolute;
    top: 40vh;
    margin-top: -80px;
    width: 100%;
    display: flex;
    z-index: 20;
  }
}
.background{
  height: 40vh;
  background-color: @rgba-primary-1;
  width: 100%;
}
.content{
  padding: 80px 100px 0 100px;
  max-width: 960px;
  margin: auto;
  margin-bottom: 100px;
}
.name{
  text-align: center;
}
.teams{
  text-align: left;
  a{
    margin-left: 20px
  }
}
.auditing_teams{
  text-align: right;
  a{
    margin-right: 20px;
    text-align: center;
    .team-icon{
      color: white;
      font-size: @team-avatar-size * 0.7;
      line-height: @team-avatar-size;
      background-color: #ddd;
    }
  }
  &.rin-fade-transition{
    transition: transform .6s .6s, opacity .6s .6s;
    &.rin-fade-enter, &.rin-fade-leave{
      opacity: 0;
      .team-icon{
        transform: scale(.6);
      }
    }
  }
}
.teams, .auditing_teams{
  flex: 1;
  height: @team-avatar-border * 2 + @team-avatar-size;
  align-self: center;
  a{
    display: inline-block;
    .team-icon{
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
table td:first-child {
  padding-left: 1em;
  padding-right: 1em;
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
      <h2>{{"最近番组" | locale}}</h2>
      <div class="rin-tag">
        <a class="haspic" v-link="'/tag/' + i.tag._id" v-for="i in bangumi">
          <img v-bind:src="'https://bangumi-moe.phoenixstatic.com/' + i.icon" v-if="i.icon" class="icon" alt="" />
          <span>{{ i.tag | locale }}</span>
        </a>
      </div>
      <h2>
        {{"最近种子" | locale}}

        <div class="page-nav clearfix">
          <div  class="rin-row page-nav-inner" >
            <a class="page-nav-btn btn-down-last rin-col-2" href="https://bangumi.moe/rss/latest" target="_blank">
              <i class="material-icons" style="transform: rotate(45deg);padding-top: 1px;padding-left: 1px;">&#xE63E;</i>
            </a>
            <a class="page-nav-btn btn-up-first rin-col-2" v-on:click="chgPage(1-currentPage)" v-bind:class="{'disabled':1-currentPage==0}">
              <i class="material-icons">&#xE020;</i>
            </a>
            <a class="page-nav-btn btn-up rin-col-2" v-on:click="chgPage(-1)" v-bind:class="{'disabled':currentPage==1}">
              <i class="material-icons">&#xE314;</i>
            </a>
            <a class="cur rin-col-4  page-nav-btn page-nav-num">{{currentPage}}</a>
            <a class="page-nav-btn btn-down rin-col-2" v-on:click="chgPage(+1)" v-bind:class="{'disabled':currentPage==torrents.page_count}">
              <i class="material-icons">&#xE315;</i>
            </a>
          </div>
        </div>
      </h2>
          <table class="torrents rin-table">
            <tbody>
              <tr v-for="i in torrents.torrents">
                <td class="rin-center">{{i.publish_time | date 'lately HH:MM'}}</td>

                <td>
                  <a class="rin-inline-tag haspic" v-link="'/team/' + i.team._id" v-if="i.team">
                    <img  v-if="i.team.icon" v-bind:src="teamIconBaseUrl + i.team.icon" />
                    <img  src="../assets/akarin.jpg" v-if="!i.team.icon"/>
                    <span>{{ (i.team.tag || 'No Team' ) | locale }}</span>
                  </a>

                  <a class="rin-inline-tag haspic" v-if="!i.team">
                    <img v-bind:src="'https://bangumi-moe.phoenixstatic.com/' + i.uploader.emailHash" />
                    <span>{{ i.uploader.username }}</span>
                  </a>

                  <a style="width:60%" v-link="'/torrent/' + i._id">
                    <span>{{i.title}}</span>
                    <span class="rin-inline-tag" v-if="i.comments">{{i.comments}} {{'Comments'|locale}}</span>
                  </a>
                </td>

                <td>
                  <button class="rin-button" v-show="canModify(i)">
                    <i class="material-icons">&#xE254;</i>
                    <tooltip :info="'Edit' | locale"></tooltip>
                  </button>
                </td>

                <td>
                  <button class="rin-button" v-show="canModify(i)">
                    <i class="material-icons">&#xE872;</i>
                    <tooltip :info="'Delete' | locale"></tooltip>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

    </div>
  </div>
</template>
<script>
/*
 只加载。不处理加载完成的事件
*/
function cacheImage(link){
  let tmp = new Image()
  tmp.src = link
}
export default {
  data(){
    return {
      currentPage:  1,
      currentLimit: 25,
      user:         {},
      loaded:       false,
      torrents:     {},
      teamIconBaseUrl: "https://bangumi-moe.phoenixstatic.com/",
    }
  },
  components: {
    "rin-avatar": require("../components/rin-avatar"),
    "tooltip": require("../components/nav-tooltip")
  },
  filters: {
     'date':require('../filters/dateFormat.js')
  },
  methods: {
    chgPage(offset) {
      var self = this;
      var newPage = self.currentPage + (offset);
      if (newPage <= 0) {
        newPage = 1;
      } else if (newPage > self.torrents.page_count) {
        newPage = self.torrents.page_count;
      }
      self.currentPage = newPage;
      self.torrents = {};
      self.getUserTorrent();
    },
    getIcon(i){
      return i.icon ? 'https://bangumi-moe.phoenixstatic.com/' + i.icon : require('../assets/akarin.jpg');
    },
    getUserInfo(){
      return this.$http({"method": "GET", "url": `https://bangumi.moe/api/v2/user/${this.$route.params.id || 'session'}`}).then((response)=>{
        this.$set("user", response.data)
      })
    },
    getUserTorrent(){
      return this.$http
        .get(`https://bangumi.moe/api/v2/torrent/user/${this.$route.params.id}?p=${this.currentPage}&limit=${this.currentLimit}`, {limit:25})
        .then((response)=>{
          this.$set("torrents", response.data)
      })
    },
    getUserBangumi(){
      return this.$http({"method": "GET", "url": `https://bangumi.moe/api/v2/bangumi/user/${this.$route.params.id}`}).then((response)=>{
        this.$set("bangumi", response.data)
      })
    },
    aggressiveCaching(){
      this.user.teams.forEach((t)=>{
        t.icon && cacheImage(`https://bangumi-moe.phoenixstatic.com/${t.icon}`)
      })
    },
    canModify(torrent){
      uid = this.user._id;
      if (uid == undefined) return false;

      if (torrent.uploader._id == uid) { return true };

      for( i in this.user.teams) {
        if(this.user.teams[i]._id == torrent.team._id) {
          for(j in this.user.teams[i].admin_ids) {
            if(uid == this.user.teams[i].admin_ids[j]) {
              return true;
            }
          }
          break;
        }
      }

      return false;
    }
  },
  route:{
    canReuse: false
  },
  events: {
    "avatar.loaded": function(e){
      this.$set('loaded', true)
    }
  },
  ready(){
    this.getUserInfo().then(()=>{
      this.getUserTorrent()
      this.getUserBangumi()
      this.aggressiveCaching()
    })
  }
}
</script>

<style scoped lang="less">
@import "../less/colors.less";
@color-inline-tag: #6d6d6d;
@color-inline-tag-bg: #eeeeee;
@user-avatar-size: 160px;
@team-avatar-size: 80px;
@team-avatar-border: 0.06 * @team-avatar-size;
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
          <span class="team-icon" style="background-image:url({{getIcon(i)}})">
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
      <h2>{{"最近种子" | locale}}</h2>

          <table class="torrents rin-table">
            <tbody>
              <tr v-for="i in torrents.torrents">
                <td class="rin-center">{{i.publish_time | date 'lately'}}</td>

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

                  <a class="rin-truncate" style="width:60%" v-link="'/torrent/' + i._id">
                    <span>{{i.title}}</span>
                    <span class="rin-inline-tag" v-if="i.comments">{{i.comments}} {{'Comments'|locale}}</span>
                  </a>
                </td>

                <td>
                  <button class="rin-button">
                    <i class="material-icons">&#xE254;</i>
                    <tooltip :info="'Edit' | locale"></tooltip>
                  </button>
                </td>

                <td>
                  <button class="rin-button">
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
      user: {},
      loaded: false,
      torrents: [],
      teamIconBaseUrl: "https://bangumi-moe.phoenixstatic.com/",
    }
  },
  components: {
    "rin-avatar": require("../components/rin-avatar")
  },
  filters: {
     'date':require('../filters/dateFormat.js')
  },
  methods: {
    getIcon(i){
      return i.icon ? 'https://bangumi-moe.phoenixstatic.com/' + i.icon : require('../assets/akarin.jpg');
    },
    getUserInfo(){
      return this.$http({"method": "GET", "url": `https://bangumi.moe/api/v2/user/${this.$route.params.id || 'session'}`}).then((response)=>{
        this.$set("user", response.data)
      })
    },
    getUserTorrent(){
      return this.$http({"method": "GET", "url": `https://bangumi.moe/api/v2/torrent/user/${this.$route.params.id}`}).then((response)=>{
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

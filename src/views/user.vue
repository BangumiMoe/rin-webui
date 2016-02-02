<style scoped lang="less">
@import "../less/colors.less";
@color-inline-tag: #6d6d6d;
@color-inline-tag-bg: #eeeeee;
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
.rin-inline-tag {
  display: inline-block;
  color: @color-inline-tag;
  background-color: @color-inline-tag-bg;
  height: 20px;
  line-height: 20px;
  padding-right: 5px;
  padding-left:5px;
  margin-right: 5px;
  transition: all .6s;
  margin-top: 5px;
  &:hover{
    background-color:#fff;
  }
}
.name{
  text-align: center;
}
.teams{
  position: relative;;
  top: -80px - (160px - 80px) /2 ;
  left: calc(~'50% + 80px');
  .team{
    margin-left: 20px;
    display: inline-block;
    .team-icon{
      height: 80px;
      background-size: cover;
      background-repeat: no-repeat;
      width: 80px;
      border-radius: 50%;
      border: solid 2px white;
      display: inline-block;
    }
  }
}
</style>

<template>
  <div class="rin-wrapper">
    <div class="rin-avatar">
      <rin-avatar v-bind:hash="user.emailHash"></rin-avatar>
      <div class="teams" v-show="loaded" transition="rin-fade">
        <a title="{{i.name}}" class="team" v-link="'/team/'+i._id" v-for="i in user.teams">
          <span class="team-icon" style="background-image:url({{'https://bangumi-moe.phoenixstatic.com/' + i.icon}})">
          </span>
        </a>
      </div>
    </div>

    <div class="background" v-show="loaded" transition='rin-fade'></div>
    <div class="content" v-show="loaded" transition="rin-fade">
      <h1 class="name">{{user.username}}</h1>
      <h2>{{"最近番组" | locale}}</h2>
      <div class="tags">
        <a class="rin-inline-tag" v-link="'/team/' + i._id" v-for="i in bangumi">
          <img v-bind:src="'https://bangumi-moe.phoenixstatic.com/' + i.icon" v-if="i.icon" class="icon" alt="" />
          <span>{{i.name | locale}}</span>
        </a>
      </div>
      <h2>{{"最近种子" | locale}}</h2>
      <div class="torrents">
        <a class="rin-inline-tag" v-link="'/torrent/' + i._id" v-for="i in torrents.torrents">
          <span>{{i.title}}</span>
        </a>
      </div>
    </div>
  </div>


</template>
<script>
export default {
  data(){
    return {
      user: {},
      loaded: false,
      torrents: []
    }
  },
  components: {
    "rin-avatar": require("../components/rin-avatar")
  },
  methods: {
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
    })
  }
}
</script>

<template>
  <!--<a class="team" v-link="'/team/' + data.team._id" v-if="data.team.name">
    <img v-if="data.team.icon" v-bind:src="'//bangumi-moe.phoenixstatic.com/'+data.team.icon">
    <img src="../assets/akarin.jpg" v-if="!data.team.icon"/>
    <b class="name">{{data.team.name}}</b>
  </a>-->
  <a v-link="{name: 'team-profile', id: id}">
    <img :src="icon_path">
    <b class="name" v-html="teamname"></b>
  </a>
</template>

<style scoped lang="less">
  @color-th-bg: rgba(98, 137, 168, 0.8);
  a {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    border: 1px solid @color-th-bg;
    vertical-align: middle;
    font-size: 0;
    overflow: hidden;
    border: 1px solid @color-th-bg;
    img {
      float: left;
      height: 20px;
      width: 20px;
    }
    b {
      display: inline-block;
      background: #fff;
      color: @color-th-bg;
      transition: all .2s linear;
      font-size: 14px;
      padding: 0 .3rem;
      &:hover {
        background: @color-th-bg;
        color: #fff;
      }
    }
  }
</style>

<script>
  export default {
    name: 'RinTeamLabel',
    props: ['id', 'teamname', 'path'],
    data() {
      let path = this.path;

      if (path === undefined) {
        path = '/static/images/akarin.jpg';
      } else if (path.indexOf('//') !== 0) {
        path = `//static.bangumi.moe/${path}`;
      }

      return {
        icon_path: path,
      };
    },
    watch: {
      path(val) {
        if (val === undefined) return;

        let path = val;
        if (path.indexOf('//') !== 0) {
          path = `//static.bangumi.moe/${path}`;
        }
        this.icon_path = path;
      },
    },
  };
</script>
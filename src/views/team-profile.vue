<template>
<div id="rin-main" style="width: calc(100% - 128px);">
  <div class="rin-row">
    <div class="rin-col team-profile rin-center">
      <span class="face-icon" v-show="team.torrents.length == 0">
                    <img :src="fetch_icon(team.info.icon)" alt="team face">
                    <h1 class="team-name" v-text="team.info.name"></h1>
                </span>

      <div class="team-topbar">

      </div>

      <div class="team-content" v-show="team.torrents.length > 0">
        <rin-torrents-table :torrents="team.torrents" :torrents_total="team.torrents_total"></rin-torrents-table>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
  @import "../less/colors.less";
  .team-profile {
    position: relative;
    .face-icon {
      position: absolute;
      top: 40vh;
      display: inline-block;
      margin-top: -85px;
      margin-left: -85px;
      width: 170px;
      img {
        width: 160px;
        border: 5px solid white;
        border-radius: 50%;
      }
      .team-name {
        display: inline-block;
        width: 100%;
        color: white;
        text-wrap: none;
      }
    }
    .team-topbar {
      height: 40vh;
    }
    .team-content {
      height: 60vh;
      background-color: @color-primary-2;
    }
  }
</style>

<script>
  import RinTorrentsTable from "../components/rin-torrents-table"
  export default {
    components: {
      RinTorrentsTable
    },
    data: function() {
      return {
        team: {
          id: null,
          info: {},
          bangumi: [],
          torrents: [],
          torrents_total: 0,
        }
      }
    },
    methods: {
      fetch_user_icon(email_hash) {
        return 'https://bangumi.moe/avatar/' + email_hash
      },
      fetch_icon(icon_url) {
        return 'https://bangumi.moe/' + icon_url
      },
      fetch_info(id) {
        this.team.info = {}
        this.$http.get('https://bangumi.moe/api/v2/team/' + id).then(
          resp => {
            this.team.info = resp.data
              // console.log(resp.data)
          },
          error => {
            console.log('[team-profile.fetch_info]found http error,' + error)
          },
        )
      },
      fetch_bangumi(id) {
        this.team.bangumi = {}
        this.$http.get('https://bangumi.moe/api/v2/bangumi/team/' + id).then(
          resp => {
            this.team.bangumi = resp.data
              // console.log(resp.data)
          },
          error => {
            console.log('[team-profile.fetch_bangumi]found http error,' + error)
          },
        )
      },
      fetch_torrents(id, page_num, limit) {
        this.$http.get('https://bangumi.moe/api/v2/torrent/team/' + id, {
          p: page_num,
          limit: limit
        }).then(
          resp => {
            this.team.torrents.push(...resp.data.torrents)
            this.team.torrents_total = resp.data.page_count * limit
          },
          error => {
            console.log('[team-profile.fetch_bangumi]found http error,' + error)
          },
        )
      }
    },
    route: {
      data() {
        this.team.id = this.$route.params.id
        this.fetch_info(this.team.id)
        this.fetch_bangumi(this.team.id)
        this.fetch_torrents(this.team.id, 0, 100)
      }
    }
  }
</script>
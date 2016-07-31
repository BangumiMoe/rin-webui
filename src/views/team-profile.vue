<template>
<div id="rin-main" style="width: calc(100% - 128px);">
  <div class="rin-row">
    <div class="rin-col team-profile rin-center">
      <div class="team-topbar" v-el:team_topbar>
        <span class="face-icon" v-el:team_icon>
            <img :src="fetch_icon(team.info.icon)" @load="img_changed">
        </span>
        <h1 class="team-name" v-text="team.info.name"></h1>
      </div>

      <div class="team-content" v-el:team_content>
        <div class="team_torrents_table">
          <rin-torrents-table :torrents="team.torrents" :torrents_total="team.torrents_total" :hide_team_name="true"></rin-torrents-table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
  @import "../less/colors.less";
  .team-profile {
    position: relative;
    .team-topbar {
      height: 40vh;
      display: block;
      padding: 14px;
      text-align: left;
      transition: all 1s;
      &.loaded {
        height: 100px;
        .team-name {
          opacity: 1;
        }
      }
      .face-icon {
        display: inline-block;
        margin-left: ~"calc(50vw - 128px - 14px)";
        margin-top: ~"calc(40vh - 85px)";
        transition: all 1s;
        &.loaded {
          margin-top: 0;
          margin-left: 0;
          img {
            width: 90px;
            height: 90px;
            border-color: @color-primary-0;
          }
        }
        img {
          background-color: white;
          height: 170px;
          width: 170px;
          border: 5px solid white;
          border-radius: 50%;
          transition: all 2s, height 1s, width 1s;
        }
      }
      .team-name {
        display: inline-block;
        margin-left: 0.3em;
        color: @color-primary-3;
        opacity: 0;
        transition: opacity 1s linear;
      }
    }
    .team-content {
      height: 60vh;
      background-color: @color-primary-2;
      transition: all 1s;
      .team_torrents_table {
        height: 100%;
        opacity: 0;
        transition: opacity 1s linear;
      }
      &.loaded {
        height: ~"calc(100vh - 128px)";
        .team_torrents_table {
          opacity: 1;
        }
      }
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
      img_changed(ev) {
        this.$els.team_icon.className += ' loaded'
        let self = this
        window.setTimeout(function() {
          self.$els.team_topbar.className += ' loaded'
          self.$els.team_content.className += ' loaded'
        }, 1000)
      },
      fetch_user_icon(email_hash) {
        return 'https://bangumi.moe/avatar/' + email_hash
      },
      fetch_icon(icon_url) {
        if (icon_url === null) {
          return require('../assets/akarin.jpg')
        }
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
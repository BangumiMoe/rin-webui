<template>
<div class="rin-table">
  <div class="header">
    <div class="row">
      <span class="column">{{'Uploaded time'|locale}}</span>
      <span class="column">{{'Category'|locale}}</span>
      <span class="column">{{ 'Title'|locale}}</span>
      <span class="column">{{'magnet'|locale}}</span>
      <span class="column">{{'Seed stat'|locale}}</span>
      <span class="column">{{'Uploader'|locale}}</span>
    </div>
  </div>

  <div class="body">
    <div class="row" v-for="(index, t) in torrents">
      <span class="column">{{t.publish_time | date 'lately'}}</span>
      <span class="column"><strong>{{t.category_tag|locale}}</strong></span>
      <span class="column">
        <div class="container" v-link="'/torrent/' + t._id" @mouseup.stop="title_right_click($event, t)" v-if="t">
          <a class="rin-team rin-inline-tag haspic" v-link="'/team/' + t.team._id" v-if="t.team" v-show="!hide_team_name">
            <img v-if="t.team.icon" v-bind:src="teamIconUrl + t.team.icon" alt="" />
            <img src="../assets/akarin.jpg" v-if="!t.team.icon" />
            <span>{{t.team.tag | locale}}</span>
          </a>
          <a class="rin-team-title" target="_blank" v-if="t">{{t.title}}</a>
          <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{ ((t.comments >1) ? 'Comments' :'Comment' )| locale }}</span>
        </div>
      </span>
      <span class="column"><a class="rin-magnet" title="磁力下載" href="{{t.magnet}}"><i class="material-icons">&#xE2C4;</i></a></span>
      <span class="column">
        {{t.size}}
        <a class="rin-seed-online" href="javascript:void(0)" title="种子">{{t.seeders}}</a> /
        <a class="rin-seed-downloading" href="javascript:void(0)" title="下载中">{{t.leechers}}</a> /
        <a class="rin-seed-downloaded" href="javascript:void(0)" title="完成">{{t.finished}}</a>
      </span>
      <span class="column">
        <a v-link="'/user/' + t.uploader._id" class='rin-inline-tag haspic'>
            <img v-bind:src="gravatarUrl+t.uploader.emailHash" alt="" />
            <span>{{t.uploader.username}}</span>
        </a>
      </span>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
  @import "../less/colors.less";
  @table-header-bg: @color-primary-0;
  @table-header-fg: rgba(230, 230, 230, 0.99);
  @table-header-font-size: 13px;
  @table-row-font-size: 12px;
  .rin-table {
    overflow: scroll;
    .row {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: @table-row-font-size;
      height: @table-row-font-size * 2.6;
      line-height: @table-row-font-size * 2.6;
      min-height: @table-row-font-size * 2.6;
      .column {
        &:nth-child(1) {
          width: 128px;
        }
        &:nth-child(2) {
          width: 64px;
        }
        &:nth-child(3) {
          flex: 1 auto;
        }
        &:nth-child(4) {
          min-width: 52px;
        }
        &:nth-child(5) {
          width: 200px;
        }
        &:last-child {
          width: 128px;
        }
      }
    }
    .header {
      width: 100%;
      color: @table-header-fg;
      background-color: @table-header-bg;
      .row {
        font-size: @table-header-font-size;
        line-height: @table-header-font-size * 2.6;
        height: @table-header-font-size * 2.6;
      }
    }
    .body {
      .row {
        .column {
          &:nth-child(3) {
            text-align: left;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    props: ['torrents', 'torrents_total', 'hide_team_name'],
    filters: {
      date: require('../filters/dateFormat.js')
    },
    data() {
      return {
        // magnentt: '&tr=https%3A%2F%2Ftr.bangumi.moe%3A9696%2Fannounce&tr=http%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=udp%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=http%3A%2F%2Fopen.acgtracker.com%3A1096%2Fannounce&tr=http%3A%2F%2F208.67.16.113%3A8000%2Fannounce&tr=udp%3A%2F%2F208.67.16.113%3A8000%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A6868%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A7070%2Fannounce&tr=http%3A%2F%2Ft2.popgo.org%3A7456%2Fannonce&tr=http%3A%2F%2Fbt.sc-ol.com%3A2710%2Fannounce&tr=http%3A%2F%2Fshare.camoe.cn%3A8080%2Fannounce&tr=http%3A%2F%2F61.154.116.205%3A8000%2Fannounce&tr=http%3A%2F%2Fbt.rghost.net%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.prq.to%2Fannounce&tr=http%3A%2F%2Fopen.nyaatorrents.info%3A6544%2Fannounce',
        gravatarUrl: '//bangumi.moe/avatar/',
        teamIconUrl: '//bangumi.moe/'
      }
    },
    methods: {
      title_right_click(ev, torrent) {
        if (ev.which == 3) {
          window.open('/torrent/' + torrent._id, '_blank')
        }
      }
    }
  }
</script>
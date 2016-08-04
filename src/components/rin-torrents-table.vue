<template>
<div class='loader-down' v-if='prevBusy'>
  <div is="rin-loader" v-if='prevBusy' transition="rin-fade"></div>
</div>
<table class="rin-main-table">
  <thead>
    <tr>
      <th class="publish_time"><span class="title">{{'Uploaded time'|locale}}</th>
            <th class="category" style="width: 8%"><span class="title">{{'Category'|locale}}</span></th>
      <th class="title"><span class="title">{{'Title'|locale}}</span></th>
      <th class="magnet"><span class="title">{{'magnet'|locale}}</span></th>
      <th class="seed-stats"><span class="title">{{'Seed stat'|locale}}</span></th>
      <th class="uploader"><span class="title">{{'Uploader'|locale}}</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(index, t) in torrents">
      <td class="publish_time">{{t.publish_time | date 'lately'}}</td>
      <td class="category" style="width:8%">
        <strong>{{t.category_tag|locale}}</strong>
      </td>
      <td class="title">
        <div class="container" v-link="'/torrent/' + t._id" @mouseup.stop="title_right_click($event, t)" v-if="t">
          <a class="rin-team rin-inline-tag haspic" v-link="'/team/' + t.team._id" v-if="t.team" v-show="!hide_team_name">
            <img v-if="t.team.icon" v-bind:src="teamIconUrl + t.team.icon" alt="" />
            <img src="../assets/akarin.jpg" v-if="!t.team.icon" />
            <span>{{t.team.tag | locale}}</span>
          </a>
          <a class="rin-team-title" target="_blank" v-if="t" >{{t.title}}</a>
          <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{ ((t.comments >1) ? 'Comments' :'Comment' )| locale }}</span>
        </div>
      </td>
      <td class="magnet">
        <a class="rin-magnet" title="磁力下載" href="{{t.magnet}}"><i class="material-icons">&#xE2C4;</i></a>
      </td>
      <td class="seed-stats">
        {{t.size}}
        <a class="rin-seed-online" href="javascript:void(0)" title="种子">{{t.seeders}}</a> /
        <a class="rin-seed-downloading" href="javascript:void(0)" title="下载中">{{t.leechers}}</a> /
        <a class="rin-seed-downloaded" href="javascript:void(0)" title="完成">{{t.finished}}</a>
      </td>
      <td class="uploader">
        <a v-link="'/user/' + t.uploader._id" class='rin-inline-tag haspic'>
          <img v-bind:src="gravatarUrl+t.uploader.emailHash" alt="" />
          <span>{{t.uploader.username}}</span>
        </a>
      </td>
    </tr>
  </tbody>
</table>
</template>

<div class='loader-down' v-if='nextBusy'>
  <div is="rin-loader" v-if='nextBusy' transition="rin-fade"></div>
</div>

<style scoped lang="less">
  @import "../less/colors.less";
  /* Home page table colors schema
  @table-header-fg: rgba(233, 233, 233, 0.9);
  @table-header-bg: rgba(98, 137, 168, 1);
  @table-body-odd: #efefef;
  @table-body-even: white;
  @table-body-hover: #cecece;*/
  
  @table-header-fg: white;
  @table-header-bg: @color-primary-0;
  @table-body-odd: @color-table-odd-bg;
  @table-body-even: @color-table-even-bg;
  @table-body-hover: @color-primary-3;
  @table-body-hover-color: @color-primary-2;
  @table-font-size: 12px;
  table {
    height: ~"calc(100% - 24px)";
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: @table-font-size;
    thead {
      background-color: @table-header-bg;
      color: @table-header-fg;
      display: block;
      position: relative;
      tr {
        width: ~"calc(100% - 24px)";
        display: flex;
        flex-direction: row;
        position: relative;
        text-align: left;
        overflow: hidden;
        th {
          display: inline-block;
          padding: 5px 2px;
          text-align: center;
          &.publish_time {
            width: 7%;
          }
          &.category {}
          &.title {
            width: 50%;
          }
          &.magnet {
            width: 5%;
          }
          &.seed-stats {
            text-align: center;
            width: 15%;
          }
          &.uploader {
            text-align: left;
            width: 12%;
          }
        }
      }
    }
    tbody {
      display: block;
      overflow: auto;
      overflow-y: scroll;
      height: 100%;
      width: 100%;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      &::-webkit-scrollbar-thumb {
        background-color: @color-primary-4;
        outline: 1px solid slategrey;
      }
      tr {
        display: flex;
        width: 100%;
        text-align: left;
        /*overflow: hidden;*/
        &:nth-child(odd) {
          background-color: @table-body-odd;
        }
        &:nth-child(even) {
          background-color: @table-body-even;
        }
        &:hover {
          color: @table-body-hover-color;
          background-color: @table-body-hover;
          td.title {
            .container a.rin-team-title {
              overflow: visible;
            }
          }
        }
        td,
        th {
          text-align: left;
          line-height: 32px;
          &.publish_time {
            text-align: center;
            width: 7%;
          }
          &.category {
            color: @color-primary-4;
            text-align: center;
            width: 8%;
          }
          &.title {
            cursor: pointer;
            width: 50%;
            overflow: hidden;
            .container {
              display: inline-flex;
              a {
                text-wrap: none;
                text-overflow: sellipsis;
                &.rin-team {
                  text-align: center
                }
                &.rin-team-title {
                  float: left;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          &.magnet {
            text-align: center;
            width: 5%;
          }
          &.seed-stats {
            text-align: center;
            width: 15%;
          }
          &.uploader {
            width: 14%;
          }
        }
        th {
          padding: 15px 2px 5px 2px;
          text-align: center;
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
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
      <th class="file_size"><span class="title">{{'Size'|locale}}</span></th>
      <th class="seed-stats"><span class="title">{{'Seed stat'|locale}}</span></th>
      <th class="uploader"><span class="title">{{'Uploader'|locale}}</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(index, t) in torrents">
      <td class="publish_time">{{t.publish_time | date 'lately HH:mm'}}</td>
      <th class="category" style="width:8%">
        <div class="rin-inline-tag">
          <span>{{t.category_tag|locale}}</span>
        </div>
      </th>
      <td class="title">
        <div class="container">
          <a class="rin-team rin-inline-tag haspic" v-link="'/team/' + t.team._id" v-if="t.team" v-show="!hide_team_name">
            <img v-if="t.team.icon" v-bind:src="teamIconBaseUrl+t.team.icon" alt="" />
            <img src="../assets/akarin.jpg" v-if="!t.team.icon" />
            <span>{{t.team.tag | locale}}</span>
          </a>
          <a class="rin-team-title" target="_blank">{{t.title}}</a>
          <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{ ((t.comments >1) ? 'Comments' :'Comment' )| locale }}</span>
        </div>
      </td>
      <td class="magnet">
        <a class="rin-magnet" title="磁力下載" href="{{t.magnet}}{{magnentt}}" @click.stop><i class="material-icons">&#xE2C4;</i></a>
      </td>
      <td class="file_size">{{t.size}}</td>
      <td class="seed-stats">
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
  table {
    height: ~"calc(100% - 24px)";
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    thead {
      background-color: @color-primary-4;
      color: @color-primary-1;
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
          &.file_size {
            text-align: right;
            width: 7%;
          }
          &.seed-stats {
            text-align: left;
            width: 8%;
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
          background-color: @color-primary-0;
        }
        &:nth-child(even) {
          background-color: @color-primary-2;
        }
        &:hover {
          background-color: @color-primary-3;
          td.title {
            .container a.rin-team-title {
              overflow: visible;
            }
          }
        }
        td {
          text-align: left;
          padding: 15px 2px 5px 2px;
          &.publish_time {
            text-align: center;
            width: 7%;
          }
          &.category {
            text-align: center;
            width: 8%;
          }
          &.title {
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
          &.file_size {
            text-align: right;
            width: 8%;
          }
          &.seed-stats {
            width: 8%;
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
        gravatarUrl: '//bangumi.moe/avatar/'
      }
    }
  }
</script>
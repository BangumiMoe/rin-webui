<template>
<div class="rin-table" v-el:table @scroll="scroll_event($event)">
    <div class="header" v-el:header>
      <div class="row">
        <span class="column">{{'Uploaded time'|locale}}</span>
        <span class="column">{{'Category'|locale}}</span>
        <span class="column">{{'Title'|locale}}({{torrents.length}}/{{torrents_total}})</span>
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
  @import '../less/framework.less';
  @table-header-bg: @color-primary-0;
  @table-header-fg: rgba(230, 230, 230, 0.99);
  @table-header-font-size: 13px;
  @table-header-height: 33px;
  @table-row-font-size: 12px;
  .rin-table {
    overflow: scroll;
    height: 100%;
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
      position: fixed;
      display: block;
      color: @table-header-fg;
      background-color: @table-header-bg;
      height: @table-header-height;
      width: 100%;
      .row {
        position: absolute;
        font-size: @table-header-font-size;
        line-height: @table-header-font-size * 2.6;
        height: @table-header-height;
      }
    }
    .body {
      margin-top: @table-header-height;
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
    name: 'RinTorrentsTable',
    props: ['torrents', 'torrents_total', 'hide_team_name', 'on_end', 'on_top'],
    filters: {
      date: require('../filters/dateFormat.js'),
    },
    data() {
      return {
        gravatarUrl: '//bangumi.moe/avatar/',
        teamIconUrl: '//bangumi.moe/',
      };
    },
    methods: {
      title_right_click(ev, torrent) {
        if (ev.which === 3) {
          window.open(`/torrent/${torrent._id}`, '_blank');
        }
      },
      update_ui() {
        const table = this.$els.table;

        // update width
        const width = table.clientWidth;
        this.$els.header.style.width = `${width}px`;
      },
      scroll_event(ev) {
        const t = this.$els.table;
        // console.log((t.scrollTop + t.offsetHeight) >= (t.scrollHeight));
        if (t.scrollTop === 0) {
          if (typeof this.on_top === 'function') {
            this.on_top(ev);
          }
        } else if ((t.scrollTop + t.offsetHeight) >= t.scrollHeight) {
          if (typeof this.on_end === 'function') {
            this.on_end(ev);
          }
        }
      },
    },
    ready() {
      // udpate height once
      const table = this.$els.table;
      const height = table.parentElement.clientHeight;
      table.style.height = `${height}px`;
      table.style.height = null;

      this.update_ui();
      window.addEventListener('resize', this.update_ui);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.update_ui);
    },
  };
</script>
<style scoped lang="less">
  @import "../less/colors.less";
  @import '../less/framework.less';
  @table_body_height: 300px;
  @column_one_width: 7rem;
  @column_three_width: 128rem;
  @column_four_width: 5rem;
  @column_six_width: 10rem;
  @column_seven_width: 10rem;
  .rin-table-wrapper {
    height: 100%;
    display: block;
    position: relative;
  }
  
  #loader {
    height: 256px;
  }
  /*a:hover {
    text-shadow: 1px 1px rgba(99, 99, 99, 0.6);
  }*/
  
  .torrent {
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: @color-primary-4;
      a {
        color: white;
        &.rin-download,
        &.rin-magnet {
          color: @color-primary-0;
        }
      }
    }
    .label {
      font-size: 10px;
      padding: .3rem .6rem;
    }
    .rin-inline-tag {
      border: 1px solid @color-primary-0;
    }
    .rin-download,
    .rin-magnet {
      padding: 0 .3rem;
      border-radius: 2px;
      border: 1px solid #2199e8;
      background-color: white;
      &:hover {
        color: white;
        background-color: #2199e8;
      }
    }
    .torrent-size,
    .torrent-status {
      font-family: monospace;
      font-size: 11px;
      text-align: right;
    }
  }
  
  .rin-table {
    width: 100%;
    padding: 0;
    margin: 0;
    table-layout: fixed;
    border-collapse: collapse;
    div {}
    tbody td,
    tbody th {
      /* padding: .5rem .625rem .625rem; */
      padding: .2rem;
    }
    td:nth-child(1),
    th:nth-child(1) {
      min-width: @column_one_width;
      text-align: center;
    }
    td:nth-child(2),
    th:nth-child(2) {
      width: @column_three_width;
    }
    td:nth-child(3),
    th:nth-child(3) {
      min-width: @column_six_width;
      text-align: center;
    }
    th:nth-child(3) {
      min-width: @column_six_width + 2rem; // add scroll bar width
    }
    td:nth-child(4),
    th:nth-child(4) {
      min-width: @column_seven_width;
      text-align: left;
    }
    th:nth-child(4) {
      margin-left: -2rem;
      min-width: @column_seven_width + 1rem; // add scroll bar width
    }
    thead {
      background-color: @color-primary-2;
      padding: 0;
      border: 0;
      tr {
        display: block;
        position: relative;
        th {
          color: @color-primary-4;
          font-size: 0.8rem;
          font-weight: normal;
        }
      }
    }
    tbody {
      display: block;
      overflow: auto;
      width: 100%;
      height: @table_body_height;
    }
  }
</style>

<template>
  <div class="rin-table-wrapper" ref="table_wrapper">

    <table class="rin-table" ref="table">
      <thead ref="header">
        <tr>
          <th>{{$t('Uploaded time')}}</th>
          <th>
            <span>{{$t('Title')}}</span>
            <span v-if="torrents_total">({{torrents.length}}/{{torrents_total}})</span>
          </th>
          <th>&nbsp;</th>
          <th v-if="!hide_uploader">{{$t('Uploader')}}</th>
        </tr>
      </thead>

      <tbody ref="body" @scroll="scroll_event($event)">
        <tr class="torrent" v-for="t in torrents" @click.stop="go_torrent(t)">
          <td>{{t.publish_time | date_format }}</td>
          <td>
            <span class="label">{{t.category_tag|locale}}</span>

            <router-link class="rin-team rin-inline-tag haspic" :to="`/team/${t.team._id}`" v-if="t.team" v-show="!hide_team_name">
              <img v-if="t.team.icon" v-bind:src="teamIconUrl + t.team.icon" alt="" />
              <img src="../assets/akarin.jpg" v-if="!t.team.icon" />
              <span>{{t.team.tag|locale}}</span>
            </router-link>

            <!--<router-link class="torrent-name" :to="{name: 'torrent', params: {key: t._id}}">-->
            <span>{{t.title}}</span>
            <!--</router-link>-->

            <a class="rin-download" title="Torrent link" :href="t|download_url"><i class="fa fa-download"></i></a>
            <a class="rin-magnet" title="Magnet link" :href="t.magnet"><i class="fa fa-magnet"></i></a>
          </td>
          <td>
            <div class="torrent-size">
              <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{$t(((t.comments >1) ? 'Comments' :'Comment' ))}}</span>
              <span>{{t.size}}</span>
            </div>
            <div class="torrent-status">
              <a class="rin-seed-online" href="javascript:void(0)" title="种子">{{t.seeders|fixed(5)}}</a> /
              <a class="rin-seed-downloading" href="javascript:void(0)" title="下载中">{{t.leechers|fixed(5)}}</a> /
              <a class="rin-seed-downloaded" href="javascript:void(0)" title="完成">{{t.finished|fixed(5)}}</a>
            </div>
          </td>
          <td v-if="!hide_uploader">
            <router-link class="rin-inline-tag haspic" :to="`/user/${t.uploader._id}`">
              <img v-bind:src="gravatarUrl+t.uploader.emailHash" />
              <span>{{t.uploader.username}}</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div id="loader" v-show="busy">
        <rin-loader :progress="100"></rin-loader>
      </div>
    </transition>
  </div>
</template>

<script>
  import moment from 'moment';
  import RinLoader from '../components/rin-loader';
  import Vue from 'vue';

  export default {
    name: 'RinTorrentsTable',
    props: [
      'torrents', 'torrents_total',
      'hide_team_name', 'hide_uploader',
      'on_end', 'on_top', 'need_more',
      'busy', // basic flag show loadding
    ],
    components: {
      RinLoader,
    },
    data() {
      return {
        gravatarUrl: '//static.bangumi.moe/avatar/',
        teamIconUrl: '//static.bangumi.moe/',
      };
    },
    filters: {
      date_format(val) {
        const date = moment(val);
        return date.format('MM/DD HH:ss');
      },
      locale(val) {
        if (Object.keys(val.locale).length === 0) {
          return val.name;
        }

        return val.locale[Vue.config.lang];
      },
      fixed(val, num) {
        return String(`00000${val}`).slice(-1 * num);
      },
      download_url(torrent) {
        return `/download/torrent/${torrent.id}/${torrent.infoHash}.torrent`;
      },
    },
    methods: {
      is_busy() {
        return this.busy;
      },
      title_right_click(ev, torrent) {
        if (ev.which === 3) {
          window.open(`/torrent/${torrent._id}`, '_blank');
        }
      },
      resize_event() {
        const body = this.$refs.body;
        // ignore not found any body
        if (!body) {
          return;
        }

        const wrapper = this.$refs.table_wrapper;
        const header = this.$refs.header;
        body.style.height = `${wrapper.offsetHeight - header.offsetHeight}px`;
      },
      scroll_event(ev) {
        const t = this.$refs.body;
        // this.$refs.header.style.top = `${t.scrollTop}px`;
        // console.log((t.scrollTop + t.offsetHeight) >= (t.scrollHeight));
        if (t.scrollTop === 0) {
          if (typeof this.on_top === 'function') {
            this.on_top(ev);
          }
        } else if ((t.scrollTop + t.offsetHeight) >= t.scrollHeight * 0.95) {
          if (typeof this.need_more === 'function') {
            this.need_more(ev);
          }
        } else if ((t.scrollTop + t.offsetHeight) >= t.scrollHeight) {
          if (typeof this.on_end === 'function') {
            this.on_end(ev);
          }
        }
      },
      go_torrent(torrent) {
        this.$router.push({
          name: 'torrent',
          params: { key: torrent._id },
        });
      },
    },
    mounted() {
      setInterval(() => {
        this.resize_event();
      }, 2000);
    },
  };

</script>
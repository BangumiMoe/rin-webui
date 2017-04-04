<style scoped lang="less">
@import "../less/colors.less";
@import '../less/framework.less';

@table_body_height: 300px;
@column_one_width: 7rem;
@column_two_width: 5rem;
@column_three_width: 128rem;
@column_four_width: 5rem;
@column_five_width: 10rem;
@column_six_width: 10rem;
@column_seven_width: 10rem;

// @alternate_row_background_color: @color-primary-3;

.rin-table-wrapper {
  height: 100%;
  display: block;
  position: relative;
}

#loader {
  height: 256px;
}

a:hover {
  text-shadow: 1px 1px rgba(99, 99, 99, 0.6);
}

.rin-team-title {
  color: black;
}

.rin-table {
  width: 100%;
  padding: 0;
  margin: 0;
  table-layout: fixed;
  border-collapse: collapse;

  td:nth-child(1), th:nth-child(1) {
    min-width: @column_one_width;
    text-align: center;
  }
  td:nth-child(2), th:nth-child(2) {
    min-width: @column_two_width;
    text-align: center;
  }
  td:nth-child(3), th:nth-child(3) {
    width: @column_three_width;
  }
  td:nth-child(4), th:nth-child(4) {
    min-width: @column_four_width;
    text-align: right;
  }
  td:nth-child(5), th:nth-child(5) {
    min-width: @column_five_width;
    text-align: right;
  }
  td:nth-child(6), th:nth-child(6) {
    min-width: @column_six_width;
    text-align: center;
  }
  th:nth-child(6) {
    min-width: @column_six_width + 2rem; // add scroll bar width
  }
  td:nth-child(7), th:nth-child(7) {
    min-width: @column_seven_width;
    text-align: left;
  }
  th:nth-child(7) {
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
        <th>{{$t('Category')}}</th>
        <th>{{$t('Title')}}
          <span v-if="torrents_total">({{torrents.length}}/{{torrents_total}})</span>
        </th>
        <th>&nbsp;</th>
        <th>{{$t('Size')}}</th>
        <th>&nbsp;</th>
        <th v-if="!hide_uploader">{{$t('Uploader')}}</th>
      </tr>
    </thead>

    <tbody ref="body" @scroll="scroll_event($event)">
      <tr v-for="t in torrents">
        <td>{{t.publish_time | date_format }}</td>
        <td><strong>{{t.category_tag|locale}}</strong></td>
        <td>
          <router-link tag="div" class="container" :to="`/torrent/${t._id}`" @mouseup.stop="title_right_click($event, t)" v-if="t">
            <router-link class="rin-team rin-inline-tag haspic" :to="`/team/${t.team._id}`" v-if="t.team" v-show="!hide_team_name">
              <img v-if="t.team.icon" v-bind:src="teamIconUrl + t.team.icon" alt="" />
              <img src="../assets/akarin.jpg" v-if="!t.team.icon" />
              <span>{{t.team.tag|locale}}</span>
            </router-link>

            <a class="rin-team-title" target="_blank" v-if="t">{{t.title}}</a>
            <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{$t(((t.comments >1) ? 'Comments' :'Comment' ))}}</span>
          </router-link>
        </td>
        <td>
          <a class="rin-download" title="Torrent link" :href="t.magnet"><i class="fa fa-download"></i></a>
          <a class="rin-magnet" title="Magnet link" :href="t.magnet"><i class="fa fa-magnet"></i></a>
        </td>
        <td>{{t.size}}</td>
        <td>
          <a class="rin-seed-online" href="javascript:void(0)" title="种子">{{t.seeders}}</a> /
          <a class="rin-seed-downloading" href="javascript:void(0)" title="下载中">{{t.leechers}}</a> /
          <a class="rin-seed-downloaded" href="javascript:void(0)" title="完成">{{t.finished}}</a>
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

  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
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
      gravatarUrl: '//bangumi.moe/avatar/',
      teamIconUrl: '//bangumi.moe/',
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
        // this.resize_event();
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
  },
  created() {
    // let id = null;
    // const self = this;
    // window.addEventListener('resize', () => {
    //   if (id != null) {
    //     clearTimeout(id);
    //     id = null;
    //     return;
    //   }
    //   id = setTimeout(() => {
    //     self.resize_event();
    //     id = null;
    //   }, 100);
    // });
  },
  mounted() {
    setInterval(() => {
      this.resize_event();
    }, 2000);
  },
};
</script>
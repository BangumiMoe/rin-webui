<template>
  <div class="index">

    <div class="torrents" :class="{'list-mode': true}">
      <div class="torrent grid-x" v-for="torrent in torrents" :key="torrent.id">

        <div class="cell categroy">
          <span class="label">{{torrent.tag ? torrent.tag.getDisplay() : "Unkown"}}</span>
        </div>

        <div class="cell auto title">
          <div>
            <a :href="torrent.magnet" v-if="torrent.magnet"><i class="fa fa-magnet"></i></a>

            <span>
              <i class="fa-comments" :class="{fa: torrent.countInfo.comments, far: torrent.countInfo.comments===0}"></i>
              <span v-if="torrent.countInfo.comments">{{torrent.countInfo.comments}}</span>
            </span>

            <span>{{torrent.getTitle()}}</span>
          </div>

          <div class="file-info">
            <nav role="navigation">
              <ul class="breadcrumbs">
                <li><span>Size: {{torrent.size}}</span></li>
                <li><span>Seeders: {{torrent.countInfo.seeders}}</span></li>
                <li><span>Downloads: {{torrent.countInfo.downloads}}</span></li>
                <li><span>Finished: {{torrent.countInfo.finished}}</span></li>
                <li><span>Leechers: {{torrent.countInfo.leechers}}</span></li>

                <li><span>Publish At: {{torrent.publishDate|date}}</span></li>
              </ul>
            </nav>
          </div>

          
        </div>

        <div class="cell uploader">
          <UploaderLink :uploader="torrent.uploader"></UploaderLink>
          <TeamLink :team="torrent.team" v-show="torrent.team"></TeamLink>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { Torrent } from "@/modules/torrent";

import UploaderLink from "@/components/UploaderLink";
import TeamLink from "@/components/TeamLink";

export default {
  name: "Index",
  components: { UploaderLink, TeamLink },
  data() {
    return {
      Torrent,
      pageNum: 1,
      pageCount: 0,
      pageTorrents: [],

      busy: false
    };
  },

  methods: {
    handleIndexScroll(ev) {
      const y1 = ev.target.scrollTop;
      const y2 = ev.target.scrollHeight - ev.target.clientHeight;

      // console.log(y1, y2);

      // TODO item height
      if (y2 - y1 < 52 * 4) {
        if (this.busy) {
          return;
        }

        this.busy = true;

        let pageNum = this.pageNum + 1;
        if (pageNum >= this.pageCount) {
          console.warn(`[Index.handleIndexScroll]all page is loaded:${pageNum} === ${this.pageCount}`);
          return;
        }

        Torrent.manager.fetchPage(pageNum).then(pageData => {
          // FIXME refresh when count changed
          this.pageCount = pageData.count;

          this.pageNum = pageData.num;

          this.pageTorrents.push(...pageData.torrents);

          this.busy = false;
        });
      }
    }
  },

  umounted() {
    const indexElm = document.getElementsByClassName("index")[0];
    indexElm.removeEventListener("scroll");
  },

  mounted() {
    const indexElm = document.getElementsByClassName("index")[0];
    indexElm.addEventListener("scroll", this.handleIndexScroll);

    Torrent.manager.fetchPage(this.pageNum).then(pageData => {
      this.pageNum = pageData.num;
      this.pageCount = pageData.count;

      this.pageTorrents.splice(0);
      this.pageTorrents.push(...pageData.torrents);
    });
  },

  computed: {
    torrents() {
      return this.pageTorrents;
    }
  },

  filters: {
    date(value) {
      if (!value) return "";

      return value.toLocaleString();
    }
  }
};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Audiowide");
@import "../assets/color.less";

@item_height: 52px;

.index {
  overflow-y: scroll; // TODO support mobile device

  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 .3rem @color-5;
    background-color: @color-4 - #060606;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: @color-5;
  }

  .list-mode {
    .torrent {
      &:nth-child(even) {
        background: #ffffff;
      }
      &:nth-child(odd) {
        background: #f3f3f3;
      }

      .cell {
        height: @item_height;
        line-height: @item_height;
        overflow: hidden;

        &.categroy {
          overflow: hidden;
          width: 7rem;
          text-align: center;

          .label {
            width: 5.6rem;
          }
        }

        &.uploader {
          width: 8.5rem;
          line-height: @item_height * 0.5;

          a {
            float: left;
          }
        }

        &.title {
          font-size: round(@item_height * 0.25);
          line-height: @item_height * 0.68;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .file-info {
            margin-top: -0.3rem;
            height: @item_height * 0.28;
            line-height: @item_height * 0.28;

            .breadcrumbs {
              margin: 0;
            }

            span {
              font-size: @item_height * 0.2;
              color: #5e5e5e;
            }
          }
        }

        &.team {
          width: 8.5rem;
        }
      }
    }
  }
}
</style>

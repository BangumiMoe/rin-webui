<template>
  <div class="index">

    <div class="torrents" :class="{'list-mode': true}">
      <div class="torrent grid-x" v-for="torrent in torrents" :key="torrent.id">

        <div class="cell categroy">
          <span class="label">{{torrent.tag ? torrent.tag.getDisplay() : "Unkown"}}</span>
        </div>

        <!-- <div class="cell file-info">

          <div>
            {{torrent.countInfo.leechers}} 
            {{torrent.countInfo.seeders}}
            {{torrent.countInfo.downloads}}
            {{torrent.countInfo.finished}}
          </div>
          <div>{{torrent.size}}</div>

        </div> -->
        
        <div class="cell auto title">
          <div>{{torrent.getTitle()}}</div>

          <div class="file-info">

            <nav aria-label="You are here:" role="navigation">
              <ul class="breadcrumbs">
                <li><span>Size: {{torrent.size}}</span></li>
                <li><span>Seeders: {{torrent.countInfo.seeders}}</span></li>
                <li><span>Downloads: {{torrent.countInfo.downloads}}</span></li>
                <li><span>Finished: {{torrent.countInfo.finished}}</span></li>
                <li><span>Leechers: {{torrent.countInfo.leechers}}</span></li>
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
      pageTorrents: []
    };
  },
  mounted() {
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
  }
};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Audiowide");
@import "../assets/color.less";

@item_height: 52px;

.index {
  overflow: auto;

  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 .3rem @color-5;
    background-color: @color-4 - #060606;
  }

  &::-webkit-scrollbar {
    width: .5rem;
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
        line-height: @item_height;

        &.categroy {
          overflow: hidden;
          width: 7rem;
          text-align: center;

          .label {
            width: 5.6rem;
          }
        }

        // &.file-info {
        //   font-family: "Audiowide", cursive;
        //   font-size: 10px;
        //   width: 10rem;
        //   text-align: center;

        //   line-height: 10px;
        //   padding: 1px;
        // }

        &.uploader {
          width: 8.5rem;
          line-height: @item_height * 0.5;
        }

        &.title {
          font-size: round(@item_height * 0.25);
          line-height: @item_height * 0.68;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .file-info {
            margin-top: -0.3rem;
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

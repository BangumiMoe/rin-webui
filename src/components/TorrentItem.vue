<template>
    <div class="torrent grid-x">

        <div class="cell categroy">
            <span class="label">{{torrent.tag ? torrent.tag.getDisplay() : "Unkown"}}</span>
        </div>

        <div class="cell auto title">
          <div class="title-main">
            <a :href="torrent.magnet" v-if="torrent.magnet"><i class="fa fa-magnet"></i></a>

            <span class="comments">
                <i class="fa-comments" :class="{fa: torrent.countInfo.comments, far: torrent.countInfo.comments===0}"></i>
                <span v-if="torrent.countInfo.comments">{{torrent.countInfo.comments}}</span>
            </span>

            <span class="title-string">{{torrent.getTitle()}}</span>
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
            <UploaderLink :uploader="torrent.uploader" @click="searchTeam(torrent.uploader)"></UploaderLink>
            <TeamLink :team="torrent.team" v-show="torrent.team"></TeamLink>
        </div>

    </div>  
</template>

<script>
import { Torrent } from "@/modules/torrent";

import UploaderLink from "@/components/UploaderLink";
import TeamLink from "@/components/TeamLink";

export default {
  name: "TorrentItem",
  props: ["torrent"],
  components: { UploaderLink, TeamLink },
  data() {
    return { Torrent };
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

      // a {
      //   float: left;
      // }
    }

    &.title {
      font-size: round(@item_height * 0.25);
      line-height: @item_height * 0.68;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .title-main {
        a {
          margin-right: .6rem;
        }

        .comments {
          margin-right: .6rem;
        }
      }

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
</style>

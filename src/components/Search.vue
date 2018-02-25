<template>
  <div class="search">
    <div class="torrents" :class="{'list-mode': true}">
      <TorrentItem :torrent="torrent" v-for="torrent in torrents" :key="torrent.id"></TorrentItem>
    </div>
  </div>
</template>

<script>
import { Torrent } from "@/modules/torrent";

import TorrentItem from "@/components/TorrentItem";

export default {
  name: "Search",
  components: { TorrentItem },
  data() {
    return {
      Torrent,

      query: "",
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
          console.warn(
            `[Index.handleIndexScroll]all page is loaded:${pageNum} === ${
              this.pageCount
            }`
          );
          return;
        }

        Torrent.manager.searchPage(this.query, pageNum).then(pageData => {
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
    const indexElm = document.getElementsByClassName("search")[0];
    indexElm.removeEventListener("scroll");
  },

  mounted() {
    const indexElm = document.getElementsByClassName("search")[0];
    indexElm.addEventListener("scroll", this.handleIndexScroll);

    this.query = this.$route.params.query;

    Torrent.manager
      .searchPage(this.query, this.pageNum)
      .then(pageData => {
        this.pageNum = pageData.num;
        this.pageCount = pageData.count;

        this.pageTorrents.splice(0);
        this.pageTorrents.push(...pageData.torrents);
      })
      .catch(() => {
        // TODO refresh page when needed?
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
  },

  watch: {
    "$route.params.query"(query) {
      this.pageNum = 1;
      this.query = query;

      Torrent.manager
        .searchPage(this.query, this.pageNum)
        .then(pageData => {
          this.pageNum = pageData.num;
          this.pageCount = pageData.count;

          this.pageTorrents.splice(0);
          this.pageTorrents.push(...pageData.torrents);
        })
        .catch(() => {
          // TODO refresh page when needed?
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Audiowide");
@import "../assets/color.less";

@item_height: 52px;

.search {
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: @color-4 - #060606;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: @color-5;
  }
}
</style>

<template>
  <div class="index">
    <div class="torrents" :class="{'list-mode': true}">
      <TorrentItem :torrent="torrent" v-for="torrent in torrents" :key="torrent.id"></TorrentItem>
    </div>
  </div>
</template>

<script>
import { Torrent } from "@/modules/torrent";

import TorrentItem from "@/components/TorrentItem";

export default {
  name: "Index",
  components: { TorrentItem },
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
          console.warn(
            `[Index.handleIndexScroll]all page is loaded:${pageNum} === ${
              this.pageCount
            }`
          );
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
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      Torrent.manager.fetchPage(vm.pageNum).then(pageData => {
        vm.pageNum = pageData.num;
        vm.pageCount = pageData.count;

        vm.pageTorrents.splice(0);
        vm.pageTorrents.push(...pageData.torrents);
      });
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
}
</style>

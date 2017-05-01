<style scoped lang="less">
  @import "../less/colors.less";
  @import "../less/framework.less";
  #rin-main {
    height: 100%;
    overflow: hidden;
    .rin-wrapper {
      height: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
</style>

<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);">
    <div id="rin-wrapper" class="rin-wrapper" transition="rin-fade">
      <rin-torrents-table :torrents="torrents.data" :torrents_total="torrents.total" :busy="busy" :need_more="fetch_next_torrents"></rin-torrents-table>
    </div>
  </div>
</template>

<script>
  import RinTorrentsTable from '../components/rin-torrents-table';

  export default {
    name: 'Main',
    data() {
      return {
        init: true,
        busy: true,
        progress: 15,
        torrents: {
          data: [],
          total: 1,
          offset: 0,
        },
        searchKey: null,
      };
    },
    methods: {
      fetch_next_torrents() {
        if (this.busy) return;
        this.torrents.offset++;
        this.getTorrents(this.torrents.offset);
      },
      getTorrents(offset, limit = 100) {
        if (this.init) {
          this.init = false;
        } else {
          if (this.busy) return;
        }

        this.busy = true;

        this.$http.get(`https://bangumi.moe/api/v2/torrent/page/${offset}?limit=${limit}`).then(
          resp => {
            const data = resp.data;
            this.torrents.total = data.page_count * limit;
            this.torrents.data.push(...data.torrents);
            this.torrents.offset++;
            this.progress = 100;
            window.setTimeout(() => {
              this.busy = false;
              this.progress = 50;
            }, 1900);
          });
      },
      // doSearch(key) {
      //   this.searchKey = key;
      //   this.busy = true;
      //   this.$http.get('https://bangumi.moe/api/v2/torrent/search', {
      //     limit: 50,
      //     p: this.currentPage,
      //     query: key,
      //   }).then(data => {
      //     if (this.torrent.lastest.length === 0) {
      //       this.lastestPage = this.originPage = this.currentPage;
      //     }
      //     if (this.lastestPage < this.currentPage) {
      //       this.lastestPage = this.currentPage;
      //     }
      //     if (this.originPage > this.currentPage) {
      //       this.originPage = this.currentPage;
      //     }
      //     // if (addDirection){
      //     //   this.torrent.lastest = this.torrent.lastest.concat(data.torrents) ;
      //     // }else{
      //     this.torrent.lastest = data.torrents.concat(this.torrent.lastest);
      //     // }
      //     this.torrent.pageNum = data.page_count;
      //     this.busy = false;
      //   });
      // },
    },
    components: { RinTorrentsTable },
    mounted() {
      this.getTorrents(0);
      console.info('[Main]loaded');
    },
  };

</script>
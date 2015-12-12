<style lang="less">
@import "../less/colors.less";
#rin-main {
  height: 100%;
  overflow: hidden;

  .rin-list {
    li {
      height: 3em;
      line-height: 3em;
      border-bottom: 1px solid @color-secondary-1-4;
    }
  }

  .rin-wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>

<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);" v-bind:class="{'modal-blur':modalBlur}">
    <div is="rin-loader" v-if="busy" :progress="progress" transition="rin-fade"></div>
    <div class="rin-wrapper" v-if="!busy" transition="rin-fade">
        <ul class="rin-list">
          <li v-for="(index, t) in torrent.lastest">

            <div class="rin-row">

              <div class="rin-col rin-col-1 rin-center">
                {{ index }}
              </div>
              <div class="rin-col rin-col-11">
                <a v-bind:href="t.magnet">{{ t.title }}</a>
              </div>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import RLoader from '../components/rin-loader';
  
  export default {
    data () {
      return {
        busy: true,
        torrent: {
          lastest: []
        },
        modalBlur:false
      }
    },
    methods: {
      update_lastest_torrents: function() {
        let self = this;
        this.$http.get('https://bangumi.moe/api/torrent/latest', null, function(data) {
          self.torrent.lastest = data.torrents;

          setTimeout(function() {
            self.busy = false;
          }, 2000);
        });
      }
    },
    ready: function() {
      this.update_lastest_torrents();
    },
    components: {
      'rin-loader': RLoader
    },
    events:{
      "open-modal-blur":function(){
        this.modalBlur=true;
      },
      "close-modal-blur":function(){
        this.modalBlur=false;
      }
    }

  };
</script>

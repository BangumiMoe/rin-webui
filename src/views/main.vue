<style lang="less">
@import "../less/colors.less";
#rin-main {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  
  .rin-list {
    
    li {
      height: 3em;
      line-height: 3em;
      border-bottom: 1px solid @color-secondary-1-4;
    }
  }
}
</style>

<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);">
    <rin-loader></rin-loader>

    <div>
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
  export default {
    data () {
      return {
        torrent: {
          lastest: []
        }  
      }
    },
    methods: {
      update_lastest_torrents: function() {
        var scope = this;
        
        $.getJSON('https://bangumi.moe/api/torrent/latest', null, function(data) {
          scope.torrent.lastest = data.torrents;
        });
      }
    },
    ready: function() {
      this.update_lastest_torrents();
    },
    components: {
      'rin-loader':require('../components/rin-loader')
    }
      
  };
</script>

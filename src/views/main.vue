<style scoped lang="less">
@import "../less/colors.less";
#rin-main {
  height: 100%;
  overflow: hidden;
  .page-nav{
    width: calc(~'100% - 128px');
    right:143px;
    height: 50px;
    position: fixed;
    top:0;
    text-align: center;
    line-height: 50px;
    font-size: 1.2em;

    .page-nav-inner{
      width:100%;
      float: right;
      /*box-shadow: #333 1px 1px 15px;*/
      transition: width .5s;
    }
    .page-nav-short{
      width: 60%;
    }
    .page-nav-btn{
      cursor: pointer;
      color: @color-secondary-1-1;
      transition: font-size .2s;
    }
    .page-nav-btn.btn-up{
      background-color: @color-complement-3;
    }
    .page-nav-btn.btn-up-first{
      background-color: @color-complement-4;
    }
    .page-nav-num{
      color: @color-secondary-2-4;
    }
    .page-nav-num.cur{
      color: @color-secondary-1-3;
      background-color: @color-secondary-1-2 !important;
      cursor:default;
    }
    .page-nav-num{
      background-color: @color-complement-2;
    }
    .page-nav-num:nth-child(odd){
      background-color: @color-complement-2;
    }
    .page-nav-btn:not(.cur):hover{
      font-size:1.5em;
    }
    .page-nav-btn.btn-down{
      background-color: @color-complement-3;
    }
    .page-nav-btn.btn-down-last{
      background-color: @color-complement-4;
    }
  }

  .rin-list {
    li {
      height: 3em;
      line-height: 3em;
      border-bottom: 1px solid @color-secondary-1-4;
    }
  }

  .rin-wrapper {
    height: calc(~'100% - 50px');
    overflow-x: hidden;
    overflow-y: scroll;
    padding-top:50px;
    table.rin-main-table{
      tr{
        border-bottom: @color-secondary-1-3 1px solid;
        background-color: @color-secondary-1-2;
        font-size:0.9em;
        td{
          line-height: 170%;
          padding:5px 0;
          text-align: center;
          
          .rin-magnet {
            color: @color-primary-4;
          }
        }
      }
      .rin-main-table-tr:nth-child(odd){
        background-color: @color-secondary-1-1;
      }
      .rin-main-table-tr:hover{
        color: @color-secondary-1-2;
        background-color: @color-secondary-1-4;
        
        .rin-magnet {
          color: @color-primary-2;
        }
      }
      .rin-main-table-tr{
        transition: all .2s;
      }
      th{
        text-align: center;
        font-size: 1.2em;
        padding: 8px 0;
      }
    }
  }
}
</style>

<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);" v-bind:class="{'modal-blur':modalBlur}">
    <div is="rin-loader" v-if="busy" :progress="progress" transition="rin-fade"></div>
    <div  class="rin-wrapper" v-show="!busy" transition="rin-fade" v-on:scroll="checkPageNav">
      <div class="page-nav clearfix" >
        <div  class="rin-row page-nav-inner" v-bind:class={'page-nav-short':short}>
          <div class="page-nav-btn btn-up-first rin-col-2" v-on:click="chgPage(1-currentPage)" v>
            &lt;&lt;
          </div>
          <div class="page-nav-btn btn-up rin-col-2" v-on:click="chgPage(-1)" v>
            &lt;
          </div>
            <div  v-for="(index,page) in getPageNavNum(5)" v-bind:class="{'cur':page.offset == 0}" class="rin-col-2  page-nav-btn page-nav-num" v-on:click="chgPage(page.offset)" >
              {{page.show}}
            </div>
          <div class="page-nav-btn btn-down rin-col-2" v-on:click="chgPage(+1)">
            &gt;
          </div>
          <div class="page-nav-btn btn-down-last rin-col-2" v-on:click="chgPage(torrent.pageNum-currentPage)">
            &gt;&gt;

          </div>
        </div>


      </div>
          <table id="rin-main-table" style="width:100%;"  class="rin-main-table" cellpadding="0" cellspacing="1" border="0" width="" frame="void">
          	<thead>
          		<tr>
          			<th width="110"><span class="title">发布时间</th>
          			<th width="5%"><span class="title">分类</span></th>
          			<th ><span class="title">标题</span></th>
          			<th width="4%" nowrap="nowrap"><span class="title">磁力链接</span></th>
          			<th width="7%"><span class="title">大小</span></th>
          			<th width="5%"><span class="title">种子</span></th>
          			<th width="5%"><span class="title">下载</span></th>
          			<th width="5%"><span class="title">完成</span></th>
          			<th width="9%"><span class="title">发布者</span></th>
          		</tr>
          	</thead>
          	<tbody>
              <tr v-for="(index, t) in torrent.lastest" class="rin-main-table-tr">
                <td width="110" style="font-size:12px;">{{t.publish_time | date 'yyyy/MM/dd HH:mm'}}</td>
          			<td width="6%" align="center">{{t.category_tag.locale.zh_cn}}</td>
          			<td class="title"  style="text-align:left;">
          				<a target="_blank" >{{t.title}}</a>
                </td>
          			<td nowrap="nowrap" align="center">
                  <a class="rin-magnet" title="磁力下載" href="{{t.magnet}}">️
                    <i class="material-icons">&#xE2C4;</i>
                  </a>️
                </td>
          			<td nowrap="nowrap" align="center">{{t.size}}</td>
          			<td nowrap="nowrap" align="center">{{t.seeders}}</td>
          			<td nowrap="nowrap" align="center">{{t.leechers}}</td>
          			<td nowrap="nowrap" align="center">{{t.finished}}</td>
          			<td align="center">{{t.uploader.username}}</td>

              </tr>
            </tbody>
          </table>
    </div>
  </div>
</template>

<script>
  import RLoader from '../components/rin-loader';

  export default {
    data () {
      return {
        busy: true,
        currentPage:1,
        short:false,
        torrent: {
          lastest: [],
          pageNum:0,
        },
        modalBlur:false
      }
    },
    methods: {
      getTorrents: function() {
        let self = this;
        self.busy=true;
        this.$http.get('https://bangumi.moe/api/v2/torrent/page/'+self.currentPage, null, function(data) {
          self.torrent.lastest = data.torrents;
          self.torrent.pageNum=data.page_count;
          self.busy=false;
//          setTimeout(function() {
//            self.busy = false;
//          }, 2000);
        });
      },
      chgPage:function(offset){
        if (!offset) return;
        let self=this;
        if ((self.currentPage+offset>=1)&&(self.currentPage+offset<=self.torrent.pageNum)){
          self.currentPage+=offset;
          self.getTorrents();
        }
        self.getPageNavNum(20);
      },
      getPageNavNum:function(length){
        if (!length) return;
        let self=this;
        var me=parseInt(length/2),start=0;
        if (self.currentPage-me<1){
          start=1;
        }else if (self.currentPage+me>self.torrent.pageNum){
          start=self.torrent.pageNum-length+1;
        }else{
          start=this.currentPage-me;
        }
        var rst=[];
        for (var i=0;i<length;i++){
          rst.push({show:start+i,offset:start+i-self.currentPage});
        }
        return rst;
      },
      checkPageNav:function(e){
        //console.log(e);
        if (e.target.scrollTop>50 ){
          if (!this.short){
            this.short=true;
          }
        }else{
          if (this.short){
            this.short=false;
          }
        }
      }
    },
    ready: function() {
      this.getTorrents();
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
    },
    filters: {
       'date':require('../filters/dateFormat.js')
   }

  };
</script>

<style scoped lang="less">
  @import "../less/colors.less";


  #rin-main {
    height: 100%;
    overflow: hidden;

    .loader-down{
      position: relative;
      height: 100px;
    }

    .page-nav{
      width: 250px;
      right: 190px;
      height: 40px;
      position: fixed;
      bottom:40px;
      text-align: center;
      line-height: 40px;
      font-size: 1.2em;
      box-shadow: 1px 1px 25px 1px #DC7788;
      border-radius: 5px;
      overflow: hidden;

      .page-nav-inner{
        width:100%;
        float: right;
        transition: width .5s;
      }


      .page-nav-btn{
        cursor: pointer;
        color: white;
        transition: background-color .2s;

        i { line-height: 40px; transition: font-size .2s }

        &.btn-up{ background-color: @color-primary-2 }
        &.btn-up-first{ background-color: @color-primary-2 }
        &:not(.disabled):hover{
          background-color: @color-primary-3;

          i{ font-size:2em; }
        }

        &.btn-down{ background-color: @color-primary-2; }
        &.btn-down-last{ background-color: @color-primary-2; }
      }

      .page-nav-num{color: @color-primary-0; }
      .page-nav-num.cur{
        color: @color-secondary-1-3;
        background-color: @color-secondary-1-2 !important;
        cursor:default;
      }
      .page-nav-num{
        background-color: @color-primary-1;
        font-size: 0.9em;
      }
      .page-nav-num:nth-child(odd){
        background-color: @color-primary-2;
      }
      .disabled{ cursor: default; }
    }

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

      table.rin-main-table {
        table-layout: fixed;
        font-size:0.9em;

        thead {
          color: @color-th;
          background-color: @color-th-bg;
          th {font-weight: 400}
        }

        tbody {
           padding-top:33px;
        }
        tbody tr {
          cursor: pointer;
          transition: all .2s;

          td {
            line-height: 170%;
            padding:5px 0;
            text-align: center;

            span.rin-table-comments{
              color: gray;
              font-size: 12px;
              padding-left: 5px;
            }

            i{ line-height: 170%; }

            .rin-magnet {
              color: @color-primary-4;
              transition: all .2s;
              &:hover{
                color: @color-primary-3;
              }
            }

            &.rin-seed-stats{
              color:#d4d4d4;
            }
            .rin-seed-online { color: #5c5594 }
            .rin-seed-downloading { color: #458ac6 }
            .rin-seed-downloaded { color: #00c4bc }
          }

          td.rin-uploader{
            text-align: left;

            >a{
              white-space: nowrap;
            }

            .uploader-avatar{
              width: 20px;
              height: 20px;
              vertical-align: top;
              padding-right:2px;
            }
            span{
              display: inline-block;
              /* width: calc(~'100% - 25px'); */
            }
          }
          &:nth-child(odd) {
            background-color: @color-tr-odd;
          }
          &:hover{
            background-color: @color-tr-hover;

            .rin-inline-tag {
              color: @color-inline-tag-hover;
              background-color: @color-inline-tag-bg-hover;
            }
          }
        }
        th{
          text-align: center;
          padding: 8px 0;
        }
      }
    }
    .table-title-fixed {
      width: calc(~'100% - 128px');
      position: fixed;
      top:0;
      opacity: 0;
      text-align: center;
      th{
        text-align: center;
      }
      transition: opacity 1s;
    }
    .fixed-show{ opacity: 0.9 }
  }
  .no-data{
    text-align: center;
    color: #999;
    margin: 2em 0;
  }
</style>
<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);" v-bind:class="{'modal-blur':modalBlur}">
    <div is="rin-loader" v-if="busy && !nextBusy && !prevBusy" transition="rin-fade"></div>
    <div  id="rin-wrapper" class="rin-wrapper" v-show="!busy || nextBusy || prevBusy" transition="rin-fade" v-on:scroll='scrollHandler'>
      <!--
      <div class="page-nav clearfix">
        <div  class="rin-row page-nav-inner" >
          <a class="page-nav-btn btn-down-last rin-col-2" href="https://bangumi.moe/rss/latest" target="_blank">
          <i class="material-icons" style="transform: rotate(45deg);padding-top: 1px;padding-left: 1px;">&#xE63E;</i>
          </a>
          <a class="page-nav-btn btn-up-first rin-col-2" v-on:click="chgPage(1-currentPage)" v-bind:class="{'disabled':1-currentPage==0}">
          <i class="material-icons">&#xE020;</i>
          </a>
          <a class="page-nav-btn btn-up rin-col-2" v-on:click="chgPage(-1)" v-bind:class="{'disabled':currentPage==1}">
          <i class="material-icons">&#xE314;</i>
          </a>
          <a class="cur rin-col-4  page-nav-btn page-nav-num"> {{currentPage}}</a>
          <a class="page-nav-btn btn-down rin-col-2" v-on:click="chgPage(+1)" v-bind:class="{'disabled':currentPage==torrent.pageNum}">
          <i class="material-icons">&#xE315;</i>
          </a>
        </div>
      </div>
    -->
    <div class='loader-down' v-if='prevBusy'>
      <div is="rin-loader" v-if='prevBusy' transition="rin-fade"></div>
    </div>
      <table id="rin-main-table" style="width:100%;"  class="rin-main-table" cellpadding="0" cellspacing="1" border="0" width="" frame="void">
        <thead style="opacity:0;">
          <tr>
            <th width="90"><span class="title">{{'Uploaded time'|locale}}</th>
            <th width="7%"><span class="title">{{'Category'|locale}}</span></th>
            <th><span class="title">{{'Title'|locale}}</span></th>
            <th width="5%" nowrap="nowrap"><span class="title">{{'magnet'|locale}}</span></th>
            <th width="7%"><span class="title">{{'Size'|locale}}</span></th>
            <th width="10%"><span class="title">{{'Seed stat'|locale}}</span></th>
            <th width="9%"><span class="title">{{'Uploader'|locale}}</span></th>
          </tr>
        </thead>
        <tbody v-infinite-scroll="alert()">
          <tr v-for="(index, t) in torrent.lastest"  v-on:click="goTorrent(t._id, $event)">
            <td style="font-size:12px;">{{t.publish_time | date 'lately HH:mm'}}</td>
            <td align="center">
              <div class="rin-inline-tag">
                <span>{{t.category_tag|locale}}</span>
              </div>
            </td>
            <td class="title"  style="text-align:left;">
              <a class="rin-team rin-inline-tag haspic" v-link="'/team/' + t.team._id" v-if="t.team">
                <img  v-if="t.team.icon" v-bind:src="teamIconBaseUrl+t.team.icon" alt="" />
                <img  src="../assets/akarin.jpg" v-if="!t.team.icon"/>
                <span>{{t.team.tag | locale}}</span>
              </a>
              <a target="_blank">{{t.title}}</a>
              <span class="rin-table-comments" v-if='t.comments'>{{t.comments}} {{ ((t.comments >1) ? 'Comments' :'Comment' )| locale }}</span>
            </td>
            <td nowrap="nowrap" align="center">
              <a class="rin-magnet" title="磁力下載" href="{{t.magnet}}{{magnentt}}" @click.stop><i class="material-icons">&#xE2C4;</i></a>
            </td>
            <td nowrap="nowrap" align="center">{{t.size}}</td>
            <td nowrap="nowrap" align="center" class="rin-seed-stats">
              <a class="rin-seed-online" href="javascript:void(0)" title="种子">{{t.seeders}}</a> /
              <a class="rin-seed-downloading" href="javascript:void(0)" title="下载中">{{t.leechers}}</a> /
              <a class="rin-seed-downloaded" href="javascript:void(0)" title="完成">{{t.finished}}</a>
            </td>
            <td class="rin-uploader">
              <a v-link="'/user/' + t.uploader._id" class='rin-inline-tag haspic'>
                <img  v-bind:src="gravatarUrl+t.uploader.emailHash" alt="" />
                <span>{{t.uploader.username}}</span>
              </a>
            </td>
          </tr>

        </tbody>

      </table>
      <div class="table-title-fixed fixed-show" style="width:calc(100% - {{getScrollWidth()+128}}px)">
        <table id="rin-main-table" style="width:100%;"  class="rin-main-table" cellpadding="0" cellspacing="1" border="0" width="" frame="void">
          <thead>
            <tr>
              <th width="90"><span class="title">{{'Uploaded time'|locale}}</th>
              <th width="7%"><span class="title">{{'Category'|locale}}</span></th>
              <th  ><span class="title">{{'Title'|locale}}</span></th>
              <th width="5%" nowrap="nowrap"><span class="title">{{'magnet'|locale}}</span></th>
              <th width="7%"><span class="title">{{'Size'|locale}}</span></th>
              <th width="10%"><span class="title">{{'Seed stat'|locale}}</span></th>
              <th width="9%"><span class="title">{{'Uploader'|locale}}</span></th>
            </tr>
          </thead>
        </table>

      </div>
      <div class='loader-down' v-if='nextBusy'>
        <div is="rin-loader" v-if='nextBusy' transition="rin-fade"></div>
      </div>
      <div class="no-data" v-show="torrent.lastest.length == 0">
        没有更多数据了╮(╯_╰)╭
      </div>
    </div>
  </div>
</template>
<script>
  import RLoader from '../components/rin-loader';

  export default {
    data () {
      return {
        magnentt: '&tr=https%3A%2F%2Ftr.bangumi.moe%3A9696%2Fannounce&tr=http%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=udp%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=http%3A%2F%2Fopen.acgtracker.com%3A1096%2Fannounce&tr=http%3A%2F%2F208.67.16.113%3A8000%2Fannounce&tr=udp%3A%2F%2F208.67.16.113%3A8000%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A6868%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A7070%2Fannounce&tr=http%3A%2F%2Ft2.popgo.org%3A7456%2Fannonce&tr=http%3A%2F%2Fbt.sc-ol.com%3A2710%2Fannounce&tr=http%3A%2F%2Fshare.camoe.cn%3A8080%2Fannounce&tr=http%3A%2F%2F61.154.116.205%3A8000%2Fannounce&tr=http%3A%2F%2Fbt.rghost.net%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.prq.to%2Fannounce&tr=http%3A%2F%2Fopen.nyaatorrents.info%3A6544%2Fannounce',
        busy: true,
        currentPage:1,
        originPage:0,
        lastestPage:0,
        addDirection:true,
        origionScroll:0,
        nextBusy:false,
        prevBusy:false,
        ready2Refresh:false,
        torrent: {
          lastest: [],
          pageNum:0,
        },
        modalBlur:false,
        gravatarUrl:"https://bangumi-moe.phoenixstatic.com/avatar/",
        teamIconBaseUrl:"https://bangumi-moe.phoenixstatic.com/",
        searchKey:null
      }
    },
    methods: {
      scrollHandler: function(e) {
        if (e.target.scrollHeight-e.target.clientHeight-e.target.scrollTop < 10 && !this.busy){
          this.addDirection=true;
          this.chgPage(this.lastestPage-this.currentPage+1);
          this.nextBusy=true;
        }else if(e.target.scrollTop===0 && !this.busy){
          this.prevBusy=true;
          this.addDirection=false;
          this.origionScroll=e.target.scrollHeight;
          this.chgPage(this.originPage-this.currentPage-1);
        }

      },
      getTorrents: function() {
        let self = this;
        self.busy=true;
        this.$http.get('https://bangumi.moe/api/v2/torrent/page/'+self.currentPage, {limit:50}, function(data) {
          if (self.torrent.lastest.length === 0) {self.lastestPage=self.originPage=self.currentPage}
          if (self.lastestPage < self.currentPage) {self.lastestPage=self.currentPage}
          if (self.originPage > self.currentPage) {self.originPage=self.currentPage}
          if (this.addDirection){
            self.torrent.lastest = self.torrent.lastest.concat(data.torrents) ;
          }else{
            self.torrent.lastest = data.torrents.concat(self.torrent.lastest) ;
            setTimeout(function(){
              document.getElementById("rin-wrapper").scrollTop=document.getElementById("rin-wrapper").scrollHeight-self.origionScroll;
            },300)
          }
          self.torrent.pageNum=data.page_count;
          self.busy=false;
          self.nextBusy=false;
          self.prevBusy=false;
  //          setTimeout(function() {
  //            self.busy = false;
  //          }, 2000);
        });
      },
      doSearch: function(key) {
        let self = this;
        self.searchKey=key;
        self.busy=true;
        this.$http.get('https://bangumi.moe/api/v2/torrent/search', {limit:50,p:self.currentPage,query:key}, function(data) {
          if (self.torrent.lastest.length === 0) {self.lastestPage=self.originPage=self.currentPage}
          if (self.lastestPage < self.currentPage) {self.lastestPage=self.currentPage}
          if (self.originPage > self.currentPage) {self.originPage=self.currentPage}
          if (addDirection){
            self.torrent.lastest = self.torrent.lastest.concat(data.torrents) ;
          }else{
            self.torrent.lastest = data.torrents.concat(self.torrent.lastest) ;
          }
          self.torrent.pageNum=data.page_count;
          self.busy=false;
        });
      },
      chgPage:function(offset){
        if (!offset) return;
        let self=this;
        if (self.currentPage+offset<1) {
          setTimeout(()=>{
            self.prevBusy=false;
            self.ready2Refresh=true;
          },2000);

        }
        if ((self.currentPage+offset>=1)&&(self.currentPage+offset<=self.torrent.pageNum)){
          if (self.searchKey){
            self.$route.router.go({name:"search",params:{number:self.currentPage+=offset,key:self.searchKey}});
          }else{

            self.$route.router.go({name:"page",params:{number:self.currentPage+=offset}});
          }
          //self.getTorrents();
        }
      },
      doRefresh:function(){
        let self=this;
        self.$route.router.go({name:"index"});
        self.currentPage=1;
        self.torrent.lastest=[];
        self.getTorrents();
        self.ready2Refresh=false;
      },
      getScrollWidth:function() {
        var noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll-scroll;
      },
      goTorrent:function(id, e){
        if(!e.defaultPrevented){
          this.$route.router.go({name:"torrent",params:{key:id}})
        }
      }
    },
    ready: function() {

      let self=this;
      /*
      switch (self.$route.mode) {
        case "normal":
          self.getTorrents();
          break;
        case "page":
          if ((self.$route.params.number==parseInt(self.$route.params.number))&&parseInt(self.$route.params.number)>0){
            self.currentPage=parseInt(self.$route.params.number);
          }
          self.getTorrents();
          break;
        default:
          self.getTorrents();
      }

      console.log("path",this.$route.path)
      */
      document.addEventListener('mousewheel',(e)=>{
        if (!self.busy && self.ready2Refresh && e.wheelDeltaY>0){
          self.doRefresh();

        }
        if (self.ready2Refresh && e.wheelDeltaY<0){
          self.ready2Refresh=false;
        }
      })

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
   },
   route:{
     data:function(t){
       let self=this;
       switch (self.$route.mode) {
         case "normal":
           self.currentPage=1;
           self.getTorrents();
           break;
         case "page":
           if ((self.$route.params.number==parseInt(self.$route.params.number))&&parseInt(self.$route.params.number)>0){
             self.currentPage=parseInt(self.$route.params.number);
           }
           self.getTorrents();
           break;
        case "search":
          //TODO:搜索处理
          if ((self.$route.params.number==parseInt(self.$route.params.number))&&parseInt(self.$route.params.number)>0){
            self.currentPage=parseInt(self.$route.params.number);
          }
          console.log("Search in process");
          self.doSearch(self.$route.params.key);
          break;
         default:
           self.getTorrents();
       }
     }
   }

  };
</script>

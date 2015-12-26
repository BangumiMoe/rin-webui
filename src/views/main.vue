<style scoped lang="less">
@import "../less/colors.less";

@color-tr-odd: rgba(233,233,233,0.25);
@color-tr-hover: rgba(200,200,200,0.7);
@color-th: rgba(233,233,233,0.9);
@color-th-bg: rgba(98,137,168,0.8);
@color-inline-tag: #6d6d6d;
@color-inline-tag-bg: #eeeeee;
@color-inline-tag-hover: #6d6d6d;
@color-inline-tag-bg-hover: #eeeeee;

#rin-main {
  height: 100%;
  overflow: hidden;
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

      i { line-height: 40px;
        transition: font-size .2s;
      }
    }
    .page-nav-btn.btn-up{
      background-color: @color-primary-2;
    }
    .page-nav-btn.btn-up-first{
      background-color: @color-primary-2;
    }
    .page-nav-num{
      color: @color-primary-0;
    }
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
    .page-nav-btn:not(.cur):hover{
      background-color: @color-primary-3;
      i{
        font-size:2em;
      }

    }
    .page-nav-btn.btn-down{
      background-color: @color-primary-2;
    }
    .page-nav-btn.btn-down-last{
      background-color: @color-primary-2;
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
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    table.rin-main-table{
      table-layout: fixed;
      font-size:0.9em;

      thead {
        /*color: @color-secondary-2-1;
       background-color: @color-secondary-2-4; */

       color: @color-th;
       background-color: @color-th-bg;
       th {font-weight: 400}

      }
      tbody{
        padding-top:33px;
      }

      tbody tr {
        transition: all .2s;

        td{
          line-height: 170%;
          padding:5px 0;
          text-align: center;
          i{
            line-height: 170%;
          }

          .rin-magnet {
            color: @color-primary-4;
          }
          .rin-inline-tag{
            display: inline-block;
            color: @color-inline-tag;
            background-color: @color-inline-tag-bg;
            height: 20px;
            padding-right: 5px;
            padding-left:5px;
            margin-right: 5px;
          }
          .rin-team{
            padding-left:0px;
            .team-icon{
              width: 20px;
              height: 20px;
              vertical-align: top;

            }
            span{
              line-height: 20px;
            }
          }
        }

        td.rin-uploader{
          text-align: left;
          .uploader-avatar{
            width: 20px;
            height: 20px;
            margin-right: 5px;
            vertical-align: top;
          }
          span{
            display: inline-block;
            width: calc(~'100% - 25px');
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
        font-size: 1.2em;
        padding: 8px 0;
      }

    }

  }
  .table-title-fixed{
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
  .fixed-show{
    opacity: 0.9;

  }
}
</style>

<template>
  <div id="rin-main" class="rin-col" style="width: calc(100% - 128px);" v-bind:class="{'modal-blur':modalBlur}">
    <div is="rin-loader" v-if="busy" :progress="progress" transition="rin-fade"></div>
    <div  id="rin-wrapper" class="rin-wrapper" v-show="!busy" transition="rin-fade">
      <div class="page-nav clearfix" >
        <div  class="rin-row page-nav-inner" >
          <div class="page-nav-btn btn-down-last rin-col-2" >
            <i class="material-icons" style="    transform: rotate(45deg);padding-top: 1px;padding-left: .5px;">&#xE63E;</i>
          </div>
          <div class="page-nav-btn btn-up-first rin-col-2" v-on:click="chgPage(1-currentPage)" v>
            <i class="material-icons">&#xE020;</i>
          </div>
          <div class="page-nav-btn btn-up rin-col-2" v-on:click="chgPage(-1)" v>
            <i class="material-icons">&#xE314;</i>
          </div>
            <div  class="cur rin-col-4  page-nav-btn page-nav-num">
              {{currentPage}}
            </div>
          <div class="page-nav-btn btn-down rin-col-2" v-on:click="chgPage(+1)">
            <i class="material-icons">&#xE315;</i>
          </div>

        </div>


      </div>
          <table id="rin-main-table" style="width:100%;"  class="rin-main-table" cellpadding="0" cellspacing="1" border="0" width="" frame="void">
          	<thead style="opacity:0;">
          		<tr>
          			<th width="90"><span class="title">发布</th>
          			<th width="5%"><span class="title">分类</span></th>
          			<th><span class="title">标题</span></th>
          			<th width="5%" nowrap="nowrap"><span class="title">磁链</span></th>
          			<th width="7%"><span class="title">大小</span></th>
          			<th width="10%"><span class="title">状况</span></th>
          			<th width="9%"><span class="title">发布者</span></th>
          		</tr>
          	</thead>
          	<tbody>
              <tr v-for="(index, t) in torrent.lastest">
                <td style="font-size:12px;">{{t.publish_time | date 'lately'}}</td>
          			<td align="center">
                  <div class="rin-inline-tag">
                    <span>{{t.category_tag.locale.zh_cn}}</span>
                  </div>

                </td>
          			<td class="title"  style="text-align:left;">
                  <div class="rin-team rin-inline-tag" v-if="t.team">
                    <img class="team-icon"  v-if="t.team.icon" v-bind:src="teamIconBaseUrl+t.team.icon" alt="" />
                    <img class="team-icon" src="../assets/akarin.jpg" v-if="!t.team.icon"/>
                    <span>{{t.team.name}}</span>
                  </div>
          				<a target="_blank" >{{t.title}}</a>
                    </td>
                    <td nowrap="nowrap" align="center">
                        <a class="rin-magnet" title="磁力下載" href="{{t.magnet}}{{magnentt}}">️
                            <i class="material-icons">&#xE2C4;</i>
                        </a>️
                    </td>
          			<td nowrap="nowrap" align="center">{{t.size}}</td>
          			<td nowrap="nowrap" align="center">
                  <a href="javascript:void(0)" title="种子">{{t.seeders}}</a> /
                  <a href="javascript:void(0)" title="下载中">{{t.leechers}}</a> /
                  <a href="javascript:void(0)" title="完成">{{t.finished}}</a>
                </td>
          			<td class="rin-uploader"><img class="uploader-avatar" v-bind:src="gravatarUrl+t.uploader.emailHash" alt="" /><span>{{t.uploader.username}}</span></td>

              </tr>
            </tbody>
          </table>
          <div class="table-title-fixed fixed-show" style="width:calc(100% - {{getScrollWidth()+128}}px)">
            <table id="rin-main-table" style="width:100%;"  class="rin-main-table" cellpadding="0" cellspacing="1" border="0" width="" frame="void">
              <thead>
                <tr>
                  <th width="90"><span class="title">发布</th>
                  <th width="5%"><span class="title">分类</span></th>
                  <th  ><span class="title">标题</span></th>
                  <th width="4%" nowrap="nowrap"><span class="title">磁链</span></th>
                  <th width="7%"><span class="title">大小</span></th>
                  <th width="10%"><span class="title">状况</span></th>
                  <th width="9%"><span class="title">发布者</span></th>
                </tr>
              </thead>
            </table>
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
        torrent: {
          lastest: [],
          pageNum:0,
        },
        modalBlur:false,
        gravatarUrl:"//g.cdog.work/avatar/",
        teamIconBaseUrl:"https://bangumi-moe.phoenixstatic.com/"
      }
    },
    methods: {
      getTorrents: function() {
        let self = this;
        self.busy=true;
        this.$http.get('https://bangumi.moe/api/v2/torrent/page/'+self.currentPage, {limit:50}, function(data) {
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
          self.$route.router.go({name:"page",params:{number:self.currentPage+=offset}});
          setTimeout(function(){
            document.getElementById("rin-wrapper").scrollTop=0;
          },500)
          //self.getTorrents();
        }
      },
      getScrollWidth:function() {
        var noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll-scroll;
      }
    },
    ready: function() {
      /*
      let self=this;
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
          console.log("Search in process");
          break;
         default:
           self.getTorrents();
       }
     }
   }

  };
</script>

<style scoped lang="less">
@import "../less/colors.less";
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
      font-size:0.9em;

      thead {
        /*color: @color-secondary-2-1;
       background-color: @color-secondary-2-4; */

       color: rgba(233,233,233,0.9);
       background-color: rgba(98,137,168,0.8);
       th {font-weight: 400}

      }

      .rin-main-table-tr{
        /* border-bottom: @color-secondary-1-3 1px solid;*/

        &:nth-child(odd){
                    background-color: rgba(233,233,233,0.56);
                }

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
          .rin-team{
            display: inline-block;
            color: #6d6d6d;
            background-color: #eee;
            height: 20px;
            line-height: 20px;
            padding-right: 5px;
            margin-right: 5px;
            .team-icon{
              width: 20px;
              height: 20px;
              vertical-align: top;

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
            width: calc(~'100% - 25px')
          }
        }
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
    <div  class="rin-wrapper" v-show="!busy" transition="rin-fade" >
      <div class="page-nav clearfix" >
        <div  class="rin-row page-nav-inner" >
          <div class="page-nav-btn btn-down-last rin-col-2" >
            <i class="material-icons" style="    transform: rotate(45deg);padding-top: 1px;padding-left: 2px;">&#xE63E;</i>
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
                <td width="110" style="font-size:12px;">{{t.publish_time | date 'lately'}}</td>
          			<td width="6%" align="center">{{t.category_tag.locale.zh_cn}}</td>
          			<td class="title"  style="text-align:left;">
                  <div class="rin-team" v-if="t.team">
                    <img class="team-icon"  v-if="t.team.icon" v-bind:src="teamIconBaseUrl+t.team.icon" alt="" />
                    <img class="team-icon" src="../assets/akarin.jpg" v-if="!t.team.icon"/>
                    {{t.team.name}}
                  </div>
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
          			<td class="rin-uploader"><img class="uploader-avatar" v-bind:src="gravatarUrl+t.uploader.emailHash" alt="" /><span>{{t.uploader.username}}</span></td>

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
          self.currentPage+=offset;
          self.getTorrents();
        }
        self.getPageNavNum(20);
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

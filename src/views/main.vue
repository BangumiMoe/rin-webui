<style lang="less">
@import "../less/colors.less";
#rin-main {
  height: 100%;
  overflow: hidden;
  .page-nav{
    width: calc(~'100% - 128px');
    height: 50px;
    position: fixed;
    top:0;
    text-align: center;
    line-height: 50px;
    font-size: 1.2em;

    .page-nav-inner{
      width:100%;
      float: right;
      box-shadow: #333 1px 1px 15px;
      transition: width .5s;
    }
    .page-nav-short{
      width: 60%;
    }
    .page-nav-btn{
      cursor: pointer;
      color:azure;
    }
    .page-nav-btn.btn-up{
      background-color: #E861A6;
    }
    .page-nav-num{
      background-color: azure;
    }
    .page-nav-btn.btn-down{
      background-color: #EDAB5A;
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
        border-bottom:#989898 1px solid;
        font-size:0.9em;
        background-color: #D7ECEA;
        td{
          line-height: 170%;
          padding:5px 0;
          text-align: center;
        }
      }
      .rin-main-table-tr:nth-child(odd){
        background-color: #66ccff;
      }
      .rin-main-table-tr:hover{
        background-color: #B2E5FF;
        box-shadow: #333 1px 1px 1px ;
      }
      .rin-main-table-tr{
        transition: all .5s;
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
          <div class="page-nav-btn btn-up rin-col-4" v-on:click="lastPage">
            上一页⬆️
          </div>
          <div class="rin-col-4 page-nav-num">
            当前第{{currentPage}}页
          </div>
          <div class="page-nav-btn btn-down rin-col-4" v-on:click="nextPage">
            下一页⬇️
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
          			<td nowrap="nowrap" align="center"><a class="rin-magnet" title="磁力下載" href="{{t.magnet}}">⬇️</a></td>
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
          lastest: []
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

          self.busy=false;
//          setTimeout(function() {
//            self.busy = false;
//          }, 2000);
        });
      },
      lastPage:function(){
        let self=this;
        if (self.currentPage>1){
          self.currentPage--;
          self.getTorrents();
        }
      },
      nextPage:function(){
        let self=this;
        if (self.torrent.lastest.length>=30){
          self.currentPage++;
          self.getTorrents();
        }
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

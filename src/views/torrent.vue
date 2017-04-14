<style scoped lang="less">
  @import "../less/colors.less";
  /*@color-tr-odd: rgba(233, 233, 233, 0.25);
  @color-tr-hover: rgba(200, 200, 200, 0.7);
  @color-th: rgba(233, 233, 233, 0.9);
  @color-th-bg: rgba(98, 137, 168, 0.8);
  @color-inline-tag: #6d6d6d;
  @color-inline-tag-bg: #eeeeee;
  @color-inline-tag-hover: #6d6d6d;
  @color-inline-tag-bg-hover: #eeeeee;*/
  /*@color-sidebar: #517896;*/

  @header-height: 42px;
  #rin-main {
    position: relative;
    height: 100%;
    width: ~"calc(100vw - 128px)";
    overflow: hidden;
    .rin-head {
      color: white;
      background-color: @color-primary-3;
      text-align: center;
      font-weight: 400;
      font-size: @header-height * 0.38;
      line-height: @header-height;
      height: @header-height;
    }
    .rin-content {
      display: inline-block;
      width: 100%;
      height: ~"calc(100vh - 42px)";
      overflow-y: auto;
      .rin-details {
        width: 100%;
        box-sizing: border-box;
        padding: .3rem;
      }
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
<template>
  <div id="rin-main">

    <div is="rin-loader" v-bind:progress="70" v-show="busy" transition="rin-fade"></div>

    <div class="rin-head" v-show="!busy" transition="rin-fade">
      {{data.title || 'loading...'}}
    </div>

    <div class="rin-content" v-show="!busy" transition="rin-fade">
      <div class="rin-details">
        <!--<p class="rin-details-info">
          <span class="team-info">
              <rin-team-label :id="data.uploader._id" :teamname="data.team.name" :path="data.team.icon"></rin-team-label>
  						<rin-user-label :id="data.uploader._id" :username="data.uploader.username" :path="data.uploader.emailHash"></rin-user-label>
  					</span>
  
          {{$t('submitted')}} {{data.publish_time}}
        </p>-->

        <!--<div class="rin-tag">
          <a v-for="t in data.tags" v-link="'/tag/'+t._id" v-bind:class="{ 'haspic' : (t.type == 'bangumi' || t.type == 'team') }">
            <img v-bind:src="resource_host+t.bangumi.icon" :alt="$(t)" v-if="t.type == 'bangumi'">
            <img v-bind:src="resource_host+t.team.icon" :alt="$t(t)" v-if="(t.type == 'team' && t.team.icon)">
            <img src="../assets/akarin.jpg" v-if="(t.type == 'team' && (!t.team || !t.team.icon))"/>
            <span>{{$t(t)}}</span>
          </a>
        </div>-->

        <div class="row expanded">
          <div class="columns medium-8">
            <div class="rin-details-intro" v-html="data.introduction"></div>
          </div>
          <div class="columns medium-4">
            <div class="comments">
              <ul>
                <li v-for="c of data.comments">{{c}}</li>
              </ul>
            </div>
          </div>
        </div>

        <!--<div class="rin-team-signature" v-html="data.team.signature"></div>-->
      </div>
    </div>

    <!--<div class="rin-sidebar rin-row"
         v-bind:class="{'action':!busy}">
      <a class="rin-button"
         v-bind:href="data.downloadTorrent || ''">
        <i class="material-icons">&#xE2C4;</i>
        <tooltip :info="$t('torrent')"></tooltip>
      </a>
      <a class="rin-button"
         v-bind:href="data.magnet">
        <i class="material-icons">&#xE8AB;</i>
        <tooltip :info="$t('magnet')"></tooltip>
      </a>
      <a class="rin-button"
         href="javascript:void(0);"
         v-on:click="toggleComment"
         v-on:mouseenter="showComment"
         v-on:mouseleave="hideComment">
        <i class="material-icons">&#xE0B9;</i>
      </a>
    </div>
    <div class="rin-bar-comment"
         v-bind:class="{'active':isShow,'action':commentStatus}">
      评论内容
    </div>-->
  </div>
</template>

<script>
  import RinTeamLabel from '../components/rin-team-label';
  import RinUserLabel from '../components/rin-user-label';
  import RinLoader from '../components/rin-loader';
  import NavTooltip from '../components/nav-tooltip';
  export default {
    name: 'Torrent',
    data() {
      return {
        id: '',
        data: {},
        busy: true,
        headerFixed: false,
        resources: {
          info: this.$resource('https://bangumi.moe/api/v2/torrent{/id}'),
        },
      };
    },
    methods: {
      backHomepage() {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          this.$route.router.go({
            name: 'index',
          });
        }
      },
      getScrollWidth() {
        const oDiv = document.createElement('DIV');
        oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;';
        const noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = 'scroll';
        const scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
      },
      fixHeader(e) {
        if (e.target.scrollTop === 0) {
          if (this.headerFixed) this.headerFixed = false;
        } else if (!this.headerFixed) {
          this.headerFixed = true;
        }
      },
      fetchInfo(o, t) {
        const offset = o || 0;
        const total = t || 100;
        this.resources.info.get({ id: this.id }, {
          params: { offset, total },
        }).then(
          resp => {
            const data = resp.data;
            this.data = data;
            // torrent文件
            this.data.downloadTorrent = `/download/torrent/${this.id}/${data.infoHash}.torrent`;
            this.busy = false;
          },
          resp => {
            // TODO found error
            this.busy = false;
            console.error(`[Torrent]remote server error ${resp.status} ${resp.body}`);
          });
      },
    },
    filters: {
      date: require('../filters/dateFormat.js'),
    },
    components: {
      RinTeamLabel,
      RinUserLabel,
      RinLoader,
      tooltip: NavTooltip,
    },
    mounted() {
      this.id = this.$route.params.key;
      this.fetchInfo();
    },
  };

</script>
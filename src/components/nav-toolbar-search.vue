<!--
    Rin Search Bar By LancerComet at 22:33, 2015.12.08.
    # Carry Your World #
-->

<!-- SearchBar 样式定义. -->
<style lang="less">
  @cubicEase: cubic-bezier(.22, .58, .12, .98);
  .rin-search-bar {
    @toolbarWidth : 128px;
    width : calc(~"100% - @{toolbarWidth}");
    padding: 0 1em .5em 1em;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    font-family: "Microsoft YaHei";
    font-size: 13px;
    background-color: #fff;
    box-shadow: 0 0 .1em .1em rgba(0,0,0,.3);
    transition: all @cubicEase .5s;
    &:after {
       content: "";
       display: block;
       visibility: hidden;
       clear: both;
       zoom: 1;
     }

    &.show {
      bottom: -13.8em;
    }

    &.hide {
      bottom: -100%;
    }

    &.fixed {
      bottom: 0
     }

     /* Title Part. */
    .material-icons.search {
      vertical-align: top;
    }

    .search-bar-title {
      vertical-align: middle;
    }


    /* Main Container. */
    /* Left Part. */
    .left-part {
      @searchIconWidth : 50px;
      width : calc(~"100% - @{searchIconWidth}");
    }

    .team-tag {
      display: inline-block;
      background-color: cornflowerblue;
      padding: .5em;
      color: #fff;
      font-size: 12px;
      border-radius: .5em;
    }

    .search-input {
      width: 100%;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }

    /* Right Part. */
    .right-part {
      width: 50px;
      text-align: center;
    }


    /* Tags Container. */
    .tag-item {
      display: inline-block;
      padding: .5em;
      margin-right: .5em;
      color: cornflowerblue;
      font-size: 12px;
      border: .1em solid cornflowerblue;
      border-radius: .5em;
      cursor: pointer;
      transition: all @cubicEase .4s;
      user-select: none;
      &:hover {
        background-color: cornflowerblue;
        color: #fff;
      }
      &:active {
        background-color: #4fc315;
        border-color: #4fc315;
        color: #fff;
        transition: none !important;
      }
    }



    /* Common Class-based Style goes below. */

    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .vertical-middle {
      vertical-align: middle;
    }

    .vertical-bottom {
      vertical-align: bottom;
    }

    @keyframes scale-down-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    .rin-input {
      border: 0;
      border-bottom: .1em solid #222;
      outline: none;
    }

  }
</style>

<!-- SearchBar 模板定义. -->
<template>

  <div class="rin-search-bar">

      <!-- Preview Title. | 预览标题节点. -->
      <h4 class="preview-title">
        <i class="material-icons search">&#xE8B6;</i> <span class="search-bar-title" v-text="searchBarTitle"></span>
      </h4>

      <!-- Search Result List Container. | 搜索结果容器. -->
      <div class="search-list-ctnr">

        <!-- 最近番剧结果列表. -->
        <div class="recent-program-list" role="tablist" v-show="nodeControl.recentProgramList.show">

          <!-- 搜索结果节点. -->
          <div class="list-item" v-for="result in dataObject.recentPrograms" role="listitem">
            <div class="list-item-title" role="heading" v-text="result.day"></div>
            <ul class="list-item-ctnr" role="list">
              <li class="list-item tag-item" v-for="tag in result.tags" role="listitem" v-text="tag"></li>
            </ul>
          </div>

        </div>

        <!-- 建议 Tag 容器. -->
        <div class="recommend-tags" role="list" v-show="nodeControl.recommendTags.show">
          <div class="list-item tag-item" role="listitem" v-for="tag in dataObject.recommendTags" v-text="tag"></div>
        </div>

      </div>

      <!-- Main Container of SearchBar. | 搜索栏主体容器. -->
      <div class="main-ctnr clear-float">

          <!-- Left Part. | 左侧节点容器. -->
          <div class="left-part float-left">
              <!--<div class="team-tag">团队 Tag</div>-->
              <input type="text" class="rin-input vertical-middle search-input" v-model="searchBarValue" role="search" aria-label="在这里搜索当前团队内容." placeholder="在这里搜索..." v-on:keyup="getRecommendTags" v-on:keyup.13="searchSubmit">
          </div>

           <!-- Right Part. | 右侧节点容器. -->
          <div class="right-part float-right">

              <!-- User-input-tags Container. | 用户已输入标签容器. -->
              <!--<div class="tags-ctnr">-->
                  <!--<div class="tag-item" v-for="userTag in userTagList" v-text="userTag" data-value="{{userTag}}" v-on:click="removeTag"></div>-->
              <!--</div>-->

            <button type="submit" role="button">搜索</button>

          </div>

      </div>

  </div>

</template>


<!-- SearchBar 脚本定义. -->
<script>
  export default {

    // 数据对象定义.
    data () {
      return {
        searchBarTitle: "搜索.",  // 搜索节点题文字.
        searchBarValue: "",  // 搜索框数值.
        userTagList: ["default1", "default2"],  // 用户输入标签数组.

        // 节点控制对象.
        nodeControl: {
          recentProgramList: {
            show: true
          },
          recommendTags: {
            show: false
          }
        },

        // 数据存放对象.
        dataObject: {
          // 最近四天番剧数据.
          recentPrograms: [
            { day: "星期一", tags: ["哲♂学", "新日♂暮里"] },
            { day: "星期二", tags: ["Deep ♂ Dark ♂ Fantacy", "Boy ♂ Next ♂ Door"]}
          ],

          // 推荐 Tag 数据:
          recommendTags: ["啊♂", "屁♂股", "Take ♂ it ♂ Boy"]
        },

        // 搜索事件相关数据.
        searchEvent: {
          recommendTagTimeout: null  // 推荐 Tag 事件延时计时器.
        }
      }
    },

    // 广播事件注册.
    events: {
      "recentProgramRequest": function () {
        this.recentProgramRequest();
      }
    },

    // 事件处理函数定义.
    methods: {

      // 空格增加用户 Tag.
      addUserTag: function () {
        if (this.searchBarValue === " ") { this.searchBarValue = null; return; }
        this.userTagList.push(this.searchBarValue.trim());  // Push Value to [userTagList].
        this.searchBarValue = null;
      },

      // 删除 Tag.
      removeTag: function (event) {
        var targetElement = event.srcElement || event.target;
        var value = targetElement.attributes["data-value"].value;
        this.userTagList.indexOf(value) > -1 && this.userTagList.splice(this.userTagList.indexOf(value), 1);
      },

      // Definition: 获取最近四天的番组.
      recentProgramRequest: function () {
        // TODO: 发送请求获取最近四天数据.
        // TODO: this.$http.啪啪啪 ...
        var self = this;
        this.searchBarTitle = "正在努力获取最近四天的番组... > <";
        requestFinished();

        // 请求完成动作.
        function requestFinished () {
          // Just testing.
          setTimeout(function () {
            self.searchBarTitle = "搜索完成惹！";
          }, 1000)
        }

      },

      // 搜索请求事件.
      searchSubmit: function () {
        var self = this;
        self.nodeControl.recentProgramList.show = true;
        self.nodeControl.recommendTags.show = false;
      },

      // 获得推荐 Tag 事件.
      getRecommendTags: function () {
        var self = this;
        self.nodeControl.recentProgramList.show = false;
        self.nodeControl.recommendTags.show = true;
        clearTimeout(self.searchEvent.recommendTagTimeout);
        self.searchEvent.recommendTagTimeout = setTimeout(function () {
          // TODO: 发送请求获取推荐 Tag.
        });
      }
    }

  };
</script>


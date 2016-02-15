<!--
    Rin Search Bar By LancerComet at 22:33, 2015.12.08.
    # Carry Your World #
-->

<!-- SearchBar 样式定义. -->
<style scoped lang="less">
  @import "../less/colors.less";
  @cubicEase: cubic-bezier(.22, .58, .12, .98);

  /* Main Container. | 节点主容器. */
  .rin-search-bar {
    @toolbarWidth : 128px;
    width : calc(~"100% - @{toolbarWidth}");
    padding: 0 1em .5em 1em;
    position: fixed;
    left: 0;
    bottom: 0;
    color: #97c8ef;
    box-sizing: border-box;
    font-family: "Microsoft YaHei";
    font-size: 13px;
    border-top: 5px solid #97c8ef;
    background-color: #fff;
    /*background-color: @color-secondary-1-4;*/
    /*border-top: 5px solid @color-secondary-1-3;*/
    /* box-shadow: 0 0 .1em .1em rgba(0,0,0,.3); */
    transition: all @cubicEase .5s;

    &:after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
      zoom: 1;
    }

    &.show {
       bottom: -21em;
    }

    &.hide {
       bottom: -100%;
    }

    &.fixed {
       bottom: 0;
      .search-hint {
        display: none;
      }
    }

    /* Title Part. | 标题部分. */
    .material-icons.search {
      vertical-align: top;
    }

    .search-bar-title {
      vertical-align: middle;
    }


    /* Search List Container. | 搜索结果部分. */
    .search-list-ctnr {
      max-height: 25em;
      padding-bottom: 1em;
      overflow-x: auto;
      overflow-y: hidden;

      /* Recent Program List. | 最近番组结果列表. */
      .recent-program-list {
        white-space: nowrap;
      }

      .list-item-title {
        position:relative;
        float: left;
        width: 40px;
        height: 100%;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
      }

      .day-item {
        display: inline-block;
        height: 15em;
        vertical-align: top;
        white-space: normal;
      }

      .list-item-ctnr {
        width: auto;
        padding-left: 1em;
        float: right;
        flex-direction: column;
        flex-wrap: wrap;
        transition:all .3s linear;
      }

    }

    /* Search Bar Container. | 搜索条部分. */
    .search-bar-ctnr {
    @searchButtonWidth : 50px;

      .search-bar {
        padding: 1em 0 .5em 0;
      }

      .search-input {
        width : calc(~"100% - @{searchButtonWidth}");
        font-size: 14px;
        font-family: "Microsoft YaHei";
        float: left;
      }

      .search-submit-btn {
        background-color: transparent;
        width: @searchButtonWidth;
        border: none;
        float: right;
      }

    }

    .list-column {
      display: inline-block;
      width: 200px;
      vertical-align: top;
    }

    /* Tags Container. */
    .tag-item {
      width:200px;
      display: inline-block;
      padding: .5em;
      margin: .5em .5em .5em 0;
      /*border: .1em solid @color-secondary-2-4;*/
      border: .1em solid #97c8ef;
      /*background-color: @color-secondary-2-3;*/
      background-color: #97c8ef;
      /*color: @color-secondary-2-1;*/
      color: #fff;
      font-size: 12px;
      border-radius: .5em;
      cursor: pointer;
      transition: all @cubicEase .4s;
      user-select: none;


      &:hover {
        border-color: @color-secondary-2-3;
        background-color: @color-secondary-2-2;
        /*color: @color-secondary-2-4;*/
        color: #fff;
      }

      &:active {
        border-color: @color-secondary-2-2;
        background-color: @color-secondary-2-1;
        color: @color-secondary-2-0;
        transition: none !important;
      }
    }

    .rin-loading-progress {
      background-color: #fff;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
    }

    /* Common Class-based Style goes below. */
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .clear-float:after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
      zoom: 1;
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
      color: #7eb0ef;
      border-bottom: .1em solid #97c8ef;
      outline: none;
    }

  }
</style>

<!-- SearchBar 模板定义. -->
<template>

  <div class="rin-search-bar">

    <!-- Preview Title. | 预览标题节点. -->
    <h4 class="preview-title">
      <i class="material-icons search">&#xE8B6;</i> <span class="search-bar-title">搜索</span> <span class="search-hint vertical-middle">( 点击固定 )</span>
    </h4>

    <!-- Search Result List Container. | 搜索结果容器. -->
    <div class="search-list-ctnr clear-float">

      <!-- 最近番剧结果列表. -->
      <div class="recent-program-list clear-float" role="tablist" v-show="nodeControl.recentProgramList.show">

        <!-- 搜索结果节点: 单日内容. -->
        <div class="day-item" v-for="(day, results) in dataObject.recentPrograms" role="listitem">

          <!-- 当日 Day 标题. -->
          <div class="list-item-title" role="heading">
            <span class="rin-vertical">{{day | handleDay | locale}}</span>
          </div>

          <!-- 当日结果列表. -->
          <div class="list-item-ctnr rin-row" role="list">

              <div class="list-item tag-item" v-for="item in results" v-on:click="addUserTag" data-tag="{{item.tag | locale}}" role="listitem">{{item.tag | locale}}</div>

          </div>

        </div>

      </div>

      <!-- 建议 Tag 容器. -->
      <div class="recommend-tags" role="list" v-show="nodeControl.recommendTags.show">
        <div class="list-item tag-item" role="listitem" v-for="tag in dataObject.recommendTags" v-text="tag | locale" data-tag="{{tag | locale}}" v-on:click="addRecommendTag"></div>
      </div>

      <!-- 搜索进度条 -->
      <div class="rin-loading-progress" role="progressbar" v-show="nodeControl.loading">
        <p v-text="loadingText"></p>
      </div>

    </div>

    <!-- Main Container of SearchBar. | 搜索栏主体容器. -->
    <div class="search-bar-ctnr clear-float">

      <!-- Search Bar Container. | 搜索栏容器. -->
      <div class="search-bar clear-float">
        <!-- 搜索栏本体. -->
        <input type="text" class="rin-input vertical-middle search-input" v-model="searchBarValue" role="search" aria-label="在这里搜索当前团队内容." placeholder="在这里搜索..." v-on:click="getRecommendTags" v-on:keyup="getRecommendTags" v-on:keyup.13="searchSubmit" v-on:blur="showRecentProgram">

        <!-- Rock'n Roll! -->
        <button type="submit" role="button" class="search-submit-btn" v-on:click="searchSubmit"><i class="material-icons search">&#xE8B6;</i></button>
      </div>

      <!-- User-input-tags Container. | 用户已输入标签容器. -->
      <div class="tags-ctnr">
        <div class="tag-item" v-for="userTag in userTagList" v-text="userTag" data-value="{{userTag}}" v-on:click="removeUserTag"></div>
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
      cursorKeyword: "",  // 光标处 Tag.
      loadingText: "正在努力获取最近四天的番组... > <",
      userTagList: [],  // 用户输入标签数组.

      // 节点控制对象.
      nodeControl: {
        recentProgramList: {
          show: true
        },
        recommendTags: {
          show: false
        },
        loading: true
      },

      // 数据存放对象.
      dataObject: {
        // 最近四天番剧数据.
        recentPrograms: {
          thursday: [],
          friday: []
        },

        // 推荐 Tag 数据:
        recommendTags: []
      },

      // 搜索事件相关数据.
      searchEvent: {
        recommendTagTimeout: null,  // 推荐 Tag 事件延时计时器.
        searchBlurTimeout: null  // 搜索栏 Blur 计时器.
      }
    }
  },

  // 广播事件注册.
  events: {
    "recentProgramRequest": function () {
      this.recentProgramRequest();
    }
  },

  filters:{
    "handleDay":function(str){
      // 将首字母转为大写,才能找到对应的字段
      return str.substring(0,1).toUpperCase()+str.substring(1);
    }
  },

  // 事件处理函数定义.
  methods: {

    setWidth: function(){
      var allItem = document.querySelectorAll(".list-item-ctnr");
      for(var i = 0;i<allItem.length;i++){
        allItem[i].style.width = (allItem[i].scrollWidth>300 ? allItem[i].scrollWidth+20 : allItem[i].scrollWidth) +"px";
      }
    },

    // Definition: 获取最近四天的番组.
    recentProgramRequest: function () {
      // 发送请求获取最近数据.
      let self = this;
      self.searchBarTitle = "正在努力获取最近四天的番组... > <";
      self.$http.get("https://bangumi.moe/api/v2/bangumi/recent", { ts: Date.now() }, requestFinished);

      function requestFinished (result) {
        // 处理进度条.
        self.loadingText = "搜索完成惹！";
        self.nodeControl.loading = false;

        // 数据绑定.
        self.dataObject.recentPrograms = result;

        setTimeout(()=>{
          self.setWidth();
        },100)
      }
    },

    // Definition: 从最近番组中选择 Tag.
    addUserTag: function (event) {
      var tagData = event.target.attributes["data-tag"].value || event.srcElement.attributes["data-tag"].value;
      if (this.searchBarValue.indexOf(tagData) > -1) { return; }  // 如果已存在该 Tag 则返回.
      this.searchBarValue += tagData + " ";
    },

    addRecommendTag: function (event) {
      var self = this;
      clearTimeout(self.searchEvent.searchBlurTimeout);
      var tagData = event.target.attributes["data-tag"].value || event.srcElement.attributes["data-tag"].value;
      if (this.searchBarValue.indexOf(tagData) > -1) { return; }  // 如果已存在该 Tag 则返回.
      this.searchBarValue = this.searchBarValue.replace(self.cursorKeyword, tagData)
    },

    // Definition: 删除搜索栏中的 Tag.
    removeUserTag: function (event) {
      var targetElement = event.srcElement || event.target;
      var value = targetElement.attributes["data-value"].value;
      this.userTagList.indexOf(value) > -1 && this.userTagList.splice(this.userTagList.indexOf(value), 1);
    },

    // Definition: 当提交搜索时生成 Tag.
    generateTags: function () {
      this.userTagList = this.searchBarValue.trim().split(" ");
    },

    // 搜索请求事件.
    searchSubmit: function () {
      var self = this;
      self.userTagList = [];  // 清空之前的 Tag.
      self.nodeControl.recentProgramList.show = true;
      self.nodeControl.recommendTags.show = false;
//    self.generateTags();  // 生成 Tag.

      var keyword = self.searchBarValue;
      keyword = keyword.replace(/"/g, "'");
      keyword = keyword.replace(/\s/g, "|");

      console.log(keyword);

      // TODO: 广播发送搜索请求至相应视图.

//      self.$http.post("https://bangumi.moe/api/tag/search", { query: self.cursorKeyword }).then(requestFinished);
//      function requestFinished (result) {
//        self.dataObject.recommendTags = result;
//      }
    },

    // 获得推荐 Tag 事件.
    getRecommendTags: function (event) {
      let self = this;
      let target = event.target || event.srcElement;
      let cursorPosition = getPositionForInput(target);  // 光标位置.

      // 获取光标附近关键字.
      let leftPart = self.searchBarValue.slice(0, cursorPosition);
      let rightPart = self.searchBarValue.slice(cursorPosition, self.searchBarValue.length);
      leftPart = leftPart.lastIndexOf(" ") < 0 ? leftPart : leftPart.slice(leftPart.lastIndexOf(" "), leftPart.length);
      rightPart = rightPart.indexOf(" ") < 0 ? rightPart : rightPart.slice(0, rightPart.indexOf(" "));
      self.cursorKeyword = (leftPart + rightPart).trim();


      // 显示推荐 Tag 节点.
      self.nodeControl.recentProgramList.show = false;
      self.nodeControl.recommendTags.show = true;

      if (self.cursorKeyword.length < 2) { return; }

      clearTimeout(self.searchEvent.recommendTagTimeout);
      self.searchEvent.recommendTagTimeout = setTimeout(function () {

        // vue-resource 跨域 post 搞不定, 先用原生了.
        var data = new FormData();
        data.append("keywords", "true");
        data.append("multi", "true");
        data.append("name", self.cursorKeyword);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://bangumi.moe/api/tag/search", true);
        xhr.onreadystatechange = function () {
          if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var result = JSON.parse(xhr.responseText);
            self.dataObject.recommendTags = result.tag;
          } else {

          }
        };
        xhr.send(data);

      }, 350);


      function getPositionForInput (element) {
        var CaretPos = 0;
        if (document.selection) {  // IE Support
          var Sel = document.selection.createRange();
          Sel.moveStart('character', -element.value.length);
          CaretPos = Sel.text.length;
        } else if (element.selectionStart || element.selectionStart == '0'){  // Firefox support
          CaretPos = element.selectionStart;
        }
        return CaretPos;
      }

    },

    showRecentProgram: function () {
      let self = this;
      self.searchEvent.searchBlurTimeout = setTimeout(function () {
        self.nodeControl.recentProgramList.show = true;
        self.nodeControl.recommendTags.show = false;
      }, 200);
    }
  },
  ready() {


    //横向滚动
    var wrap = document.querySelector(".search-list-ctnr");
    var eventName = document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
    function mouse_wheel(e){
      var wrapWidth = wrap.scrollWidth/25;

      var e = window.event || e;
      if(e.detail > 0 || e.wheelDelta < 0){
        wrap.scrollLeft += wrapWidth;
      }
      else{
        wrap.scrollLeft -= wrapWidth;
      }
    }
    function mac_mouse_wheel(e){
      var wrapWidth = wrap.scrollWidth/25;
      if(e.wheelDelta<=-120){
        wrap.scrollLeft += wrapWidth;
      }else if(e.wheelDelta >= 120){
        wrap.scrollLeft -= wrapWidth;
      }
    }
    let is = navigator.userAgent.toLowerCase().match(/mac |chrome/g);
    if(is && is.length > 1){
      wrap.addEventListener(eventName,mac_mouse_wheel);
    }else{
      wrap.addEventListener(eventName,mouse_wheel);
    }
  }

  };
</script>


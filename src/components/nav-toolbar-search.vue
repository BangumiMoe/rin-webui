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
    width: calc(~"100% - @{toolbarWidth}");
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
        position: relative;
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
        padding: 0 1em;
        float: right;
        flex-direction: column;
        flex-wrap: wrap;
        transition: all .3s linear;
        font-size: 14px;
        a {
          padding: 5px;
        }
      }
      .recommend-tags {
        font-size: 14px;
        a {
          padding: 5px;
        }
      }
    }
    /* Search Bar Container. | 搜索条部分. */
    .search-bar-ctnr {
      @searchButtonWidth : 50px;
      .search-bar {
        position: relative;
        padding: 1em 0 .5em 0;
      }
      .search-input {
        width: calc(~"100% - 49px");
        font-size: 14px;
        font-family: "Microsoft YaHei";
        float: left;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border: .1em solid #ddd;
        padding-left: 10px;
        transition: border-color .2s linear;
        &:focus,
        &:hover {
          border-color: #97c8ef;
        }
      }
      .search-input-tag {
        position: absolute;
        >a {
          position: relative;
          i.material-icons {
            opacity: 0;
            transition: opacity .2s linear;
            font-size: 12px;
            position: absolute;
            right: 0;
            top: 0;
            padding: 4px;
            background: #eee;
          }
          &:hover {
            i.material-icons {
              opacity: 1;
              color: #6d6d6d;
            }
          }
        }
      }
      .search-submit-btn {
        background-color: transparent;
        width: @searchButtonWidth;
        height: 40px;
        border: none;
        float: right;
        margin-left: -1px;
        border: .1em solid #97c8ef;
      }
    }
    .list-column {
      display: inline-block;
      width: 200px;
      vertical-align: top;
    }
    /* Tags Container. */
    .tag-item {
      width: 200px;
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
        border-color: @color-primary-1;
        background-color: @color-primary-2;
        color: #fff;
      }
      &:active {
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
<style>
  .recommendTags {
    vertical-align: top;
  }
  
  .recommendTags.del_confirm {
    background: #999;
  }
  
  #searchInput[contenteditable="true"] div {
    display: inline-block;
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
          <div class="list-item-ctnr rin-row rin-tag" role="list">

              <a href="javascript:void(0);" v-for="item in results" v-on:click="addUserTag(item.tag,$event)" data-tag="{{item.tag | locale}}" role="listitem">{{item.tag | locale}}</a>

          </div>

        </div>

      </div>

      <!-- 建议 Tag 容器. -->
      <div class="recommend-tags rin-tag" role="list" v-show="nodeControl.recommendTags.show">
        <a 
          role="listitem" 
          v-for="tag in dataObject.recommendTags"
          data-tag="{{tag | locale}}"
          v-on:click="addRecommendTag(tag, $event)"
          href="javascript:void(0);"
          >{{tag | locale}}</a>
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

        <div class="search-input-tag rin-tag">
          <a 
            v-for="tag in userTagList"
            track-by="$index"
            href="javascript:void(0);"
            data-value="{{tag}}"
            v-on:click="removeUserTag($index,$event)"
            class="recommendTags"
          >
          {{tag | locale}}
          <i class="material-icons recommendTags" data-value="{{tag}}">&#xE5CD;</i></a>
        </div>
        <div
          contenteditable="true" 
          id="searchInput"
          class="rin-input vertical-middle search-input rin-tag" 
          v-on:keydown="getRecommendTags($event)" 
          v-on:click="getRecommendTags"
          v-on:blur="showRecentProgram">
          {{searchBarValue}}
          </div>

        <!-- Rock'n Roll! -->
        <button type="submit" role="button" class="search-submit-btn" v-on:click="searchSubmit">
          <i class="material-icons search">&#xE8B6;</i>
        </button>
      </div>

    </div>

  </div>

</template>


<!-- SearchBar 脚本定义. -->
<script>
  export default {
    name: 'NavToolbarSearch',
    // 数据对象定义.
    data() {
      return {
        searchBarTitle: '搜索.', // 搜索节点题文字.
        searchBarValue: '', // 搜索框数值.
        cursorKeyword: '', // 光标处 Tag.
        loadingText: '正在努力获取最近四天的番组... > <',
        userTagList: [], // 用户输入标签数组.
        searchObjectStyle: {
          paddingLeft: 0,
          marginTop: 0,
        },

        // 节点控制对象.
        nodeControl: {
          recentProgramList: {
            show: true,
          },
          recommendTags: {
            show: false,
          },
          loading: true,
        },

        // 数据存放对象.
        dataObject: {
          // 最近四天番剧数据.
          recentPrograms: {

          },

          // 推荐 Tag 数据:
          recommendTags: [],
          // 推荐 tag数据的缓存
          recommendTagsCache: {},
        },

        // 搜索事件相关数据.
        searchEvent: {
          recommendTagTimeout: null, // 推荐 Tag 事件延时计时器.
          searchBlurTimeout: null, // 搜索栏 Blur 计时器.
        },
      };
    },

    // 广播事件注册.
    events: {
      recentProgramRequest() {
        this.recentProgramRequest();
      },
    },

    filters: {
      handleDay(str) {
        // 将首字母转为大写,才能找到对应的字段
        return str.substring(0, 1).toUpperCase() + str.substring(1);
      },
    },

    // 事件处理函数定义.
    methods: {
      setWidth() {
        const allItem = document.querySelectorAll('.list-item-ctnr');
        for (let i = 0; i < allItem.length; i++) {
          allItem[i].style.width = 'initial';
          allItem[i].style.width = `${(allItem[i].scrollWidth > 300 ? allItem[i].scrollWidth + 20 : allItem[i].scrollWidth)}px`;
        }
      },
      // Definition: 获取最近四天的番组.
      recentProgramRequest() {
        // 发送请求获取最近数据.
        const self = this;
        self.searchBarTitle = '正在努力获取最近四天的番组... > <';
        self.$http.get('https://bangumi.moe/api/v2/bangumi/recent', {
          ts: Date.now(),
        }, (result) => {
          // 处理进度条.
          self.loadingText = '搜索完成惹！';
          self.nodeControl.loading = false;

          function sortLenth(val1, val2) {
            return (self.locale(val1.tag).length > self.locale(val2.tag).length) ? 0 : 1;
          }

          // 按文字长度排序
          for (const r in result) {
            result[r].sort(sortLenth);
          }
          // 数据绑定.
          self.dataObject.recentPrograms = result;
          setTimeout(self.setWidth, 0);
        });
      },

      // Definition: 从最近番组中选择 Tag.
      addUserTag(tag) {
        const Input = document.getElementById('searchInput');

        for (let i = 0, len = Input.childNodes.length; i < len; i++) {
          if (Input.childNodes[i].nodeName === 'A' && Input.childNodes[i].getAttribute('data-id') === tag._id) {
            return;
          }
        }

        Input.innerHTML += `<a href="javascript: void(0)" 
        contenteditable="false" class="recommendTags" data-id="${tag._id}"
        data-value="${this.locale(tag)}">${this.locale(tag)}</a>`;
      },

      addRecommendTag(tag) {
        clearTimeout(this.searchEvent.searchBlurTimeout);

        const tagData = this.locale(tag);
        if (this.userTagList.indexOf(tagData) > -1) {
          return;
        } // 如果已存在该 Tag 则返回.

        this.userTagList.push(tag);
        setTimeout(this.setSearchInputStyle, 0);
      },

      // Definition: 删除搜索栏中的 Tag.
      removeUserTag(index) {
        if (this.userTagList[index]) {
          this.userTagList.splice(index, 1);
        }
        setTimeout(this.setSearchInputStyle, 0);
      },

      // Definition: 当提交搜索时生成 Tag.
      generateTags() {
        this.userTagList = this.searchBarValue.trim().split(' ');
      },

      // 搜索请求事件.
      searchSubmit() {
        // self.userTagList = [];  // 清空之前的 Tag.
        this.nodeControl.recentProgramList.show = true;
        this.nodeControl.recommendTags.show = false;
        //    self.generateTags();  // 生成 Tag.

        const Input = document.getElementById('searchInput');
        let keyword = '';

        for (let i = 0, len = Input.childNodes.length; i < len; i++) {
          if (Input.childNodes[i].nodeName === 'A') {
            keyword += `\`${Input.childNodes[i].getAttribute('data-id')}\``;
          } else {
            let value = (Input.childNodes[i].nodeValue || Input.childNodes[i].innerText) ? (Input.childNodes[i].nodeValue || Input.childNodes[i].innerText).trim() : '';
            value = value.replace(/"/g, '\'');
            value = value.replace(/\s/g, '|');

            keyword += `${value} `;
          }
        }
        // console.log(keyword);

        keyword = keyword.trim();

        // go search
        if (keyword) {
          this.$route.router.go({
            name: 'search',
            params: {
              key: keyword,
              number: 1,
            },
          });
        }
      },
      setSearchInputStyle() {
        const el = document.querySelector('.search-input-tag');
        if (el.clientHeight > 35 || el.clientWidth > (document.body.offsetWidth - 300)) {
          this.searchObjectStyle.paddingLeft = 0;
          this.searchObjectStyle.marginTop = `${el.clientHeight + 5}px`;
        } else {
          this.searchObjectStyle.marginTop = 0;
          this.searchObjectStyle.paddingLeft = `${el.clientWidth + 5}px`;
        }
      },
      // 获得推荐 Tag 事件.
      getRecommendTags(event) {
        // enter
        if (event.keyCode === 13) {
          event.preventDefault();
          // search
          this.searchSubmit(event);
        } else if (event.keyCode === 8) {
          // backspace
          const sel = window.getSelection();
          if (sel.rangeCount) {
            const range = sel.getRangeAt(0);
            const prevEl = range.commonAncestorContainer.previousElementSibling;

            // 要删除上一个元素时，高亮提醒
            if (prevEl && prevEl.nodeName === 'A' && range.endOffset === 1) {
              prevEl.className += ' del_confirm';
              setTimeout(() => {
                prevEl.className = 'recommendTags';
              }, 300);
            }
          }
        }


        const target = event.target || event.srcElement;

        const cursorPosition = ((element) => {
          let CaretPos = 0;
          if (document.selection) { // IE Support
            const Sel = document.selection.createRange();
            Sel.moveStart('character', -element.value.length);
            CaretPos = Sel.text.length;
          } else if (element.selectionStart || element.selectionStart === '0') { // Firefox support
            CaretPos = element.selectionStart;
          }
          return CaretPos;
        })(target); // 光标位置.
        // self.searchBarValue = target.textContent.trim();

        // get current cursor position
        // function getCursorPosition(editableDiv) {
        //   let caretPos = 0,
        //     sel, range;
        //   if (window.getSelection) {
        //     sel = window.getSelection();
        //     if (sel.rangeCount) {
        //       range = sel.getRangeAt(0);
        //       if (range.commonAncestorContainer.parentNode === editableDiv) {
        //         caretPos = range.endOffset;
        //       }
        //     }
        //   } else if (document.selection && document.selection.createRange) {
        //     range = document.selection.createRange();
        //     if (range.parentElement() === editableDiv) {
        //       const tempEl = document.createElement('span');
        //       editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        //       const tempRange = range.duplicate();
        //       tempRange.moveToElementText(tempEl);
        //       tempRange.setEndPoint('EndToEnd', range);
        //       caretPos = tempRange.text.length;
        //     }
        //   }
        //   return caretPos;
        // }

        // move cursor position
        // function moveCursor(obj, position) {
        //   // obj.focus();
        //   if (document.selection) {
        //     let sel = obj.createTextRange();
        //     sel.moveStart('character', position);
        //     sel.collapse();
        //     sel.select();
        //   } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        //     obj.selectionStart = position;
        //     obj.selectionEnd = position;
        //   }
        // }

        // const Input = document.getElementById('searchInput');
        // const curPos = getCursorPosition(Input);

        // console.log(event,curPos,event.target.nextElementSibling)

        // 获取光标附近关键字.
        let leftPart = self.searchBarValue.slice(0, cursorPosition);
        let rightPart = self.searchBarValue.slice(cursorPosition, self.searchBarValue.length);
        leftPart = leftPart.lastIndexOf(' ') < 0 ? leftPart : leftPart.slice(leftPart.lastIndexOf(' '), leftPart.length);
        rightPart = rightPart.indexOf(' ') < 0 ? rightPart : rightPart.slice(0, rightPart.indexOf(' '));
        self.cursorKeyword = (leftPart + rightPart).trim();


        // 显示推荐 Tag 节点.
        this.nodeControl.recentProgramList.show = false;
        this.nodeControl.recommendTags.show = true;

        if (this.cursorKeyword.length < 2) {
          return;
        }
        // console.log(this.cursorKeyword)
        // cache 搜索的关键词存在
        if (this.dataObject.recommendTagsCache[this.cursorKeyword]) {
          clearTimeout(this.searchEvent.recommendTagTimeout);
          this.dataObject.recommendTags = this.dataObject.recommendTagsCache[this.cursorKeyword];
        } else {
          clearTimeout(this.searchEvent.recommendTagTimeout);
          this.searchEvent.recommendTagTimeout = setTimeout(() => {
            // vue-resource 跨域 post 搞不定, 先用原生了.
            const data = new FormData();
            data.append('keywords', 'true');
            data.append('multi', 'true');
            data.append('name', this.cursorKeyword);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://bangumi.moe/api/tag/search', true);
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4 && xhr.status === 200) {
                const result = JSON.parse(xhr.responseText);
                this.dataObject.recommendTags = result.tag;

                // 存一份到缓存
                this.dataObject.recommendTagsCache[this.cursorKeyword] = result.tag;
              }
            };
            xhr.send(data);
          }, 350);
        }
      },
      showRecentProgram() {
        function searchBlurTimeoutFunc() {
          this.nodeControl.recentProgramList.show = true;
          this.nodeControl.recommendTags.show = false;
        }
        searchBlurTimeoutFunc.bind(this);
        this.searchEvent.searchBlurTimeout = window.setTimeout(searchBlurTimeoutFunc, 200);
        window.setTimeout(this.setWidth, 300);
      },
    },
    ready() {
      // 横向滚动
      const wrap = document.querySelector('.search-list-ctnr');
      const eventName = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';

      const is = navigator.userAgent.toLowerCase().match(/mac |chrome/g);
      if (is && is.length > 1) {
        wrap.addEventListener(eventName, e => {
          const wrapWidth = wrap.scrollWidth / 25;
          if (e.wheelDelta <= -120) {
            wrap.scrollLeft += wrapWidth;
          } else if (e.wheelDelta >= 120) {
            wrap.scrollLeft -= wrapWidth;
          }
        });
      } else {
        wrap.addEventListener(eventName, ev => {
          const wrapWidth = wrap.scrollWidth / 25;
          const e = window.event || ev;

          if (e.detail > 0 || e.wheelDelta < 0) {
            wrap.scrollLeft += wrapWidth;
          } else {
            wrap.scrollLeft -= wrapWidth;
          }
        });
      }
    },
  };
</script>
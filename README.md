# rin-webui

[![Build Status][travis-image]][travis-url]

萌番组前端界面

## 技术栈

`vue.js` `jQuery` `less` `webpack + vue-loader`

## 设计稿

[/doc/bangumi-moe-design-draft1.1.pdf](/doc/bangumi-moe-design-draft1.1.pdf)

## Tips

* Do `git pull --rebase` before `git push`

* Write down instructions about your esteemed works.

## 开发

|Command|Description|
|---|---|
|npm install|Install dependencies|
|npm run dev|Run webpack and server with hot-reload enabled|
|npm run dev:win|Run dev server on Win32 platform|
|npm run build|Build assets for production use, dumped in `./build`|

## 开发文档

### Modal 框

通过发起 `open-modal` 事件来调出 Modal 框。

rin-modal全局监听`open-modal`事件。在各组件内可以使用形如 `this.$dispatch("open-modal", opts)` 的方式调用 Modal 框。

opts 参数如下：

```js
{
  modalId:"modal-id" //要调起的模态框id（复杂逻辑必填，全局唯一）
  title: "标题",  //复杂逻辑可留空
  content: "内容",  //复杂逻辑可留空
  noCancel: false, //是否隐藏取消按钮
  danger: false //是否为紧急通知（红黑条）
}
```
要在模态框内实现复杂逻辑，请将 `rin-modal` 作为逻辑组件的子组件。在组件模板内采用 `<rin-modal modal-id="some-id"></rin-modal>` 包裹模板内容。
复杂逻辑调用示例请参考：[/src/components/modal-demo.vue](/src/components/modal-demo.vue)


__开发阶段可点击 copyright 和 logo 调出 Modal 框示例。__

### 日期格式化

* 使用说明：

```html
<p>{{data | date 'yyyy-MM-dd HH:mm'}}</p>     //2015-10-21 16:38
<p>{{data | date 'MM-dd'}}</p>   			 //10-21
<p>{{data | date 'w'}}</p>   				 //三    //星期三
<p>{{data | date 'eM d,yyyy'}}</p>   		 //Oct 10,2015
```

在 script 中引入：

```js
export default {
	filters: {
		'date':require('../filters/dateFormat.js')
	}
}
```

## API

此处 API 是针对新 UI 使用的 API，与旧版 API 相比它减少了前端的 HTTP 请求次数。

### Torrent APIv2

Torrent APIv2 主要变化是将用户、团队和 tag 信息在一次请求中返回结果。

`/api/v2/torrent/page/:pageNum`

`/api/v2/torrent/:torrent_id`

`/api/v2/torrent/search?query=QUERY`

hybridSearch 支持同时搜索 tag 和关键字，支持 and / or / not 方式查询，QUERY 举例：

* `"WORST ONE"|Asterisk` 同时查询两部类似的番，使用 `|` 操作符；

* `"\"庶民\""` `'"庶民'` 搜索字符串中第一个文字带引号，请将 `\"` 转义或者使用单引号；

* `` `55c057b124180bc3647feb1d` `54992d1cc8b118cf40b274b3` `` 同时搜索含有这两个 tag 的资源；

* `WORST ONE -KNA` 同时搜索标题中有 WORST 和 ONE 且不包含 KNA 的资源；

* **tag 和关键字无法放在同一个 `|` 操作下，但是可以在同一个 QUERY 中。**

* 执行优先顺序：or > not > and


### Bangumi APIv2

Bangumi APIv2 将 tag 信息在一次请求中返回结果。

`/api/v2/bangumi/current`

`/api/v2/bangumi/recent`

### User APIv2

User APIv2 的 session 请求将用户的团队，等待加入的团队在一次请求中返回结果。

`/api/v2/user/session`

其他可能需要用到的部分之后更新。

[travis-url]: https://travis-ci.org/BangumiMoe/rin-webui
[travis-image]: http://img.shields.io/travis/BangumiMoe/rin-webui.svg

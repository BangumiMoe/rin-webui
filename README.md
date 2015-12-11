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
要在模态框内实现复杂逻辑，请将`rin-modal`作为逻辑组件的子组件。在组件模板内采用`<rin-modal modal-id="some-id"></rin-modal>`包裹模板内容。
复杂逻辑调用示例请参考：[/src/components/modal-demo.vue](/src/components/modal-demo.vue)


__开发阶段可点击 copyright 和 logo 调出 Modal 框示例。__

## API

### Torrent APIv2

此处 API 是针对新 UI 使用的 API，与旧版 API 相比它减少了前端的 HTTP 请求次数，将用户、团队和 tag 信息在一次请求中返回结果。

`/api/v2/torrent/page/:pageNum`

`/api/v2/torrent/:torrent_id`

Torrent 的其他列表部分之后更新。


[travis-url]: https://travis-ci.org/BangumiMoe/rin-webui
[travis-image]: http://img.shields.io/travis/BangumiMoe/rin-webui.svg

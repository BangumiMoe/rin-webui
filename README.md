# rin-webui

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

通过发起 `open-modal` 事件来调出Modal框。

rin-modal 组件通过根组件的事件转发，实现了全局监听。从而在各组件内可以使用形如 `this.$dispatch("open-modal", opts)` 的方式调用 Modal 框。

opts 参数如下：

```js
{
  title: "标题",  
  content: "内容",  
  noCancel: false, //是否隐藏取消按钮  
  danger: false //是否为紧急通知（红黑条）    
}
```
复杂逻辑调用示例请参考：./src/components/modal-demo.vue

目前仅实现了动画及样式，相关调用逻辑正在完善中。

__开发阶段可点击 copyright 和 logo 调出 Modal 框示例。__

## API

### Torrent APIv2

此处 API 是针对新 UI 使用的 API，与旧版 API 相比它减少了前端的 HTTP 请求次数，将用户、团队和 tag 信息在一次请求中返回结果。

`/api/v2/torrent/page/:pageNum`

`/api/v2/torrent/:torrent_id`

Torrent 的其他列表部分之后更新。

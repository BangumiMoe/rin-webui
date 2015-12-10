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
 * ### Modal框
 通过发起`open-modal`事件来调出Modal框。

 rin-modal组件通过根组件的事件转发，实现了全局监听。从而在各组件内可以使用形如`this.$dispatch("open-modal",option)`的方式调用Modal框。

 >option:  
 {
   title: "标题",  
   content:"内容",  
   noCancel:false,//是否隐藏取消按钮  
   danger:false //是否为紧急通知（红黑条）    
   }   


 目前仅实现了动画及样式，相关调用逻辑正在完善中。

 *开发阶段可点击copyright调出Modal框示例。

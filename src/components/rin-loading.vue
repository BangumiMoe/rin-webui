<template>
	<div class="loader">Loading...</div>
</template>
<style scoped lang="less">
@import "../less/colors.less";

.loader {
  margin: 20px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: .5em solid #eaf6fb;
  border-right: .5em solid #eaf6fb;
  border-bottom: .5em solid #eaf6fb;
  border-left: .5em solid @color-primary-0;
  transform: translateZ(0);
  animation: animate .6s infinite linear;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 5em;
  height: 5em;
}
@-webkit-keyframes animate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
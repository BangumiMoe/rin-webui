<template>
  <a class="uploader-link">
      <img :src="iconUrl || require('@/assets/akarin.jpg')">
      <span>{{name}}</span>
  </a>
</template>

<script>
export default {
  name: "UploaderLink",
  props: ["uploader"],
  computed: {
    name() {
      return this.uploader ? this.uploader.name : "";
    },
    iconUrl() {
      return this.uploader
        ? `https://static.bangumi.moe/avatar/${this.uploader.emailHash}`
        : null;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@link_height: 22px;
@link_width: 8rem;

.uploader-link {
  display: inline-block;

  width: @link_width;
  font-size: @link_height * 0.5;
  line-height: @link_height;
  height: @link_height;
  margin: 2px;
  padding-right: @link_height * 0.3;

  color: #efefef;
  background-color: @color-4;
  text-align: center;

  border-radius: @link_height * 0.2;

  img {
    display: block;
    height: @link_height;
    width: @link_height;
    float: left;

    border-top-left-radius: @link_height * 0.2;
    border-bottom-left-radius: @link_height * 0.2;
  }

  span {
    padding-left: 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: @color-5;
  }
}
</style>

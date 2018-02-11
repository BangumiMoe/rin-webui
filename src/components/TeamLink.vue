<template>
  <a class="team-link">
      <img :src="iconUrl || require('@/assets/akarin.jpg')">
      <span>{{name}}</span>
  </a>
</template>

<script>
export default {
  name: "TeamLink",
  props: ["team"],
  computed: {
    name() {
      return this.team ? this.team.name : "";
    },
    iconUrl() {
      return this.team ? this.team.iconUrl : null;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@link_height: 22px;
@link_width: 8rem;

.team-link {
  display: inline-block;

  width: @link_width;
  font-size: @link_height * 0.5;
  line-height: @link_height;
  height: @link_height;
  margin: 2px;
  padding-right: @link_height * 0.3;

  color: #333;
  background-color: @color-3;
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
    color: #efefef;
    background-color: @color-5;
  }
}
</style>

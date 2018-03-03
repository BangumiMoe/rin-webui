<template>
  <a class="tag-link" @click="emitLink()">
    <span>{{tag}}</span>
  </a>
</template>

<script>
export default {
  name: "TagLink",
  props: ["tag"],
  methods: {
    emitLink(team) {
        this.$emit('click', this.tag);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@link_height: 22px;
@link_width: 6rem;

.tag-link {
  display: inline-block;

  width: @link_width;
  font-size: @link_height * 0.5;
  line-height: @link_height;
  height: @link_height;
  margin: 2px;

  color: #eeffee;
  background-color: @color-4;
  text-align: center;

  border-radius: @link_height * 0.2;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    color: #efefef;
    background-color: @color-1;
  }
}
</style>

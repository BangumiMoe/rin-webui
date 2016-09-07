<template>
<div class="rin-head">
<a class="rin-button rin-left" href="javascript:void(0)" @click="backPrevPage" v-if="isback">
  <i class="material-icons">&#xE5C4;</i>
</a>
<h3>{{ title }}</h3>
</div>
</template>
<style scoped lang="less">
.rin-head {
  position: relative;
  text-align: center;
  color: #fff;
  background-color: rgba(98, 137, 168, 0.8);
  z-index: 1;
  overflow: hidden;
  width: 100%;
  min-height: 53px;

  .rin-left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    padding: 0 .8em;
    i {
      height: 100%;
      font-size: 24px;
    }
    &:hover {
      color: #c0ded6;
      background-color: #7894AB;
      i {
        color: #c0ded6;
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isback: Boolean,
  },
  methods: {
    backPrevPage() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        this.$route.router.go({
          name: 'index',
        });
      }
    },
  },
};
</script>
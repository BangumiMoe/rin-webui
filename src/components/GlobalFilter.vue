<template>
  <span class="global-filter">
    <input type="text" v-model="query">

    <div class="suggest-list">
      <a class="item" v-for="(item, index) of items" :key="index" @click="doSearch(item.query)">
        {{item.query}} <sup>{{ item.count }}</sup>
      </a>
    </div>
  </span>
</template>

<script>
import { Torrent } from "@/modules/torrent";
export default {
  name: "SystemToolbar",
  data() {
    return {
      query: "",
      busy: false,
      items: []
    };
  },
  watch: {
    query(val) {
      if (this.busy) {
        return;
      }
      this.busy = true;

      if (val && val.length > 1) {
        Torrent.manager.fetchSuggest(val).then(result => {
          this.busy = false;
          this.items.splice(0);
          this.items.push(...result);
        });
      }
    }
  },
  methods: {
    doSearch(query) {
      console.log(`[GlobalFilter.doSearch]update query:${query}`);
      this.$router.push({ name: "Search", params: { query } });
      this.items.splice(0);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@filter_height: 30px;
@filter_width: 12rem;

.global-filter {
  position: relative;

  input {
    margin: 1px 0;
    height: @filter_height - 2px;
    line-height: @filter_height - 2px;

    font-size: round(@filter_height * 0.5);

    padding: 0 0.5rem;
  }

  .suggest-list {
    background: #fefefe;
    position: absolute;
    width: 100%;

    .item {
      display: inline-block;
      width: 100%;
      padding: 3px 0.5rem;
      font-size: 0.8rem;
      line-height: @filter_height - 6px;
      height: @filter_height;

      &:hover {
        color: #fefefe;
        background-color: #cecece;
      }
    }
  }
}
</style>
<template>
  <div class="global-filter">
    <input type="text" v-model="query" @key.up="doSearch(query)">

    <div class="suggest-list" v-show="items.length > 0">
      <a class="item" v-for="(item, index) of items" :key="index" @click="doSearch(item.query)">
        {{item.query}} <sup>{{ item.count }}</sup>
      </a>
    </div>
  </div>
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

      if (val && val.length > 1) {
        this.busy = true;

        Torrent.manager
          .fetchSuggest(val)
          .then(result => {
            this.busy = false;
            this.items.splice(0);
            this.items.push(...result);
          })
          .catch(() => {
            this.busy = false;
          });
      }
    }
  },
  methods: {
    doSearch(query) {
      console.debug(`[GlobalFilter.doSearch]update query:${query}`);
      this.busy = true;
      this.query = query;
      this.$router.push({ name: "Search", params: { query } });
      this.items.splice(0);
      this.busy = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@filter_height: 6rem;
@item_height: 2.3rem;

.global-filter {
  position: relative;
  padding-top: @item_height * 0.35rem;

  input {
    margin: 1px 0;
    height: @item_height;
    line-height: @item_height;
    font-size: @item_height * 0.5;
  }

  .suggest-list {
    position: absolute;
    background: #fefefe;
    width: calc(100% - 3.8rem);
    margin-top: -1px;
    border-left: 1px solid rgb(202, 202, 202);
    border-right: 1px solid rgb(202, 202, 202);
    border-bottom: 1px solid rgb(202, 202, 202);

    .item {
      display: inline-block;
      width: 100%;
      padding: 3px 0.5rem;
      margin-right: -2rem;

      height: @item_height;
      line-height: @item_height;
      font-size: @item_height * 0.4;

      &:hover {
        color: #fefefe;
        background-color: #cecece;
      }
    }
  }
}
</style>
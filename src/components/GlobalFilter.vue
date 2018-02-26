<template>
  <div class="global-filter">
    <input type="search" ref="filter" v-model="query" 
      @key.up="doSearch(query)" 
      @keyup.esc="resetSearch()"
      @keyup.enter="doSearch(query)">

    <i class="busy float-right fas fa-spinner fa-pulse"></i>

    <div class="suggest-list" ref="suggests" v-show="items.length > 0">
      <a class="item" v-for="(item, index) of items" :key="index" @click="doSearch(item.query)">
        {{item.query}} <span class="count float-right">{{ item.count }}</span>
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
      listener_resize: null,

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
    resetSearch() {
      this.query = "";
      this.items.splice(0);
    },
    doSearch(query) {
      console.debug(`[GlobalFilter.doSearch]update query:${query}`);
      this.busy = true;
      this.query = query;
      this.$router.push({ name: "Search", params: { query } });
      this.items.splice(0);
      this.busy = false;
    }
  },
  updated() {
    this.$refs.suggests.style.width = `${this.$refs.filter.clientWidth + 2}px`;
  },
  umounted() {
    window.removeEventListener("resize", this.listener_resize);
    this.listener_resize = null;
  },
  mounted() {
    this.listener_resize = window.addEventListener("resize", () => {
      this.$refs.suggests.style.width = `${this.$refs.filter.clientWidth +
        2}px`;
    });
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@filter_height: 6rem;
@item_height: 2.3rem;

.global-filter {
  position: relative;
  line-height: @item_height;
  padding-top: (@filter_height - @item_height) /2;

  input {
    display: inline-block;
    margin: 1px 0;
    padding-right: 1.7rem;
    height: @item_height;
    line-height: @item_height;
    font-size: @item_height * 0.5;
  }

  i.busy {
    margin-right: 0.6rem;
    margin-top: -1 * @item_height;
    line-height: @item_height;
  }

  .suggest-list {
    position: absolute;
    background: #fefefe;
    // width: calc(100% - 20px);
    margin-top: -1px;
    border-left: 1px solid rgb(202, 202, 202);
    border-right: 1px solid rgb(202, 202, 202);
    border-bottom: 1px solid rgb(202, 202, 202);

    .item {
      display: block;
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

      .count {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
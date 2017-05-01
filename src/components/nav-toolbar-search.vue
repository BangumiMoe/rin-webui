<!-- Rin Search Bar By LancerComet at 22:33, 2015.12.08. # Carry Your World # -->
<style scoped lang="less">
@import "../less/colors.less";
.search-bar {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: ~"calc(100vw - 128px)";
  min-height: 12rem;
  max-height: 64rem;

  border-top: .5rem solid @color-primary-0;
  background-color: white;
  padding: 1rem;
}
</style>

<template>
<div class="search-bar">
  <div class="input-group">
    <input class="input-group-field" type="search" v-model="query">
    <div class="input-group-button">
      <input type="submit" class="button" @click.stop="searchSubmit">
    </div>
  </div>
  <div class="tags">
  </div>
</div>
</template>

<script>
  export default {
    name: 'NavToolbarSearch',
    data() {
      return {
        query: '',
        resources: {
          suggest: this.$resource('https://bangumi.moe/api/v2/torrent/suggest'),
        },
      };
    },

    // 事件处理函数定义.
    methods: {
      // 搜索请求事件.
      searchSubmit() {
        /*
        Torrent APIv2

        Torrent APIv2 主要变化是将用户、团队和 tag 信息在一次请求中返回结果。

        /api/v2/torrent/page/:pageNum?limit=LIMIT

        /api/v2/torrent/user/:user_id?p=PAGE&limit=LIMIT

        /api/v2/torrent/team/:team_id?p=PAGE&limit=LIMIT

        /api/v2/torrent/:torrent_id

        /api/v2/torrent/search?limit=LIMIT&p=PAGE&query=QUERY

        /api/v2/torrent/suggest?query=QUERY

        hybridSearch 支持同时搜索 tag 和关键字，支持 and / or / not 方式查询，QUERY 举例：

        "WORST ONE"|Asterisk 同时查询两部类似的番，使用 | 操作符；

        "\"庶民\"" '"庶民' 搜索字符串中第一个文字带引号，请将 \" 转义或者使用单引号；

        `55c057b124180bc3647feb1d` `54992d1cc8b118cf40b274b3` 同时搜索含有这两个 tag 的资源；

        WORST ONE -KNA 同时搜索标题中有 WORST 和 ONE 且不包含 KNA 的资源；

        tag 和关键字无法放在同一个 | 操作下，但是可以在同一个 QUERY 中。

        执行优先顺序：or > not > and

        API 会保存两个月内用户查询操作的每次 query 。

        suggest 可以根据 QUERY 参数对保存的用户 query 进行关键词匹配，返回不多于五条的搜索建议。

        在返回的数据中，tags 为 query 中 tag 的详细信息，count 为两个月内 query 被搜索的频度。
        */
        const query = this.query;
        console.log(query);
      },
      fetchSuggest() {
        this.resources.suggest.get({
          query: 'D',
        }).then(
          resp => {
            console.log(resp);
          }
        );
      },
    },
    mounted() {
      console.log('[NavToolbarSearch]loaded');
      this.fetchSuggest();
    },
  };

</script>

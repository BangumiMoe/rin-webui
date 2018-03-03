<template>
  <div class="global-filter">

    <input type="search" ref="filter" 
      v-model="query"
      @keyup.esc="resetSearch()"
      @keyup.enter="doSearch(query)"
      @focus="setFocus()"
      @mouseover="setFocus()" 
      @mousemove="setFocus()"
      @mouseout="clearFocus()">

    <div class="tags" ref="tags">
      
      <TagLink class="tag" :tag="user.name" v-show="showTag(user.name)" @click="toggleTag(user.name)"></TagLink>

      <TagLink class="tag" :tag="'HD'" v-show="showTag('720')" @click="toggleTag('720')"></TagLink>
      <TagLink class="tag" :tag="'Full HD'" v-show="showTag('1080')" @click="toggleTag('1080')"></TagLink>

      <template v-for="team in teams">
        <TeamLink class="team" :team="team" :key="team.id"></TeamLink>
      </template>
    </div>

    <i class="busy float-right fas fa-spinner fa-pulse" v-show="busy"></i>

    <div class="suggest-list" ref="suggests" 
      v-show="showSuggest()" 
      @focus="updateFocus()"
      @mouseover="updateFocus()" 
      @mousemove="updateFocus()"
      @mouseout="clearFocus()">
      
      <TagLink class="tag" :tag="'My Torrents'" @click="toggleTag(user.name)" v-if="user.isSignIn"></TagLink>
      <TagLink class="tag" :tag="'HD'" @click="toggleTag('720', ['1080'])">HD</TagLink>
      <TagLink class="tag" :tag="'Full HD'" @click="toggleTag('1080', ['720'])">Full HD</TagLink>

      <a class="item" v-for="(item, index) of items" :key="index" @click="doSearch(item.query)" v-show="items.length > 0">
        {{item.query}} <span class="count float-right">{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { Torrent } from "@/modules/torrent";
import { EventBus } from "@/modules/event-bus";
import { user } from "@/modules/user";

import TeamLink from "@/components/TeamLink";
import TagLink from "@/components/TagLink";

export default {
  name: "SystemToolbar",
  components: { TeamLink, TagLink },
  data() {
    return {
      user,
      listener_resize: null,

      query: "",
      busy: false,
      items: [],
      teams: [],
      tags: [],

      isFocus: false,
      idFocus: null
    };
  },
  watch: {
    query(val) {
      if (this.busy) {
        return;
      }

      if (val && val.length > 0) {
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
    setFocus() {
      if (this.idFocus !== null) clearTimeout(this.idFocus);
      this.isFocus = true;
    },
    clearFocus() {
      if (this.idFocus !== null) clearTimeout(this.idFocus);
      this.idFocus = setTimeout(() => (this.isFocus = false), 300);
    },
    updateFocus() {
      this.isFocus = true;

      if (this.idFocus !== null) clearTimeout(this.idFocus);
      this.idFocus = setTimeout(() => (this.isFocus = false), 5000);
    },
    resetSearch() {
      this.query = "";
      this.items.splice(0);
      this.clearFocus();
      this.tags.splice(0);
      this.teams.splice(0);
    },
    doSearch(query) {
      console.debug(`[GlobalFilter.doSearch]update query:${query}`);
      this.busy = true;

      const q = this.buildQuery(query);
      this.query = query;
      this.$router.push({ name: "Search", params: { query: q } });

      this.items.splice(0);
      this.busy = false;
    },
    searchTeam(team) {
      console.debug(`[GlobalFilter.searchTeam]team id ${team.id} ${team.name}`);

      const idx = this.teams.indexOf(team);
      if (idx > -1) {
        this.teams.splice(idx, 1);
      } else {
        if (this.teams.length > 2) {
          this.teams.shift();
        }
        this.teams.push(team);
      }

      this.updateSuggest();

      this.doSearch(this.query);
    },
    toggleTag(name, conflictTags) {
      const idx = this.tags.indexOf(name);

      if (idx !== -1) {
        this.tags.splice(idx, 1);
      } else {
        if (conflictTags !== undefined) {
          this.tags.forEach((tag, idx) => {
            if (conflictTags.includes(tag)) {
              this.tags.splice(idx, 1);
            }
          });
        }

        if (!this.query.includes(name)) {
          this.tags.push(name);
        }
      }

      this.updateSuggest();

      this.doSearch(this.query);
    },
    showTag(name) {
      return this.tags.includes(name);
    },
    showSuggest() {
      return this.isFocus;
    },
    updateSuggest() {
      this.$nextTick(() => {
        let width = this.$refs.tags.clientWidth + 5;
        this.$refs.filter.style.paddingLeft = `${width}px`;
      });
    },
    // updateQuery(ev) {
    //   const query = ev.target.value;
    //   const code = ev.keyCode;

    //   console.info(`[GlobalFilter.updateQuery]event:${code} ${query}`);

    //   let isSearch = true;
    //   // listen on left and right and backspace
    //   switch (code) {
    //     case 37:
    //     case 39:
    //     case 8:
    //       isSearch = false;
    //       return;
    //   }

    //   if (!this.busy && isSearch && this.query != query) {
    //     this.$nextTick(() => this.doSearch(query));
    //   }
    // },
    buildQuery(query) {
      // build query
      let q = "";

      this.teams.forEach(team => (q += `${team.name} `));
      this.tags.forEach(tag => (q += `${tag} `));

      if (query.length > 0 && q.length > 0) {
        q += ` ${query}`;
      } else if (q.length == 0 || query.length == 0) {
        q = `${q}${query}`;
      }

      return q.replace(/\s+/g, " ").trim();
    }
  },
  updated() {
    this.$refs.suggests.style.width = `${this.$refs.filter.clientWidth + 1}px`;
  },
  umounted() {
    window.removeEventListener("resize", this.listener_resize);
    this.listener_resize = null;
  },
  mounted() {
    this.listener_resize = window.addEventListener("resize", () => {
      const width = this.$refs.filter.clientWidth + 1;
      this.$refs.suggests.style.width = `${width}px`;
    });

    EventBus.$on("searchTeam", this.searchTeam);
  }
};
</script>

<style lang="less" scoped>
@import "../assets/color.less";

@filter_height: 6rem;
@item_height: 2.3rem;
@tag_height: 22px;

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
    font-size: @item_height * 0.43;
  }

  .tags {
    position: absolute;
    padding-left: 0.5rem;
    margin-top: -1.1 * @item_height;

    .tag,
    .team {
      margin-right: 0.1rem;
    }
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

    .tag {
      margin-left: 0.5rem;
      margin-bottom: 10px;
      border-radius: 5px;
    }

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
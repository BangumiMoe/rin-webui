import Vue from 'vue';
import VueX from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import app from './app';

/* eslint-disable no-new */

Vue.use(VueX);
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.locale('zh_cn', require('./i18n/zh_cn.json'));
Vue.locale('zh_tw', require('./i18n/zh_tw.json'));
Vue.locale('en', require('./i18n/en.json'));

// i18n
Vue.config.lang = 'zh-tw';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('./views/main'),
      mode: 'normal',
    },
    {
      path: '/page/:number',
      name: 'page',
      component: require('./views/main'),
      mode: 'page',
    },
    {
      path: '/search/:key/:number',
      name: 'search',
      component: require('./views/main'),
      mode: 'search',
    },
    {
      path: '/bangumi/list',
      name: 'list',
      component: require('./views/bangumi-list'),
    },
    {
      path: '/torrent/:key',
      name: 'torrent',
      component: require('./views/torrent'),
      mode: 'hello',
    },
    {
      path: '/torrent/upload',
      name: 'upload',
      component: require('./views/upload'),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: require('./views/user'),
    },
    {
      path: '/team/:id',
      name: 'team-profile',
      component: require('./views/team-profile'),
    },
  ],
});

const store = new VueX.Store({
  state: {
    user: {},
  },
});

const App = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(app),
});

App.$mount('#app');

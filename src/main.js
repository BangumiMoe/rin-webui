/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.lang = 'zh-tw';

const router = new VueRouter({ history: true });
router.map({
  '/': {
    name: 'index',
    component: require('./views/main'),
    mode: 'normal',
  },
  '/page/:number': {
    name: 'page',
    component: require('./views/main'),
    mode: 'page',
  },
  '/search/:key/:number': {
    name: 'search',
    component: require('./views/main'),
    mode: 'search',
  },
  '/bangumi/list': {
    name: 'list',
    component: require('./views/bangumi-list'),
  },
  '/torrent/:key': {
    name: 'torrent',
    component: require('./views/torrent'),
    mode: 'hello',
  },
  '/torrent/upload': {
    name: 'upload',
    component: require('./views/upload'),
  },
  '/user/:id': {
    name: 'user',
    component: require('./views/user'),
  },
  '/team/:id': {
    name: 'team-profile',
    component: require('./views/team-profile'),
  },
});

router.start(require('./app'), '#app');

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
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
      path: '/search/:key',
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
    }],
});

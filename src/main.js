/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter();
router.map({
  '/': { component: require('./views/main') },
  '/week' :{
  	component: require('./views/week')
  }
});

router.start(require('./app'), '#app');

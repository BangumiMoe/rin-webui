/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter();
router.map({
  '/': { name:"index", component: require('./views/main') ,mode:"normal"},
  '/page/:number': {name:"page" ,component: require('./views/main') ,mode:"page"},
  '/search/:key': { name:"search" ,component: require('./views/main'),mode:"search" },
  '/week' :{
  	component: require('./views/week')
  }
});

router.start(require('./app'), '#app');

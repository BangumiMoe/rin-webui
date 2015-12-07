/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';

if (__DEV__) {
  // dev
}
Vue.use(VueRouter);
const router = new VueRouter();
router.map({
  '/': {
    component: require('./views/home')
  },
  '/about': {
    component: require('./views/about')
  }
});

router.start(require('./app'), '#app');

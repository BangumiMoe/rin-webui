/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter();
router.map({
  '/': {
    component: require('./views/main')
  }
});

router.start(require('./app'), '#app');

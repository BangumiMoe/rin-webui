import Vue from 'vue';
import VueX from 'vuex';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';

import router from './router';
import store from './store';
import app from './app';

/* eslint-disable no-new */

Vue.use(VueX);
Vue.use(VueI18n);
Vue.use(VueResource);

Vue.locale('zh_cn', require('./i18n/zh_cn.json'));
Vue.locale('zh_tw', require('./i18n/zh_tw.json'));
Vue.locale('en', require('./i18n/en.json'));

// i18n
Vue.config.lang = 'zh-tw';

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(app),
}).$mount('#app');

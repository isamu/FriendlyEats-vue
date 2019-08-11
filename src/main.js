import Vue from 'vue'
import VueI18n from 'vue-i18n';
import '@/plugins/vuetify'
import App from '@/components/App'
import router from '@/router'
import store from '@/store/index.js';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import data from '@/components/message'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ja',
  messages: data
});

new Vue({
  router,
  i18n: i18n,
  store,
  render: h => h(App),
}).$mount('#app')


import Vue from 'vue';
import VueRouter from 'vue-router';

import Top from '@/components/Top';
import Restaurant from '@/components/Restaurant';
import Signin from '@/components/Signin';
import Signout from '@/views/Signout';

Vue.prototype.$eventHub = new Vue();

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Top,
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: Restaurant,
    },
    {
      path: '/Signout',
      name: 'signout',
      component: Signout,
    },
    {
      path: '/Signin',
      name: 'signin',
      component: Signin,
    },
  ]
});


export default router;

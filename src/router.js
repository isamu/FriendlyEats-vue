import Vue from 'vue'
import VueRouter from 'vue-router'

import Top from '@/views/Top'
import Hello from '@/views/Hello'
import Protected from '@/views/Protected'
import Message from '@/components/Message'
import Signin from '@/components/Signin'
import Signout from '@/views/Signout'

Vue.use(VueRouter)

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
      path: '/Signout',
      name: 'signout',
      component: Signout,
    },
    {
      path: '/Signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/Hello',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/Message',
      name: 'message',
      component: Message,
    },
    {
      path: '/Protected',
      name: 'protected',
      component: Protected,
    }
  ]
})


export default router;

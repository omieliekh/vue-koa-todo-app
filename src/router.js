import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Todos from '@/components/Todos'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'todos',
      component: Todos
    }
  ]
})

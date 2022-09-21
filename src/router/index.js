import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router

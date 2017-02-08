import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/404', component: NotFound }
]

const router = new VueRouter({
  routes
})

export default router

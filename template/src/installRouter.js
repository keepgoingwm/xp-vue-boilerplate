import VueRouter from 'vue-router'

import Index from './views/Index.vue'
import NotFound from './views/404.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/404', component: NotFound }
]

export default function (Vue) {
  const router = new VueRouter({
    routes
  })

  new Vue({
    router
  }).$mount('#app')
}

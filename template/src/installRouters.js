import VueRouter from 'vue-router'
import App from './App'
import Routers from './routers'

export default function (Vue) {
  Vue.use(VueRouter)

  var router = new VueRouter({
    hashbang: false,
    saveScrollPosition: true,
    linkActiveClass: 'custom-active-class'
  })
  window.router = router

  Routers(router)
  router.start(Vue.extend(App), '#app')
}

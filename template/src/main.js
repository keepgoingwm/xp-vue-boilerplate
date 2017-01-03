if (process.env.NODE_ENV !== 'production') {
  window.vConsole = require('vconsole')
}

import 'babel-polyfill'
import Moment from 'moment'
window.Moment = Moment
// import Decimal from 'decimal.js'
// window.Decimal = Decimal
import FastClick from './libs/widgets/fastclick'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'vux/src/styles/1px.less'
import './assets/styles/sass/index.scss'

import App from './App'
import Routers from './routers'

Vue.use(VueRouter)
Vue.use(VueResource)

FastClick.attach(document.body)

var router = new VueRouter({
  hashbang: false,
  saveScrollPosition: true,
  linkActiveClass: 'custom-active-class'
})

Routers(router)
router.start(Vue.extend(App), '#app')
window.router = router

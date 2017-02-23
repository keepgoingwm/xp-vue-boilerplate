import Vue from 'vue'
// import Vue from 'E:/02Project/MyGitHub/vue/dist/vue.runtime.common.js'

import installStyles from './installStyles'
installStyles()

import installCommonLibs from './installCommonLibs'
installCommonLibs(Vue)

import installEnvUtils from './installEnvUtils'
installEnvUtils(Vue)

import installVueGlobalApi from './vue-extend/index'
installVueGlobalApi(Vue)

import installResource from './installResource'
installResource(Vue)

import router from './router'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  // render: function (createElement) {
  //   return createElement(
  //     'app'
  //   )
  // },
  components: { App }
})

if (!Vue) {
  var Vue = require('vue')
}

var installDevUtils = function (options) {
  window.vConsole = require('vconsole')
  require('vconsole-resources')
  require('./dev/vConsoleUtils')

  window.vue = Vue
  window.vueGlobalConfig = Vue.config
  window.vueGlobalComponents = Vue.options.components
  window.vueGlobalElComponents = Vue.options.elementDirectives
  window.vueGlobalMethods = Vue.options.methods
  window.vueGlobalFilters = Vue.options.filters
  window.vueGlobalDirectives = Vue.options.directives
  window.vuexGlobalGetters = Vue.options.vuex && Vue.options.vuex.getters

  window.store = require('../../store/index')
  window.state = window.store.default.state

  // 开启微信jssdk debug
}

module.exports = installDevUtils

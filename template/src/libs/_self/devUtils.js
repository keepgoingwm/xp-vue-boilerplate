if (!Vue) {
  var Vue = require('vue')
}

var installDevUtils = function (options) {
  window.vConsole = require('vconsole')

  window.vueGlobalComponents = Vue.options.components
  window.vueGlobalElComponents = Vue.options.elementDirectives
  window.vueGlobalMethods = Vue.options.methods
  window.vueGlobalFilters= Vue.options.filters
  window.vueGlobalDirectives = Vue.options.directives
  window.vuexGlobalGetters = Vue.options.vuex && Vue.options.vuex.getters
}

module.exports = installDevUtils

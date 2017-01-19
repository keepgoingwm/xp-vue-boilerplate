// sentry监控配置
var sentryUrl = 'https://409c09dcfded415eb98be3ceb89c0b5a@sentry.io/118433'

let installSentryUtils = function () {
  if (sentryUrl) {
    var Raven = require('raven-js')
    var RavenVue = require('raven-js/plugins/vue')
    Raven.config('https://409c09dcfded415eb98be3ceb89c0b5a@sentry.io/118433').addPlugin(RavenVue, Vue).install()
  }
}

module.exports = installSentryUtils


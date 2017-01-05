let installCommonLibs = () => {
  require('babel-polyfill')
  window._ = require('lodash/lodash.min.js')
  window.Moment = require('moment/min/moment.min.js')
  // window.Decimal = require('decimal.js/decimal.min.js')
  var FastClick = require('./libs/fastclick/lib/fastclick')
  FastClick.attach(document.body)
}

export default installCommonLibs

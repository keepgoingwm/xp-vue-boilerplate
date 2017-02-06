export default (Vue) => {
  require('babel-polyfill')
  require('./libs/fastclick/lib/fastclick').attach(document.body)
  window._ = require('lodash/lodash.min.js')
  window.Moment = require('moment/min/moment.min.js')
  // window.Decimal = require('decimal.js/decimal.min.js')
}

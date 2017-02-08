var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  IS_BUILD: false,
  NODE_ENV: '"development"'
})

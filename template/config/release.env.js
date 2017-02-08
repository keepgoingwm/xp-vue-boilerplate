var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  IS_BUILD: true,
  NODE_ENV: '"releasing"'
})

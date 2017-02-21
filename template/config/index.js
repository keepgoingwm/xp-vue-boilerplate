// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var chalk = require('chalk')
var buildConfig = require('./build-config')
var error = function (text) {
  return chalk.bold.white.bgRed('Error: ' + text)
}

try {
  var env = require('../env')
} catch (err) {
  console.log(error('no env config'))
  process.exit(1)
}

var isProduction = (process.env.NODE_ENV === 'production')
var backendUrl = env.backendUrl || 'http://example.com/'

module.exports = {
  build: buildConfig,
  dev: {
    env: require('./dev.env'),
    port: env.devPort || 8080,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/**': {
        target: backendUrl,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

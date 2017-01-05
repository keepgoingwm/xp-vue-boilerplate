// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var env = require('../env')
var isProduction = (process.env.NODE_ENV === 'production')

var backendUrl = env.backendUrl || 'http://example.com/'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: isProduction,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: env.devPort || 8080,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    // proxy使用参考https://github.com/chimurai/http-proxy-middleware
    // 通过path可以传入非字符串类型的path matching规则，这样就能完全发挥http-proxy-middleware原本的匹配能力
    proxyTable: {
      '/fake-login/': {
        // path: function (pathname, req) {
        //   return (pathname.match('^/fake-login/') && req.method === 'GET')
        // },
        logLevel: 'debug', //  ['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'
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

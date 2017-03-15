var path = require('path')

module.exports = (function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: 'https://cdn.niwodai.echo58.com/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        packStats: path.resolve(__dirname, '../profile/packStats.json'),
        htmlConfig: {
          title: 'test',
          baiduAnalysis: '11111'
        }
      }
    case 'testing':
      return {
        env: require('./test.env'),
        index: path.resolve(__dirname, '../dist-test/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist-test'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
      }
    case 'releasing':
      return {
        env: require('./release.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: 'http://ok0v5xg7u.bkt.clouddn.com/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
      }
    default:
      return {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
      }
  }
})()
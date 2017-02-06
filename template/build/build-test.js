// https://github.com/shelljs/shelljs
require('shelljs/global')
var fs = require('fs')
env.NODE_ENV = 'testing'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for test...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      // context: false,
      // hash: false,
      // version: false,
      timings: true,
      // assets: false,
      // cached: false,
      // reasons: false,
      // source: false,
      // errorDetails: false,
      // chunkOrigins : false,
      // modulesSort: false,
      // chunksSort : false,
      // assetsSort : false,
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  if (config.build.packStats) {
    fs.writeFileSync(config.build.packStats, JSON.stringify(stats.toJson()))
  }
})

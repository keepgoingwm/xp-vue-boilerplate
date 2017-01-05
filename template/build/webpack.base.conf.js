var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var isProduction = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: isProduction ? {
      'src': path.resolve(__dirname, '../src'),
      'libs': path.resolve(__dirname, '../src/libs'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue-router': 'vue-router/dist/vue-router.min.js',
      'vue-resource': 'vue-resource/dist/vue-resource.min.js',
      'vuex': 'vuex/dist/vuex.min.js',
      'vux-src-components': 'vux/src/components',
      'vux-components': 'vux/dist/components',
      'vux-src-styles': 'vux/src/styles',
      'vux-styles': 'vux/dist/styles'
    } : {
      'src': path.resolve(__dirname, '../src'),
      'libs': path.resolve(__dirname, '../src/libs'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue-router': 'vue-router/dist/vue-router.min.js',
      'vue-resource': 'vue-resource/dist/vue-resource.min.js',
      'vuex': 'vuex/dist/vuex.min.js',
      'vux-src-components': 'vux/src/components',
      'vux-components': 'vux/dist/components',
      'vux-src-styles': 'vux/src/styles',
      'vux-styles': 'vux/dist/styles'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    noParse: [/moment.min/, /vue.min/, /vue-router.min/, /vue-resource.min/],
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}

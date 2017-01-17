import Vue from 'E:\\02Project\\MyGitHub\\vue\\dist\\vue.js'
// import Vue from 'vue'

if (process.env.NODE_ENV !== 'production') {
  // 开发、测试过程需要的
  var installDevUtils = require('./libs/_self/devUtils')
  installDevUtils()
  // var startMockServer = require('./api/mock/index')
  // startMockServer()
} else {
  // 错误监控——线上环境打开
  // var installSentryUtils = require('./libs/_self/sentryUtils')
  // installSentryUtils()
}

import 'vux/src/styles/1px.less'
import './assets/styles/sass/index.scss'

import installCommonLibs from './commonLibs'
installCommonLibs()

import installVueGlobalApi from './vue/index'
installVueGlobalApi(Vue)

import installVueResource from './installVueResource'
installVueResource(Vue)

import installRouters from './installRouters'
installRouters(Vue)

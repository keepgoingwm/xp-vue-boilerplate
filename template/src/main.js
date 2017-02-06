import Vue from 'vue'

// const isBuild = (process.env.NODE_ENV !== 'development')

import 'vux/src/styles/1px.less'
import './assets/styles/sass/index.scss'

import installCommonLibs from './installCommonLibs'
installCommonLibs(Vue)

import installVueGlobalApi from './vue-extend/index'
installVueGlobalApi(Vue)

import installResource from './installResource'
installResource(Vue)

import installRouter from './installRouter'
installRouter(Vue)


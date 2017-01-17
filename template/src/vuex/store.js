import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import global from './modules/global'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const options = {
  strict: debug,
  modules: {
    global,
    setting
  }
}
window.vuexOptions = options

export default new Vuex.Store(options)

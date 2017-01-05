import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    global,
    setting
  }
})

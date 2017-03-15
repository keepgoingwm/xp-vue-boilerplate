import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  actions,
  getters,
  modules: {
    setting
  },
  plugins: debug ? [createLogger()] : []
})

import {SET_GLOBAL} from '../mutation-types'

const state = {
  global: {}
}

const mutations = {
  [SET_GLOBAL] (state, global) {
    state.global = global
  }
}

export default {
  state,
  mutations
}

import Api from '../api/index'
import * as types from './mutation-types'

/**
 * 基础
 * ----------------------------------------------------------------------------
 */
export const getSetting = ({ state, commit }, options, httpOptions) => {
  commit(types.SET_SETTING, {a: 'test'})
  return new Promise((resolve, reject) => {
    Api.getSetting(options, httpOptions).then(response => {
      commit(types.SET_SETTING, response.json())
      resolve(response)
    }).catch(data => {
      reject(data)
    })
  })
}

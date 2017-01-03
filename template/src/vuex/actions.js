import Api from '../api/index'
import * as types from './mutation-types'

/**
 * 基础
 * ----------------------------------------------------------------------------
 */
export const getSetting = ({ dispatch }, options, httpOptions) => {
  return new Promise((resolve, reject) => {
    Api.getSetting(options, httpOptions).then(response => {
      dispatch(types.SET_SETTING, response.json())
      resolve(response)
    }).catch(data => {
      reject(data)
    })
  })
}

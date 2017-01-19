import { SET_SETTING } from '../mutation-types'
import Moment from 'moment'

function versions () {
  let u = navigator.userAgent
  return {
    // 移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
  }
}

let payUrlReg = new RegExp(`^${location.origin}/#/member/wallet/[^\/]*$`)

const state = {
  config: {},
  base: {
    notPayUrl: !payUrlReg.test(firstHref),
    versions: versions()
  }
}

const mutations = {
  [SET_SETTING] (state, setting) {
    let localCurrTime = Moment().format('YYYY-MM-DD HH:mm:ss')
    let serverCurrTime = setting.serverTime
    state.config = setting
    state.config.serverLocalDiffTime = Moment(serverCurrTime).diff(Moment(localCurrTime))
  }
}

export default {
  state,
  mutations
}

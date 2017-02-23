import ThrottledHttp from './throttledHttp'
var TH = new ThrottledHttp()

let apiPrefix = '/api'

/**
 * 开发环境
 * ----------------------------------------------------------------------------
 */
if (process.env.NODE_ENV !== 'production') {
  exports.getLogin = (userId, httpOptions, options) => {
    return TH.call('get', `${apiPrefix}/login?code=${userId}`, httpOptions, options)
  }
}

/**
 * 公共接口
 * ----------------------------------------------------------------------------
 */
exports.getSetting = (httpOptions, options) => {
  return TH.call('get', `${apiPrefix}/setting`, httpOptions, options)
}
exports.postWechatJsConfig = (body, httpOptions, options) => {
  return TH.call('post', `${apiPrefix}/wechat-js-config`, body, httpOptions, options)
}
/**
 * xxx接口
 * ----------------------------------------------------------------------------
 */
exports.getPlanEvent = (urlOptions, httpOptions, options) => {
  return TH.call('get', `${apiPrefix}/plan_events/${urlOptions.planEventId}`, httpOptions, options)
}
/**
 * 用户
 * ----------------------------------------------------------------------------
 */
exports.getUser = (httpOptions, options) => {
  return TH.call('get', `${apiPrefix}/user`, httpOptions, options)
}

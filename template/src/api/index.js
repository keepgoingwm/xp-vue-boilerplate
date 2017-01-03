import Throttle from './libs/throttledHttp'

let apiPrefix = '/api'

if (process.env.NODE_ENV !== 'production') {
  // 非生产环境
}

exports.getSetting = (options, httpOptions) => {
  return Throttle.call('get', `${apiPrefix}/setting`, options, httpOptions)
}
exports.postWechatJsConfig = (body, options, httpOptions) => {
  return throttle.call('post', `${apiPrefix}/wechat-js-config`, body, options, httpOptions)
}
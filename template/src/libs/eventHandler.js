export const defaultXhrErrorHandler = (response, options = {}) => {
  let alertFunc = options.alertFunc || appAlert
  let cb = options.cb
  let notJSONCb = options.notJSONCb

  console.log(response, response.statusText && response.data)

  if (response.status === 0) {
    console.log('网络请求未得到正确响应')
  } else if (response.status >= 500) {
    location.href = '/error'
  } else if (response === 'notJSON') {
    if (notJSONCb) {
      notJSONCb()
    } else {
      alertFunc('请求数据错误')
    }
  } else if (response.msg) {
    alertFunc(response.msg)
  } else if (response.data) {
    alertFunc(response.data)
  } else if (response instanceof Error) {
    alertFunc('程序执行出错：' + response.message)
  } else if (response instanceof ReferenceError) {
    alertFunc('程序执行出错：' + response.message)
  } else {
    alertFunc(JSON.stringify(response))
  }
  cb && cb(response)
}

export let appDispatch = (eventId, options) => {
  router.app.$dispatch(eventId, options)
}

export let appAlert = (options) => {
  options = typeof options === 'string' ? { title: options } : options
  return appDispatch('alert', options || {})
}

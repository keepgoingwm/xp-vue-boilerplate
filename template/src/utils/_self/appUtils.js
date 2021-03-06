let dispatchFunc = (event, opts) => {
  console.log('$dispatch 需要替代')
  // router.app.$dispatch(event, opts)
}

exports.loading = (opts) => {
  if (typeof opts === 'string') {
    opts = { text: opts }
  } else if (typeof opts === 'boolean') {
    opts = { show: opts }
  }
  if (opts.show && router.app.loading.show && (!opts.text || (router.app.loading.text === opts.text))) {
    return
  }
  return dispatchFunc('loading', opts || {})
}

exports.toast = (opts) => {
  opts = typeof opts === 'string' ? { text: opts } : opts
  return dispatchFunc('toast', opts || {})
}

exports.alert = (opts) => {
  opts = typeof opts === 'string' ? { title: opts } : opts
  return dispatchFunc('alert', opts || {})
}

exports.confirm = (opts) => {
  opts = typeof opts === 'string' ? { title: opts } : opts
  return dispatchFunc('confirm', opts || {})
}

exports.topTip = (opts) => {
  opts = typeof opts === 'string' ? { text: opts } : opts
  return dispatchFunc('topTip', opts || {})
}

exports.getRoutePath = (name) => {
  return router._recognizer.names[name] && router._recognizer.names[name].handlers[router._recognizer.names[name].handlers.length - 1].handler.fullPath
}

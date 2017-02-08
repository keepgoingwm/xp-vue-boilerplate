exports.callApi = (func, ...arg) => {
  return func.apply(this, arg)
}

exports.callNoLoadingApi = (func, ...arg) => {
  arg.push({ loading: false })
  return func.apply(this, arg)
}

exports.callNoErrorApi = (func, ...arg) => {
  arg.push({ loading: false })
  return func.apply(this, arg)
}

if (!Vue) {
  var Vue = require('vue')
}
import { defaultHttpErrorHandler } from '../libs/error-handler/index'
import { loading } from '../libs/_self/appUtils'

export default class ThrottledHttp {
  constructor (options = {}) {
    this.throttleList = []

    this.httpErrorHandler = options.httpErrorHandler || defaultHttpErrorHandler
    this.appLoading = options.loadingFunc || loading
    this.acceptNotJSON = options.acceptNotJSON || false
    this.noErrorHandler = options.noErrorHandler || false
  }

  static validJSON (response) {
    try {
      response.json()
      return true
    } catch (err) {
      return false
    }
  }

  // method, url, [body], [options]
  call (method, url, body, httpOptions, options) {
    let noBody = ['get', 'delete', 'head', 'jsonp'].indexOf(method) > -1

    if (noBody) {
      options = httpOptions
      httpOptions = body
      body = null
    }

    options = options || {}
    let loading = options.loading || {}
    let noLoading = (loading === false)
    let force = options.force || false
    let acceptNotJSON = options.acceptNotJSON || this.acceptNotJSON  // 返回结果可以不是JSON格式（例如直接返回html）
    let noErrorHandler = options.noErrorHandler || this.noErrorHandler
    let httpErrorHandler = options.httpErrorHandler || this.httpErrorHandler
    let httpErrorHandlerOptions = options.httpErrorHandlerOptions

    let symbol = method + url + window.location
    symbol = body !== undefined ? symbol + JSON.stringify(body) : symbol
    symbol = options !== undefined ? symbol + JSON.stringify(options) : symbol
    let index = this.throttleList.indexOf(symbol)

    let setLoading = (options) => {
      if (!noLoading) {
        this.appLoading(options)
      }
    }

    let runErrorHandler = (request, response, resolve, reject) => {
      request.status = 'fail'
      if (!noErrorHandler) {
        httpErrorHandler(response, httpErrorHandlerOptions)
      } else {
        reject(response)
      }
    }

    let JSONCheck = (request, response, resolve, reject) => {
      if (!acceptNotJSON) {
        if (ThrottledHttp.validJSON(response)) {
          request.status = 'success'
          resolve(response)
        } else {
          runErrorHandler(request, response, resolve, reject)
        }
      } else {
        resolve(response)
      }
    }

    let makePromise = request => {
      setLoading(loading)
      return new Promise((resolve, reject) => {
        let handleSuccess = (response) => {
          setLoading(false)
          JSONCheck(request, response, resolve, reject)
        }
        let handleFail = (response) => {
          setLoading(false)
          runErrorHandler(request, response, resolve, reject)
        }

        if (noBody) {
          Vue.http[method](url, httpOptions || null).then(handleSuccess).catch(handleFail)
        } else {
          Vue.http[method](url, body || {}, httpOptions || null).then(handleSuccess).catch(handleFail)
        }
      })
    }

    let request
    if (index === -1) {
      request = {
        value: str,
        status: 'pending'
      }
      request.promise = makePromise(request)
      this.throttleList.push(request)
    } else {
      request = this.throttleList[index]
      if (this.throttleList[index].status !== 'pending' || force) {
        request.status = 'pending'
        request.promise = makePromise(request)
      }
    }
    return request.promise
  }
}

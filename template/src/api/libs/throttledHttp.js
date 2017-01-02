import Vue from 'vue'

let throttleList = []

export default class Throttle {
  // method, url, [body], [options]
  call (method, url, body, options, httpOptions) {
    let noBody = ['get', 'delete', 'head', 'jsonp'].findIndex((ele) => { return ele === method }) > -1

    if (noBody) {
      httpOptions = options
      options = body
    }

    let force = options.force || false
    let notJSON = options.notJSON || false

    let validJSON = (response, cb, errCb) => {
      if (!notJSON) {
        if (typeof response.data === 'object') {
          cb(response)
        } else {
          errCb(response)
        }
      }
    }

    let str = method + url + window.location
    str = body !== undefined ? str + JSON.stringify(body) : str
    str = options !== undefined ? str + JSON.stringify(options) : str
    let index = throttleList.findIndex(ele => {
      return ele.value === str
    })
    let promise = obj => {
      return new Promise((resolve, reject) => {
        // 如果method = ['get', 'delete', 'head', 'jsonp'] 参数body则为options 多传一个最后options不影响
        if (noBody) {
          Vue.http[method](url, httpOptions || {}).then(response => {
            validJSON(response, (response) => {
              obj.status = 'success'
              resolve(response)
            }, () => {
              obj.status = 'fail'
              reject('notJSON')
            })
          }).catch(response => {
            obj.status = 'fail'
            reject(response)
          })
        } else {
          Vue.http[method](url, body || {}, httpOptions || {}).then(response => {
            validJSON(response, (response) => {
              obj.status = 'success'
              resolve(response)
            }, () => {
              obj.status = 'fail'
              reject('notJSON')
            })
          }).catch(response => {
            obj.status = 'fail'
            reject(response)
          })
        }
      })
    }

    if (index === -1) {
      let obj = { value: str, status: 'pending' }
      obj.promise = promise(obj)
      throttleList.push(obj)
      return obj.promise
    } else {
      if (throttleList[index].status === 'pending' && !force) {
        return throttleList[index].promise
      } else {
        throttleList[index].status = 'pending'
        throttleList[index].promise = promise(throttleList[index])
        return throttleList[index].promise
      }
    }
  }
}

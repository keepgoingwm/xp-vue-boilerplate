class PromiseLoop {
  constructor (
    limit = Number.MAX_SAFE_INTEGER
  ) {
    this.limit = limit
    this.finished = false
  }

  finish () {
    this.finished = true
  }

  run (promise) {
    let that = this

    let todoList = []
    todoList.length = this.limit
    todoList.fill(promise)

    let results = []

    return todoList.reduce(function (cur, next) {
      return cur.then(next).then((res) => {
        results.push(res)
        if (that.finished) {
          return Promise.reject('finished')
        } else {
          Promise.resolve(res)
        }
      })
    }, Promise.resolve()).then(function () {
      return new Promise((resolve) => {
        resolve({
          status: 'allFinished',
          results: results
        })
      })
    }).catch((res) => {
      if (res === 'finished') {
        return Promise.resolve({
          status: 'finished',
          results: results
        })
      } else {
        return Promise.resolve({
          status: 'error',
          results: res
        })
      }
    })
  }
}

export default PromiseLoop


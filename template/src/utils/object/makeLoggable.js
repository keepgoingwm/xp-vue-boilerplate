function hasAssigned (obj) {
  let newObj = {}

  for (var key in obj) {
    let logName = key + '_has'
    let value = obj[key]
    Object.defineProperty(newObj, logName, {
      writable: true,
      value: false
    })
    Object.defineProperty(newObj, key, {
      enumerable: true,
      get: () => {
        return value
      },
      set: (val) => {
        obj[key] = val
        newObj[logName] = true
      }
    })
  }

  return newObj
}

function assignHistory (obj) {
}

module.exports = {
  hasAssigned,
  assignHistory
}
